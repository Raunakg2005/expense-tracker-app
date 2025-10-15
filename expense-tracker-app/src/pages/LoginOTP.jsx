import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Phone, Mail, Lock, Wallet, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginOTP = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1: phone/email, 2: OTP
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = loginMethod === 'phone' ? '/auth/send-otp-phone' : '/auth/send-otp-email';
      const data = loginMethod === 'phone' 
        ? { phone: formData.phone }
        : { email: formData.email };

      const response = await fetch(`http://localhost:5000/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        setSessionId(result.sessionId);
        setStep(2);
      } else {
        setError(result.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          otp: formData.otp
        })
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        window.location.href = '/dashboard';
      } else {
        setError(result.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Login with OTP</h2>
          <p className="mt-2 text-sm text-gray-600">
            Fast and secure authentication
          </p>
        </div>

        {/* Login Form */}
        <div className="card animate-slide-in">
          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Login Method Selector */}
              <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    loginMethod === 'phone'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    loginMethod === 'email'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </button>
              </div>

              {loginMethod === 'phone' ? (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field pl-10"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +91)</p>
                </div>
              ) : (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field pl-10"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start space-x-2">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800">
                  We'll send you a one-time password to verify your identity. The OTP will be sent to your email even if you use phone login.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center space-x-2 group"
              >
                <span>{loading ? 'Sending OTP...' : 'Send OTP'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">
                  We've sent a 6-digit OTP to your email
                  <br />
                  <span className="font-semibold text-gray-900">
                    {loginMethod === 'phone' ? formData.phone : formData.email}
                  </span>
                </p>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    maxLength="6"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                    className="input-field pl-10 text-center text-2xl tracking-widest"
                    placeholder="000000"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || formData.otp.length !== 6}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Verifying...' : 'Verify & Login'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
              >
                Change {loginMethod === 'phone' ? 'phone number' : 'email'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Want to use password?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Login with Password
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginOTP;
