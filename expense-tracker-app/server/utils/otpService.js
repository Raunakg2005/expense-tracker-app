import nodemailer from 'nodemailer';

// Create transporter (use your email service credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// In-memory OTP store (in production, use Redis or database)
const otpStore = new Map();

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = (identifier, otp, email) => {
  const sessionId = Math.random().toString(36).substring(7);
  otpStore.set(sessionId, {
    identifier,
    otp,
    email,
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
  });
  return sessionId;
};

export const verifyOTP = (sessionId, otp) => {
  const data = otpStore.get(sessionId);
  
  if (!data) {
    return { success: false, message: 'Invalid or expired session' };
  }
  
  if (Date.now() > data.expiresAt) {
    otpStore.delete(sessionId);
    return { success: false, message: 'OTP has expired' };
  }
  
  if (data.otp !== otp) {
    return { success: false, message: 'Invalid OTP' };
  }
  
  const result = { success: true, identifier: data.identifier, email: data.email };
  otpStore.delete(sessionId);
  return result;
};

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'ExpenseTracker <noreply@expensetracker.com>',
    to: email,
    subject: 'Your ExpenseTracker Login OTP',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .otp-box { background: white; border: 2px dashed #0ea5e9; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .otp-code { font-size: 32px; font-weight: bold; color: #0ea5e9; letter-spacing: 8px; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          .button { background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 ExpenseTracker Login</h1>
          </div>
          <div class="content">
            <h2>Your One-Time Password</h2>
            <p>Hello!</p>
            <p>You requested to login to your ExpenseTracker account. Use the OTP below to complete your login:</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p><strong>This OTP is valid for 10 minutes.</strong></p>
            <p>If you didn't request this OTP, please ignore this email or contact support if you have concerns.</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p><strong>Security Tips:</strong></p>
              <ul>
                <li>Never share your OTP with anyone</li>
                <li>ExpenseTracker will never ask for your OTP via phone or email</li>
                <li>Always verify the sender's email address</li>
              </ul>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2025 ExpenseTracker. All rights reserved.</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};
