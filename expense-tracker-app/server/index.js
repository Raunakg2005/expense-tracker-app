import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authOTP.js';
import expenseRoutes from './routes/expenses.js';
import budgetRoutes from './routes/budgets.js';
import userRoutes from './routes/users.js';

dotenv.config();

// If the env var isn't loaded (for example when running `node index.js` from the
// `server/` directory), try to load the .env from the project root as a fallback.
if (!process.env.MONGODB_URI) {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const projectRootEnv = path.join(__dirname, '..', '.env');
    dotenv.config({ path: projectRootEnv });
    // Now process.env should be populated if .env existed at project root
  } catch (e) {
    // ignore — we'll handle missing URI later when connecting
  }
}

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
