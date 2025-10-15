import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, monthlyIncome, currency } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (monthlyIncome !== undefined) updateData.monthlyIncome = monthlyIncome;
    if (currency) updateData.currency = currency;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/users/notifications
// @desc    Update notification preferences
// @access  Private
router.put('/notifications', auth, async (req, res) => {
  try {
    const { budgetAlerts, weeklyReports, expenseReminders } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          'notifications.budgetAlerts': budgetAlerts,
          'notifications.weeklyReports': weeklyReports,
          'notifications.expenseReminders': expenseReminders
        }
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
