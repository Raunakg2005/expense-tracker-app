import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Food & Dining',
      'Transportation',
      'Shopping',
      'Entertainment',
      'Bills & Utilities',
      'Healthcare',
      'Education',
      'Travel',
      'Personal Care',
      'Investment',
      'Other'
    ]
  },
  limit: {
    type: Number,
    required: true,
    min: 0
  },
  period: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
    default: 'monthly'
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  alertThreshold: {
    type: Number,
    default: 80, // Alert when 80% of budget is used
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure unique budget per category per user
budgetSchema.index({ user: 1, category: 1 }, { unique: true });

export default mongoose.model('Budget', budgetSchema);
