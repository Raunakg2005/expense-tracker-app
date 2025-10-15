# 💰 ExpenseTracker - Modern Expense Management Application

A full-stack MERN expense tracking application with advanced features including OTP authentication, budget management, interactive analytics, and comprehensive reporting.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1-61dafb.svg)
![Node](https://img.shields.io/badge/Node-20+-339933.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19-47A248.svg)

## ✨ Features

### 🔐 Authentication
- **Dual Login System**: Traditional email/password or OTP-based authentication
- **OTP via Email**: Secure 6-digit OTP sent to email using Nodemailer
- **JWT Tokens**: Secure session management with JSON Web Tokens
- **Password Hashing**: Industry-standard bcrypt encryption

### � Expense Management
- **CRUD Operations**: Create, read, update, and delete expenses
- **11 Categories**: Food, Transportation, Shopping, Entertainment, Bills, Healthcare, Education, Travel, Personal Care, Groceries, Other
- **Payment Methods**: Cash, Credit Card, Debit Card, UPI
- **Advanced Filtering**: Search by title, filter by category, date range selection
- **Color-Coded Categories**: Visual identification with custom color scheme

### � Budget Tracking
- **Category Budgets**: Set monthly budgets for each expense category
- **Real-Time Progress**: Live progress bars with percentage tracking
- **Smart Alerts**: Customizable threshold warnings (e.g., 80% spent)
- **Color-Coded Status**: Green (safe), Yellow (warning), Orange/Red (over budget)

### 📈 Analytics & Reports
- **Interactive Charts**: Line, Bar, Pie, and Doughnut charts using Chart.js
- **7-Day Trends**: Week-over-week spending analysis
- **Category Breakdown**: Visual distribution of expenses
- **Monthly Comparisons**: Track spending patterns over time
- **Top 10 Expenses**: Identify biggest spending items
- **CSV Export**: Download complete expense history

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for elegant transitions
- **Modern UI**: Tailwind CSS 3.4 with custom components
- **Loading States**: Skeleton screens and spinners
- **Modal Dialogs**: Intuitive forms for data entry

### 📱 Pages (10+ Pages)
1. **Landing Page** - Marketing homepage with features showcase
2. **Login** - Traditional email/password authentication
3. **Login OTP** - Phone/email OTP authentication
4. **Signup** - New user registration
5. **Dashboard** - Overview with stats, charts, recent expenses
6. **Expenses** - Complete expense management with CRUD
7. **Budgets** - Budget creation and tracking
8. **Reports** - Analytics, charts, and CSV export
9. **Profile** - User settings and notification preferences
10. **About** - Company story, team, and values
11. **Features** - Detailed feature showcase
12. **Contact** - Contact form and information
13. **Help/FAQ** - Comprehensive help center with FAQs

## �️ Tech Stack

### Frontend
- **React 19.1** - UI library
- **Vite 7.1** - Build tool
- **Tailwind CSS 3.4** - Styling
- **React Router 7.9** - Routing
- **Framer Motion 12.23** - Animations
- **Chart.js 4.5** - Charts
- **Axios 1.12** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express 5.1** - Web framework
- **MongoDB** - Database
- **Mongoose 8.19** - ODM
- **JWT** - Authentication
- **Bcrypt 3.0** - Password hashing
- **Nodemailer 7.0** - Email (OTP)

## 📦 Installation

### Prerequisites
- Node.js 20+ installed
- MongoDB 6+ installed and running
- Gmail account (for OTP emails)

### Step 1: Clone Repository
\`\`\`bash
git clone <repository-url>
cd expense-tracker-app
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Environment Setup
Create/update \`.env\` file:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_strong_jwt_secret_change_this
NODE_ENV=development

# Email Configuration (for OTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
\`\`\`

**Gmail Setup for OTP:**
1. Enable 2-Factor Authentication in Google Account
2. Go to Security > 2-Step Verification > App Passwords
3. Generate "App Password" for "Mail"
4. Use this 16-character password in \`EMAIL_PASSWORD\`

### Step 4: Start MongoDB
\`\`\`bash
# Windows (if installed as service)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
\`\`\`

### Step 5: Seed Database (Optional)
\`\`\`bash
npm run seed
\`\`\`

**Sample Credentials:**
- Email: \`john@example.com\` | Password: \`password123\`
- Email: \`jane@example.com\` | Password: \`password123\`
- Email: \`mike@example.com\` | Password: \`password123\`

### Step 6: Start Application

**Terminal 1 - Backend:**
\`\`\`bash
npm run server
\`\`\`
Server: http://localhost:5000

**Terminal 2 - Frontend:**
\`\`\`bash
npm run dev
\`\`\`
Frontend: http://localhost:5173

## � Usage

### Using OTP Login
1. Click "Login with OTP"
2. Toggle between Phone/Email
3. Enter phone/email
4. Click "Send OTP"
5. Check email for 6-digit code
6. Enter OTP and verify

### Adding Expenses
1. Go to "Expenses"
2. Click "Add Expense"
3. Fill details
4. Click "Save"

### Setting Budgets
1. Go to "Budgets"
2. Click "Create Budget"
3. Select category, set limit
4. Choose alert threshold
5. Click "Create"

## � Project Structure

\`\`\`
expense-tracker-app/
├── server/
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Auth middleware
│   ├── utils/         # OTP service
│   ├── index.js       # Server entry
│   └── seed.js        # DB seeder
├── src/
│   ├── components/    # Reusable components
│   ├── context/       # State management
│   ├── pages/         # Page components
│   ├── utils/         # Helper functions
│   ├── App.jsx        # Main app
│   └── index.css      # Styles
├── .env               # Environment vars
├── package.json       # Dependencies
└── README.md          # This file
\`\`\`

## 🔧 Available Scripts

\`\`\`bash
npm run dev          # Start frontend (port 5173)
npm run server       # Start backend (port 5000)
npm run seed         # Seed database
npm run build        # Build for production
npm run lint         # Run ESLint
\`\`\`

## 🎨 Category Colors

- Food & Dining: Blue (#3B82F6)
- Transportation: Orange (#F97316)
- Shopping: Pink (#EC4899)
- Entertainment: Purple (#A855F7)
- Bills & Utilities: Yellow (#EAB308)
- Healthcare: Red (#EF4444)
- Education: Indigo (#6366F1)
- Travel: Teal (#14B8A6)
- Personal Care: Rose (#F43F5E)
- Groceries: Green (#22C55E)
- Other: Gray (#6B7280)

## 🔐 Security Features

- Password hashing with Bcrypt
- JWT token authentication
- HTTP-only cookies
- Input validation
- CORS configuration
- OTP expiration (10 minutes)

## 🐛 Troubleshooting

### MongoDB Connection Issues
\`\`\`bash
# Check MongoDB status
mongosh

# Start MongoDB
# Windows: net start MongoDB
# Linux: sudo systemctl start mongod
\`\`\`

### Email/OTP Not Sending
1. Verify Gmail credentials in \`.env\`
2. Use App Password (not regular password)
3. Check spam folder
4. View server console for errors

## 📄 License

MIT License - Free for personal/commercial use.

## 📧 Support

- Email: support@expensetracker.com
- Help: http://localhost:5173/help
- Contact: http://localhost:5173/contact

---

**Built with ❤️ using the MERN Stack**

Happy Expense Tracking! 💰📊
