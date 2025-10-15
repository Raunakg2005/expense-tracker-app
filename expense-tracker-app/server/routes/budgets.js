import express from 'express';
import { body, validationResult } from 'express-validator';
import Budget from '../models/Budget.js';
import Expense from '../models/Expense.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/budgets
// @desc    Get all budgets for logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    // Calculate spent amount for each budget
    const budgetsWithSpent = await Promise.all(
      budgets.map(async (budget) => {
        const spent = await Expense.aggregate([
          {
            $match: {
              user: req.user._id,
              category: budget.category,
              date: {
                $gte: budget.startDate,
                $lte: budget.endDate
              }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' }
            }
          }
        ]);

        return {
          ...budget.toObject(),
          spent: spent[0]?.total || 0,
          remaining: budget.limit - (spent[0]?.total || 0),
          percentage: ((spent[0]?.total || 0) / budget.limit) * 100
        };
      })
    );

    res.json(budgetsWithSpent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/budgets
// @desc    Create a new budget
// @access  Private
router.post('/', [
  auth,
  body('category').notEmpty().withMessage('Category is required'),
  body('limit').isFloat({ min: 0.01 }).withMessage('Limit must be greater than 0'),
  body('period').isIn(['weekly', 'monthly', 'yearly']).withMessage('Invalid period')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if budget already exists for this category
    const existingBudget = await Budget.findOne({
      user: req.user._id,
      category: req.body.category
    });

    if (existingBudget) {
      return res.status(400).json({ message: 'Budget already exists for this category. Please update the existing one.' });
    }

    const budget = new Budget({
      ...req.body,
      user: req.user._id
    });

    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/budgets/:id
// @desc    Update a budget
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Check if user owns the budget
    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    budget = await Budget.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/budgets/:id
// @desc    Delete a budget
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Check if user owns the budget
    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
