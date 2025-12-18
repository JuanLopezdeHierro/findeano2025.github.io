/*
  Google Apps Script for Fin de Año 2025
  Paste this into Extensions > Apps Script in your Google Sheet.
  Deploy as Web App -> Execute as: Me -> Access: Anyone.
*/

function doGet(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const action = e.parameter.action || 'read';

    if (action === 'save') {
        return saveData(sheet, e.parameter.data);
    }

    return readData(sheet);
}

function readData(sheet) {
    const rows = sheet.getDataRange().getValues();
    // Expecting Header in Row 1. Data starts Row 2.
    // Columns: [Tarea (A), Responsables (B), Detalles (C), Gasto (D)]
    // We map this to a JSON object keyed by Category ID.

    const data = {};

    // Skip header (i=1)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const categoryName = row[0]; // e.g. "Alcohol"
        if (!categoryName) continue;

        // Normalize Key (Remove accents for ID or use exact name? Frontend expects specific IDs like "Alcohol", "Música")
        // Let's use the name from the sheet as key.

        data[categoryName] = {
            assignedTo: row[1] ? row[1].split(',').map(s => s.trim()).filter(s => s) : [],
            details: row[2] || '',
            cost: Number(row[3]) || 0
        };
    }

    return jsonResponse(data);
}

function saveData(sheet, jsonPayload) {
    try {
        const payload = JSON.parse(jsonPayload);
        // Payload can be specific update: { category: "Alcohol", details: "...", assignedTo: [...], cost: 100 }

        if (!payload.category) {
            return jsonResponse({ error: "Missing category" });
        }

        const rows = sheet.getDataRange().getValues();
        let rowIndex = -1;

        // Find row by Category Name (Col A)
        for (let i = 1; i < rows.length; i++) {
            if (rows[i][0] === payload.category) {
                rowIndex = i + 1; // 1-based index for getRange
                break;
            }
        }

        if (rowIndex === -1) {
            return jsonResponse({ error: "Category not found in sheet" });
        }

        // Update Columns B, C, D (2, 3, 4)
        // assignedTo is array, join with commas
        const assignedStr = Array.isArray(payload.assignedTo) ? payload.assignedTo.join(', ') : payload.assignedTo;

        sheet.getRange(rowIndex, 2).setValue(assignedStr);
        sheet.getRange(rowIndex, 3).setValue(payload.details);
        sheet.getRange(rowIndex, 4).setValue(payload.cost);

        return jsonResponse({ status: "success", updated: payload.category });

    } catch (err) {
        return jsonResponse({ error: err.toString() });
    }
}

function jsonResponse(data) {
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Handle POST if you want to support it too (CORS might benefit from POST in some contexts, but simple GET is easier for basic setups)
function doPost(e) {
    // Map POST body to same logic
    if (e.postData && e.postData.contents) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        // Assume body is the payload direct, or follows same action pattern
        return saveData(sheet, e.postData.contents);
    }
}
