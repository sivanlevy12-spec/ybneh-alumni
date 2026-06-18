const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Google Sheets API configuration
const SPREADSHEET_ID = '1SoMUw5ol7LeCrTR_w9cGnKcdUXmHzqUJATAqkPsrwdg';
const SHEET_NAME = 'עסקי בוגרי יבנה';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY;

// Column mapping based on the sheet structure
const COLUMN_HEADERS = [
    'שם מלא',
    'שם העסק/מקום עבודה',
    'תיאור העסק/תיאור העבודה',
    'עיר / אזור',
    'טלפון',
    'אימייל',
    'אתר אינטרנט',
    'פייסבוק',
    'אינסטגרם',
    'לינקדאין',
    'אתר אינטרנט 2',
    'פייסבוק 2',
    'אינסטגרם 2',
    'לינקדאין 2'
];

// Helper function to add a row to Google Sheets using direct API
async function addRowToSheet(formData) {
    const values = [
        formData.fullName || '',
        formData.businessName || '',
        formData.businessDesc || '',
        formData.city || '',
        formData.phone || '',
        formData.email || '',
        formData.website || '',
        formData.facebook || '',
        formData.instagram || '',
        formData.linkedin || '',
        '', // website2
        '', // facebook2
        '', // instagram2
        ''  // linkedin2
    ];

    try {
        // Using Google Sheets API directly to append data
        // URL format: https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append
        const range = `'${SHEET_NAME}'!A:N`; // All columns from A to N
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}:append?key=${GOOGLE_API_KEY}`;

        const response = await axios.post(url, {
            values: [values],
            majorDimension: 'ROWS'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Successfully added row to sheet:', response.data.updates?.updatedRange);
        return response.data;
    } catch (error) {
        console.error('Error adding row to sheet:', error.response?.data || error.message);
        throw new Error(`Failed to save to Google Sheets: ${error.response?.data?.error?.message || error.message}`);
    }
}

// API endpoint to handle form submission
app.post('/api/submit-member', async (req, res) => {
    try {
        const formData = req.body;

        // Validate required field
        if (!formData.fullName || !formData.fullName.trim()) {
            return res.status(400).json({ error: 'שם מלא הוא שדה חובה' });
        }

        console.log('Processing form submission for:', formData.fullName);

        // Add row to Google Sheets
        const result = await addRowToSheet(formData);

        res.json({ 
            success: true, 
            message: 'הנתונים נשמרו בהצלחה',
            result: result
        });
    } catch (error) {
        console.error('Error processing submission:', error);
        res.status(500).json({ 
            error: 'שגיאה בשמירת הנתונים',
            details: error.message
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get sheet headers (for debugging)
app.get('/api/headers', (req, res) => {
    res.json({ headers: COLUMN_HEADERS });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Visit http://localhost:${PORT} to access the landing page`);
    console.log(`📊 Spreadsheet ID: ${SPREADSHEET_ID}`);
    console.log(`📋 Sheet name: ${SHEET_NAME}`);
    
    if (!GOOGLE_API_KEY) {
        console.warn('⚠️  WARNING: GOOGLE_API_KEY not set in .env file');
    }
});