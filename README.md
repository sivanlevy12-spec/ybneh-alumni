# 🎓 בוגרי יבנה - מאגר עסקי

דף נחיתה יפה וטופס לאיסוף פרטי עסקים של בוגרי יבנה, עם שמירה אוטומטית לגוגל שיטס.

## 🚀 התחלה מהירה

### 1. התקנת תלויות
```bash
npm install
```

### 2. קביעת משתנים סביבה
העתק את `.env.example` ל-`.env`:
```bash
cp .env.example .env
```

ערוך את קובץ `.env` והוסף את המפתחות שלך.

### 3. הפעלת השרת
```bash
npm start
```

או בפיתוח עם auto-restart:
```bash
npm run dev
```

השרת יפעל על `http://localhost:3000`

---

## 🔧 קביעת מפתחות API

### קביעת Composio API Key

1. היכנס ל-[Composio.dev](https://composio.dev)
2. צור חשבון או התחבר
3. עבור ל-API Keys ו-copy את ה-API Key שלך
4. הדבק את המפתח ל-`.env` בשדה `COMPOSIO_API_KEY`

### קביעת Google API Key

1. היכנס ל-[Google Cloud Console](https://console.cloud.google.com)
2. צור פרוייקט חדש (או בחר קיים)
3. הפעל את **Google Sheets API**:
   - עבור ל-**APIs & Services > Enabled APIs & services**
   - לחץ **+ Enable APIs and Services**
   - חפש **Google Sheets API**
   - לחץ **Enable**
4. צור Credentials:
   - עבור ל-**APIs & Services > Credentials**
   - לחץ **+ Create Credentials > API Key**
   - Copy את ה-API Key
5. הדבק את המפתח ל-`.env` בשדה `GOOGLE_API_KEY`

---

## 📁 מבנה הפרויקט

```
.
├── ybneh-landing.html    # דף הנחיתה והטופס
├── server.js             # Express server שמוזין לגוגל שיטס
├── package.json          # תלויות Node.js
├── .env.example          # דוגמה למשתנים סביבה
└── README.md             # קובץ זה
```

---

## 🎎 אודות הדף

- **עיצוב מהמם**: גרדיאנט סגול יפה עם אנימציות מוטבות
- **Responsive**: עובד מעולה על כל גודל מסך (נייד, טאבלט, שולחן עבודה)
- **RTL Support**: תמיכה מלאה בעברית מימין לשמאל
- **Accessible**: טופס נגיש ונוח להשתמש

---

## 📋 שדות הטופס

- **שם מלא** ⭐ (חובה)
- שם העסק / מקום עבודה
- תיאור העסק / העבודה
- עיר / אזור
- טלפון
- אימייל
- אתר אינטרנט
- רשתות חברתיות (פייסבוק, אינסטגרם, לינקדאין)

---

## 🔌 API Endpoint

### POST `/api/submit-member`

קבלת נתוני טופס ושמירה לגוגל שיטס.

**Request Body:**
```json
{
  "fullName": "ישי לוי",
  "businessName": "טק סטארטאפ",
  "businessDesc": "אנחנו עובדים בתחום ה-AI",
  "city": "תל אביב",
  "phone": "0541234567",
  "email": "yishai@example.com",
  "website": "https://example.com",
  "facebook": "facebook.com/example",
  "instagram": "@example",
  "linkedin": "linkedin.com/in/example"
}
```

**Response:**
```json
{
  "success": true,
  "message": "הנתונים נשמרו בהצלחה"
}
```

---

## 🔨 פתרון בעיוות

### "Connection refused on port 3000"
- ודא שהשרת פועל: `npm start`
- בדוק שאין שרת אחר על port 3000

### "API Key invalid"
- ודא שהמפתח נכון בקובץ `.env`
- בדוק שה-APIs מופעלות בגוגל קלאוד

### הטופס לא שולח
- פתח את Console (F12) וראה את ההודעות
- בדוק שהשרת רוץ על localhost:3000

---

## 📞 תמיכה

אם יש לך שאלות או בעיווות:
1. בדוק את קובץ זה
2. בדוק את ה-logs של השרת
3. פתח console בדפדפן (F12) ובדוק errors

---

## 📋 עדכונים עתידיים

- [ ] יכולת עריכת פרטים קיימים
- [ ] חיפוש ודירוג
- [ ] מסנן לפי תחום עיסוק
- [ ] מערכת אימות למשתמשים

---

**נבנה בעם לקבוצת יבנה** 🌫