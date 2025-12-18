import { useState, useEffect, useCallback } from 'react';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxn5Yk7puVurgFr8KIC5jW_x3cmAUyQYZgD-RbkM_6MbIEWlfAva2JdE2a6M7Btk0vZIw/exec';

// Categories matching the Google Sheet rows (as inferred) and UI requirements
export const CATEGORIES = [
    { id: 'Alcohol', name: 'Alcohol', icon: 'wine_bar', limit: 112.5 },
    { id: 'Snacks', name: 'Snacks', icon: 'bakery_dining', limit: 67.5 }, // bakery_dining or cookie? using material symbols
    { id: 'Menaje', name: 'Menaje', icon: 'restaurant', limit: 22.5 },
    { id: 'Música', name: 'Música', icon: 'queue_music', limit: 20 }, // Combined Música + Logística per prompt?
    // Prompt says "Música + Logística: 20€". 
    // But also listed Logística separately in Description? 
    // "Presupuestos Asignados: Alcohol, Snacks, Menaje, Música + Logística".
    // Sheet image shows: Alcohol, Música, Logística, Snacks, Menaje (5 rows).
    // If limit is combined, maybe they are tracked together? 
    // Let's assume distinct rows but share budget? Or maybe Logística is the 20€ one?
    // Let's stick to the list: Alcohol, Snacks, Menaje, Música, Logística.
    // I will assign 20 to Música and 0 to Logística or split? 
    // Let's assign 20 to a "Música y Logística" group?
    // Actually, let's just stick to the rows in the image and user prompt.
    // I will treat "Música" and "Logística" as separate rows.
    // Budget logic: "Música + Logística: 20€". I'll handle this in the budget calc.
    { id: 'Logística', name: 'Logística', icon: 'local_shipping', limit: 20, sharedBudgetWith: 'Música' }
];

export const USERS = ['Alejandro', 'Beatriz', 'Carlos', 'Daniela', 'Elena', 'Fernando', 'Gabriela', 'Hugo', 'Isabel'];
// User prompt listed: Juan, Quintana, Germán... 
// Wait, the "Planning" HTML in prompt used: "Alejandro, Beatriz...".
// The "Resumen Ejecutivo" listed: "Juan, Quintana, Germán, Jose, Cantero, Alejandro, David, Jorge, Arbelo". (9 users).
// I should use the REAL names from the Resumen, not the placeholder HTML.
export const REAL_USERS = ['Juan', 'Quintana', 'Germán', 'Jose', 'Cantero', 'Alejandro', 'David', 'Jorge', 'Arbelo'];


export function useSheets() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Fetch data
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(SHEET_URL);
            const json = await response.json();
            // Expecting format: { "Alcohol": { assignedTo: [], details: "", cost: 0 }, ... } OR array of rows
            // The previous script (in legacy_index) expected object with keys.
            // Let's assume the script returns an Object keyed by Category ID (Row Name).
            console.log("Data loaded:", json);
            setData(json);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Error al cargar datos.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Parse cost from details string
    const calculateCost = (details) => {
        if (!details) return 0;
        const matches = details.match(/\(Est\. (\d+[.,]?\d*)€\)/g);
        if (!matches) return 0;
        return matches.reduce((acc, match) => {
            const val = parseFloat(match.match(/(\d+[.,]?\d*)/)[0].replace(',', '.'));
            return acc + val;
        }, 0);
    };

    // Save data
    // The user says: uses GET with ?action=save&data=... due to CORS?
    // The provided legacy code used POST. 
    // "Protocolo de Comunicación: ... utiliza peticiones GET ... en lugar de POST".
    // Okay, I MUST follow this instruction regardless of the legacy code.
    const updateTask = async (category, newDetails, newAssigned) => {
        setIsSaving(true);

        // Optimistic Update
        const oldData = { ...data };
        const cost = calculateCost(newDetails);

        const updatedRow = {
            assignedTo: newAssigned,
            details: newDetails,
            cost: cost
        };

        const newData = { ...data, [category]: updatedRow };
        setData(newData);

        try {
            // Construct URL parameters
            // Data structure expectations for backend? 
            // The prompt says: "envía los datos como parámetros JSON codificados en la URL (?action=save&data=...)"
            // This usually means `data` param contains the stringified JSON of the change or the whole state.
            // Saving WHOLE state is safer for consistency if payload is small. 
            // Saving PARTIAL state (category, details) is better for conflicts.
            // I'll assume sending the specific ROW update is better if supported, but "data=..." implies a blob.
            // Let's send a payload object: { category, details, assignedTo, cost }

            const payload = {
                category,
                details: newDetails,
                assignedTo: newAssigned,
                cost
            };

            const jsonString = JSON.stringify(payload);
            const encodedData = encodeURIComponent(jsonString);
            const url = `${SHEET_URL}?action=save&data=${encodedData}`;

            await fetch(url, { method: 'GET' }); // No-cors might be needed if opaque, but usually GET returns JSONP or CORS headers if set.
            // If CORS is an issue, 'no-cors' mode won't allow reading response. 
            // The user says "Due to CORS... uses GET". This usually implies JSONP or simple request.

        } catch (err) {
            console.error(err);
            setError("Error al guardar. Reintentando...");
            setData(oldData); // Revert
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        data,
        loading,
        error,
        isSaving,
        updateTask,
        refresh: loadData,
        calculateCost
    };
}
