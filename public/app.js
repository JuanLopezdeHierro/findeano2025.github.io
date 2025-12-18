// ===== GOOGLE SHEETS INTEGRATION =====
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxn5Yk7puVurgFr8KIC5jW_x3cmAUyQYZgD-RbkM_6MbIEWlfAva2JdE2a6M7Btk0vZIw/exec';

const USERS = ['Juan', 'Quintana', 'Germán', 'Jose', 'Cantero', 'Alejandro', 'David', 'Jorge', 'Arbelo'];

const CATEGORIES = [
    { id: 'Alcohol', name: 'Alcohol', icon: 'wine_bar', limit: 112.5 },
    { id: 'Snacks', name: 'Snacks', icon: 'bakery_dining', limit: 67.5 },
    { id: 'Menaje', name: 'Menaje', icon: 'restaurant', limit: 22.5 },
    { id: 'Música', name: 'Música', icon: 'queue_music', limit: 20 },
    { id: 'Logística', name: 'Logística', icon: 'local_shipping', limit: 20 }
];

// ===== STORAGE HELPERS =====
function getCurrentUser() {
    return localStorage.getItem('currentUser') || '';
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', user);
}

// ===== DATA MANAGEMENT =====
async function loadData() {
    try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return {};
    }
}

async function saveData(category, details, assignedTo, cost) {
    try {
        const payload = {
            category,
            details,
            assignedTo,
            cost
        };

        const jsonString = JSON.stringify(payload);
        const encodedData = encodeURIComponent(jsonString);
        const url = `${SHEET_URL}?action=save&data=${encodedData}`;

        await fetch(url, { method: 'GET' });
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
}

function calculateCost(details) {
    if (!details) return 0;
    const matches = details.match(/\(Est\. (\d+[.,]?\d*)€\)/g);
    if (!matches) return 0;
    return matches.reduce((acc, match) => {
        const val = parseFloat(match.match(/(\d+[.,]?\d*)/)[0].replace(',', '.'));
        return acc + val;
    }, 0);
}

// ===== NAVIGATION =====
function navigate(page) {
    window.location.href = `${page}.html`;
}

function goToPlanning() {
    const user = getCurrentUser();
    if (!user) {
        alert('Por favor, selecciona tu nombre primero');
        return;
    }
    navigate('planning');
}

// Export for global use
window.SheetApp = {
    getCurrentUser,
    setCurrentUser,
    loadData,
    saveData,
    calculateCost,
    navigate,
    goToPlanning,
    USERS,
    CATEGORIES
};
