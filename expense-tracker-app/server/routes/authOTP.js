import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import { generateOTP, storeOTP, verifyOTP, sendOTPEmail } from '../utils/otpService.js';

const router = express.Router();

// @route   POST /api/auth/send-otp-phone
// @desc    Send OTP to user's email (using phone as identifier)
// @access  Public
router.post('/send-otp-phone', [
  body('phone').trim().notEmpty().withMessage('Phone number is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone } = req.body;

    // Find user by phone (stored in name field or create a phone field)
    let user = await User.findOne({ 
      $or: [
        { phone: phone },
        { email: { $regex: phone.replace(/\D/g, ''), $options: 'i' } }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found with this phone number. Please sign up first.' });
    }

    const otp = generateOTP();
    const sessionId = storeOTP(phone, otp, user.email);

    // Send OTP to user's email
    const emailResult = await sendOTPEmail(user.email, otp);

    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }

    res.json({ 
      message: 'OTP sent successfully to your registered email',
      sessionId,
      email: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3') // Masked email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/send-otp-email
// @desc    Send OTP to user's email
// @access  Public
router.post('/send-otp-email', [
  body('email').isEmail().withMessage('Please enter a valid email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;   //rkg

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found with this email. Please sign up first.' });
    }

    const otp = generateOTP();
    const sessionId = storeOTP(email, otp, email);

    // Send OTP to email
    const emailResult = await sendOTPEmail(email, otp);

    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }

    res.json({ 
      message: 'OTP sent successfully to your email',
      sessionId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and login user
// @access  Public
router.post('/verify-otp', [
  body('sessionId').notEmpty().withMessage('Session ID is required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sessionId, otp } = req.body;

    const verification = verifyOTP(sessionId, otp);

    if (!verification.success) {
      return res.status(400).json({ message: verification.message });
    }

    // Find user by email
    const user = await User.findOne({ email: verification.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        monthlyIncome: user.monthlyIncome,
        currency: user.currency
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Existing routes...
// @route   POST /api/auth/signup
router.post('/signup', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        monthlyIncome: user.monthlyIncome,
        currency: user.currency
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        monthlyIncome: user.monthlyIncome,
        currency: user.currency
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        monthlyIncome: req.user.monthlyIncome,
        currency: req.user.currency,
        notifications: req.user.notifications
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
