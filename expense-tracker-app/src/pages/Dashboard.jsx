import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useExpense } from '../context/ExpenseContext';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { formatCurrency, getMonthDateRange, categoryColors } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { user } = useAuth();
  const { expenses, budgets, loading, fetchExpenses, fetchBudgets, fetchStats, stats } = useExpense();
  const [timeRange, setTimeRange] = useState('month');
  const [dashboardData, setDashboardData] = useState({
    totalExpenses: 0,
    totalIncome: user?.monthlyIncome || 0,
    savings: 0,
    transactionCount: 0,
    categoryBreakdown: [],
  });

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    const dateRange = getMonthDateRange(timeRange === 'lastMonth' ? -1 : 0);
    await fetchExpenses(dateRange);
    await fetchBudgets();
    await fetchStats(dateRange);
  };

  useEffect(() => {
    if (expenses && user) {
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const income = user.monthlyIncome || 0;
      
      setDashboardData({
        totalExpenses: total,
        totalIncome: income,
        savings: income - total,
        transactionCount: expenses.length,
        categoryBreakdown: stats?.categoryBreakdown || [],
      });
    }
  }, [expenses, user, stats]);

  // Expense Trend Chart Data
  const getExpenseTrendData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    const dailyExpenses = last7Days.map(date => {
      const dayExpenses = expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.toDateString() === date.toDateString();
      });
      return dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    });

    return {
      labels: last7Days.map(date => date.toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [
        {
          label: 'Daily Expenses',
          data: dailyExpenses,
          borderColor: 'rgb(14, 165, 233)',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  // Category Distribution Chart Data
  const getCategoryChartData = () => {
    const categories = dashboardData.categoryBreakdown;
    
    return {
      labels: categories.map(cat => cat._id),
      datasets: [
        {
          data: categories.map(cat => cat.total),
          backgroundColor: categories.map(cat => categoryColors[cat._id]?.color || '#6b7280'),
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };
  };

  if (loading && expenses.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  const savingsPercentage = dashboardData.totalIncome > 0 
    ? ((dashboardData.savings / dashboardData.totalIncome) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}! Here's your financial overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Expenses</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(dashboardData.totalExpenses, user?.currency)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-red-600 font-medium">{dashboardData.transactionCount} transactions</span>
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
                <p className="text-sm text-gray-600 font-medium">Monthly Income</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(dashboardData.totalIncome, user?.currency)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">This month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Savings</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(dashboardData.savings, user?.currency)}
                </h3>
              </div>
              <div className={`w-12 h-12 ${dashboardData.savings >= 0 ? 'bg-blue-100' : 'bg-orange-100'} rounded-lg flex items-center justify-center`}>
                <DollarSign className={`w-6 h-6 ${dashboardData.savings >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${dashboardData.savings >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                {savingsPercentage}% of income
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Active Budgets</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{budgets.length}</h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Calendar className="w-4 h-4 text-purple-600 mr-1" />
              <span className="text-purple-600 font-medium">Categories tracked</span>
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Expense Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">7-Day Expense Trend</h3>
            <div className="h-64">
              <Line
                data={getExpenseTrendData()}
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

          {/* Category Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
            <div className="h-64 flex items-center justify-center">
              {dashboardData.categoryBreakdown.length > 0 ? (
                <Doughnut
                  data={getCategoryChartData()}
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
              ) : (
                <p className="text-gray-500">No expenses to display</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
            <a href="/expenses" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            {expenses.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.slice(0, 5).map((expense) => (
                    <tr key={expense._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{expense.title}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[expense.category]?.bg} ${categoryColors[expense.category]?.text}`}>
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">
                        {formatCurrency(expense.amount, user?.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500 py-8">No expenses yet. Start tracking!</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
