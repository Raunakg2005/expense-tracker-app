import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, DollarSign, Globe, Bell, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    monthlyIncome: user?.monthlyIncome || 0,
    currency: user?.currency || 'USD',
  });
  const [notifications, setNotifications] = useState({
    budgetAlerts: user?.notifications?.budgetAlerts ?? true,
    weeklyReports: user?.notifications?.weeklyReports ?? true,
    expenseReminders: user?.notifications?.expenseReminders ?? false,
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/users/profile', profileData);
      updateUser(response.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.put('/users/notifications', notifications);
      setMessage({ type: 'success', text: 'Notification preferences updated!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update notifications' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        {/* Tabs */}
        <div className="card mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'profile'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Notifications
            </button>
          </div>

          {/* Message */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Profile Settings Tab */}
          {activeTab === 'profile' && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleProfileSubmit}
              className="p-6 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={profileData.email}
                    className="input-field pl-10 bg-gray-100 cursor-not-allowed"
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      value={profileData.monthlyIncome}
                      onChange={(e) => setProfileData({ ...profileData, monthlyIncome: parseFloat(e.target.value) })}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={profileData.currency}
                      onChange={(e) => setProfileData({ ...profileData, currency: e.target.value })}
                      className="input-field pl-10"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="AUD">AUD (A$)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="btn-primary flex items-center space-x-2">
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleNotificationsSubmit}
              className="p-6 space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="budgetAlerts"
                      type="checkbox"
                      checked={notifications.budgetAlerts}
                      onChange={(e) => setNotifications({ ...notifications, budgetAlerts: e.target.checked })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="budgetAlerts" className="font-medium text-gray-900 flex items-center">
                      <Bell className="w-4 h-4 mr-2" />
                      Budget Alerts
                    </label>
                    <p className="text-sm text-gray-600">Get notified when you're approaching your budget limits</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="weeklyReports"
                      type="checkbox"
                      checked={notifications.weeklyReports}
                      onChange={(e) => setNotifications({ ...notifications, weeklyReports: e.target.checked })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="weeklyReports" className="font-medium text-gray-900 flex items-center">
                      <Bell className="w-4 h-4 mr-2" />
                      Weekly Reports
                    </label>
                    <p className="text-sm text-gray-600">Receive weekly summaries of your spending</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="expenseReminders"
                      type="checkbox"
                      checked={notifications.expenseReminders}
                      onChange={(e) => setNotifications({ ...notifications, expenseReminders: e.target.checked })}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="expenseReminders" className="font-medium text-gray-900 flex items-center">
                      <Bell className="w-4 h-4 mr-2" />
                      Expense Reminders
                    </label>
                    <p className="text-sm text-gray-600">Daily reminders to log your expenses</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="btn-primary flex items-center space-x-2">
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save Preferences'}</span>
                </button>
              </div>
            </motion.form>
          )}
        </div>

        {/* Account Info */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Member Since</span>
              <span className="font-medium text-gray-900">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Recently joined'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Account ID</span>
              <span className="font-medium text-gray-900 font-mono">{user?.id || user?._id || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
