# 🚀 Quick Start Guide - ExpenseTracker

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 20+ installed (`node --version`)
- ✅ MongoDB 6+ installed and running
- ✅ Gmail account (for OTP feature)
- ✅ Code editor (VS Code recommended)

---

## 🔧 Step-by-Step Setup

### Step 1: Install Dependencies

Open terminal in project root:

\`\`\`bash
npm install
\`\`\`

This will install all 28+ dependencies. Wait for completion (1-2 minutes).

---

### Step 2: Configure Email for OTP

#### 2.1 Enable Gmail App Password

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Search for "App Passwords" in settings
4. Select **Mail** as the app
5. Generate password (16 characters)
6. Copy the generated password

#### 2.2 Update .env File

Open `.env` file in root directory and update:

\`\`\`env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
\`\`\`

**Example:**
\`\`\`env
EMAIL_USER=john.doe@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
\`\`\`

---

### Step 3: Start MongoDB

#### Windows:
\`\`\`powershell
net start MongoDB
\`\`\`

#### macOS:
\`\`\`bash
brew services start mongodb-community
\`\`\`

#### Linux:
\`\`\`bash
sudo systemctl start mongod
\`\`\`

#### Verify MongoDB is Running:
\`\`\`bash
mongosh
\`\`\`
Should connect successfully. Type `exit` to close.

---

### Step 4: Seed Database (Recommended)

This creates 3 demo users with sample expenses and budgets:

\`\`\`bash
npm run seed
\`\`\`

**Output should show:**
\`\`\`
✅ MongoDB Connected
✅ Existing data cleared
👥 Creating users...
   ✓ Created user: john@example.com
   ✓ Created user: jane@example.com
   ✓ Created user: mike@example.com
💰 Creating expenses...
   ✓ Created 30 expenses for john@example.com
   ✓ Created 30 expenses for jane@example.com
   ✓ Created 30 expenses for mike@example.com
📊 Creating budgets...
   ✓ Created 5 budgets for john@example.com
   ✓ Created 5 budgets for jane@example.com
   ✓ Created 5 budgets for mike@example.com
🎉 Database seeded successfully!
\`\`\`

**Demo Login Credentials:**
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`
- Email: `mike@example.com` | Password: `password123`

---

### Step 5: Start Backend Server

Open **Terminal 1**:

\`\`\`bash
npm run server
\`\`\`

**Expected Output:**
\`\`\`
🚀 Server running on port 5000
✅ MongoDB Connected
\`\`\`

Keep this terminal running. Don't close it.

---

### Step 6: Start Frontend Dev Server

Open **Terminal 2** (new terminal):

\`\`\`bash
npm run dev
\`\`\`

**Expected Output:**
\`\`\`
VITE v7.1.10  ready in 1234 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
\`\`\`

---

### Step 7: Access Application

Open browser and navigate to:

**🌐 http://localhost:5173**

You should see the **Landing Page** with:
- Hero section
- Features showcase
- Statistics
- Call-to-action buttons

---

## 🎯 Quick Test Flow

### Test 1: Traditional Login

1. Click **"Login"** in navbar
2. Enter credentials:
   - Email: `john@example.com`
   - Password: `password123`
3. Click **"Sign In"**
4. Should redirect to **Dashboard**

### Test 2: OTP Login

1. Logout (click profile menu > Logout)
2. Click **"Login with OTP"** link
3. Toggle to **Email**
4. Enter: `your-actual-email@gmail.com` (the one in .env)
5. Click **"Send OTP"**
6. Check your email inbox
7. Copy 6-digit OTP
8. Paste in OTP fields
9. Click **"Verify & Login"**
10. Should redirect to **Dashboard**

### Test 3: Add Expense

1. Click **"Expenses"** in sidebar
2. Click **"Add Expense"** button
3. Fill form:
   - Title: `Coffee`
   - Amount: `5.50`
   - Category: `Food & Dining`
   - Date: `Today`
   - Payment: `Cash`
4. Click **"Save"**
5. Should see new expense in list

### Test 4: Create Budget

1. Click **"Budgets"** in sidebar
2. Click **"Create Budget"** button
3. Fill form:
   - Category: `Food & Dining`
   - Limit: `500`
   - Period: `Monthly`
   - Alert: `80%`
4. Click **"Create"**
5. Should see progress bar

### Test 5: View Reports

1. Click **"Reports"** in sidebar
2. See charts:
   - Monthly trends (Bar chart)
   - Category breakdown (Pie chart)
   - Weekly pattern (Line chart)
   - Top 10 expenses list
3. Click **"Export CSV"** to download data

---

## 🐛 Common Issues & Fixes

### Issue 1: MongoDB Connection Error

**Error:** `MongooseServerSelectionError`

**Fix:**
\`\`\`bash
# Check if MongoDB is running
mongosh

# If not, start it:
# Windows:
net start MongoDB

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
\`\`\`

---

### Issue 2: Port Already in Use

**Error:** `Port 5000 is already in use`

**Fix:** Update `.env`:
\`\`\`env
PORT=5001
\`\`\`

Then restart backend server.

---

### Issue 3: OTP Not Received

**Possible causes:**
1. ❌ Incorrect Gmail credentials in `.env`
2. ❌ Using regular password instead of App Password
3. ❌ Email in spam folder
4. ❌ 2FA not enabled on Gmail

**Fix:**
1. Double-check `.env` credentials
2. Generate new App Password
3. Check spam/junk folder
4. Enable 2-Step Verification first

---

### Issue 4: React Build Errors

**Error:** Module not found or build failures

**Fix:**
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or on Windows PowerShell:
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
\`\`\`

---

### Issue 5: CORS Errors

**Error:** `CORS policy blocked`

**Fix:** Check `server/index.js` has correct CORS config:
\`\`\`javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
\`\`\`

---

## 📊 What You Should See

### Dashboard (After Login)
- ✅ 4 stat cards (Total Expenses, Income, Savings, Budgets)
- ✅ Line chart (7-day expense trend)
- ✅ Doughnut chart (category breakdown)
- ✅ Recent expenses table

### Expenses Page
- ✅ Search bar
- ✅ Category filter dropdown
- ✅ Date range pickers
- ✅ Add Expense button
- ✅ Expense cards with Edit/Delete buttons
- ✅ Color-coded category badges

### Budgets Page
- ✅ Create Budget button
- ✅ Budget cards with progress bars
- ✅ Color-coded alerts (green/yellow/orange/red)
- ✅ Percentage spent display

### Reports Page
- ✅ Bar chart (monthly trends)
- ✅ Pie chart (category distribution)
- ✅ Line chart (weekly pattern)
- ✅ Top 10 expenses list
- ✅ Export CSV button

---

## 🎨 UI Tour

### Color Coding

**Budget Status:**
- 🟢 Green (0-75%): Safe zone
- 🟡 Yellow (75-100%): Warning zone
- 🟠 Orange (100-125%): Over budget
- 🔴 Red (125%+): Significantly over

**Categories:**
- 🔵 Food & Dining (Blue)
- 🟠 Transportation (Orange)
- 🩷 Shopping (Pink)
- 🟣 Entertainment (Purple)
- 🟡 Bills & Utilities (Yellow)
- 🔴 Healthcare (Red)
- 🔮 Education (Indigo)
- 🔷 Travel (Teal)
- 🌸 Personal Care (Rose)
- 🟢 Groceries (Green)
- ⚫ Other (Gray)

---

## 🎯 Next Steps

### Explore All Pages

1. **Landing Page** (`/`) - Marketing homepage
2. **About** (`/about`) - Company story
3. **Features** (`/features`) - Feature showcase
4. **Contact** (`/contact`) - Contact form
5. **Help** (`/help`) - FAQ and help center
6. **Login** (`/login`) - Password login
7. **Login OTP** (`/login-otp`) - OTP login
8. **Signup** (`/signup`) - Registration
9. **Dashboard** (`/dashboard`) - Overview
10. **Expenses** (`/expenses`) - Expense management
11. **Budgets** (`/budgets`) - Budget tracking
12. **Reports** (`/reports`) - Analytics
13. **Profile** (`/profile`) - User settings

### Customize Application

1. **Update branding:** Edit landing page text/images
2. **Add categories:** Modify category list in code
3. **Change colors:** Update Tailwind config
4. **Add features:** Extend backend routes
5. **Deploy:** Follow deployment guide in README

---

## 📝 Development Tips

### Hot Reload

Both servers support hot reload:
- **Frontend:** Vite auto-refreshes on file changes
- **Backend:** Nodemon auto-restarts on file changes

### Debugging

**Frontend:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Use React DevTools extension

**Backend:**
- Check terminal running `npm run server`
- Look for error messages
- Add `console.log()` for debugging

### Database Management

View data in MongoDB:
\`\`\`bash
mongosh
use expense-tracker
db.users.find()
db.expenses.find()
db.budgets.find()
\`\`\`

---

## ✅ Setup Complete!

You should now have:
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:5173
- ✅ MongoDB connected
- ✅ Email configured for OTP
- ✅ Sample data loaded
- ✅ All 13 pages working

**Enjoy tracking your expenses! 💰📊**

---

## 📞 Need Help?

- 📖 Check `README.md` for detailed documentation
- 📋 See `PROJECT_SUMMARY.md` for complete feature list
- 🆘 Visit `/help` page in application
- 📧 Check troubleshooting section above

**Happy Coding! 🚀**
