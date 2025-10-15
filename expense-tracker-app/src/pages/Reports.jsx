import { useEffect, useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { Download, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { formatCurrency, exportToCSV, categoryColors, getMonthDateRange } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';

const Reports = () => {
  const { user } = useAuth();
  const { expenses, fetchExpenses, fetchStats, stats } = useExpense();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('thisMonth');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    loadReports();
  }, [timeRange]);

  const loadReports = async () => {
    setLoading(true);
    let range;
    
    if (timeRange === 'thisMonth') {
      range = getMonthDateRange(0);
    } else if (timeRange === 'lastMonth') {
      range = getMonthDateRange(-1);
    } else if (timeRange === 'custom' && dateRange.startDate && dateRange.endDate) {
      range = dateRange;
    } else if (timeRange === 'custom') {
      // If custom is selected but no dates, default to this month
      range = getMonthDateRange(0);
    }

    if (range) {
      await fetchExpenses(range);
      await fetchStats(range);
    }
    setLoading(false);
  };

  const handleExportCSV = () => {
    const exportData = expenses.map(exp => ({
      Date: new Date(exp.date).toLocaleDateString(),
      Title: exp.title,
      Category: exp.category,
      Amount: exp.amount,
      PaymentMethod: exp.paymentMethod,
      Description: exp.description || '',
    }));

    exportToCSV(exportData, `expenses-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`);
  };

  // Monthly Trend Chart
  const getMonthlyTrendData = () => {
    const monthlyData = {};
    
    expenses.forEach(exp => {
      const month = new Date(exp.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[month] = (monthlyData[month] || 0) + exp.amount;
    });

    return {
      labels: Object.keys(monthlyData),
      datasets: [
        {
          label: 'Monthly Expenses',
          data: Object.values(monthlyData),
          backgroundColor: 'rgba(14, 165, 233, 0.8)',
          borderColor: 'rgb(14, 165, 233)',
          borderWidth: 2,
        },
      ],
    };
  };

  // Category Breakdown Chart
  const getCategoryData = () => {
    const categories = stats?.categoryBreakdown || [];
    
    return {
      labels: categories.map(cat => cat._id),
      datasets: [
        {
          data: categories.map(cat => cat.total),
          backgroundColor: categories.map(cat => categoryColors[cat._id]?.color || '#6b7280'),
          borderWidth: 0,
        },
      ],
    };
  };

  // Daily Spending Pattern
  const getDailyPatternData = () => {
    const dailyData = Array(7).fill(0);
    
    expenses.forEach(exp => {
      const dayOfWeek = new Date(exp.date).getDay();
      dailyData[dayOfWeek] += exp.amount;
    });

    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Average Daily Spending',
          data: dailyData,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Visualize your spending patterns</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="btn-primary flex items-center space-x-2"
            disabled={expenses.length === 0}
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Time Range Filter */}
        <div className="card mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Time Range:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTimeRange('thisMonth')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === 'thisMonth'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setTimeRange('lastMonth')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === 'lastMonth'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Last Month
              </button>
              <button
                onClick={() => setTimeRange('custom')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === 'custom'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Custom Range
              </button>
            </div>
            {timeRange === 'custom' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-wrap items-center gap-2 w-full sm:w-auto"
              >
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  className="input-field text-sm"
                  placeholder="Start Date"
                />
                <span className="text-gray-600 font-medium">to</span>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  className="input-field text-sm"
                  placeholder="End Date"
                />
                <button 
                  onClick={loadReports} 
                  className="btn-primary whitespace-nowrap"
                  disabled={!dateRange.startDate || !dateRange.endDate}
                >
                  Apply
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Spent</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stats?.totalExpenses || 0, user?.currency)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Transactions</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.totalTransactions || 0}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Average per Transaction</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(
                    stats?.totalTransactions > 0 
                      ? (stats?.totalExpenses || 0) / stats?.totalTransactions 
                      : 0,
                    user?.currency
                  )}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        {expenses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Monthly Trend */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Trend</h3>
                <div className="h-64">
                  <Bar
                    data={getMonthlyTrendData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: (context) => formatCurrency(context.parsed.y, user?.currency),
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: (value) => formatCurrency(value, user?.currency),
                          },
                        },
                      },
                    }}
                  />
                </div>
              </motion.div>

              {/* Category Breakdown */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                <div className="h-64 flex items-center justify-center">
                  <Pie
                    data={getCategoryData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'right' },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const label = context.label || '';
                              const value = formatCurrency(context.parsed, user?.currency);
                              return `${label}: ${value}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Daily Pattern */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Spending Pattern</h3>
              <div className="h-64">
                <Line
                  data={getDailyPatternData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context) => formatCurrency(context.parsed.y, user?.currency),
                        },
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => formatCurrency(value, user?.currency),
                        },
                      },
                    },
                  }}
                />
              </div>
            </motion.div>

            {/* Top Expenses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card mt-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Expenses</h3>
              <div className="space-y-3">
                {expenses
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 10)
                  .map((expense, index) => (
                    <div key={expense._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-sm font-semibold text-primary-700">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{expense.title}</p>
                          <p className="text-xs text-gray-500">{expense.category}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(expense.amount, user?.currency)}
                      </span>
                    </div>
                  ))}
              </div>
            </motion.div>
          </>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">No data available for the selected time range</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
