import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Wallet, TrendingUp, PieChart, Bell, Shield, Download,
  Calendar, CreditCard, Target, BarChart3, FileText, Smartphone
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

const Features = () => {
  const features = [
    {
      icon: Wallet,
      title: 'Expense Tracking',
      description: 'Track every expense with detailed categorization, dates, and payment methods.',
      color: 'bg-blue-500'
    },
    {
      icon: Target,
      title: 'Budget Management',
      description: 'Set monthly budgets for different categories and get alerts when approaching limits.',
      color: 'bg-green-500'
    },
    {
      icon: PieChart,
      title: 'Visual Analytics',
      description: 'Beautiful charts and graphs to visualize your spending patterns and trends.',
      color: 'bg-purple-500'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get notified about budget limits, weekly reports, and expense reminders.',
      color: 'bg-orange-500'
    },
    {
      icon: FileText,
      title: 'Detailed Reports',
      description: 'Generate comprehensive reports with monthly trends and category breakdowns.',
      color: 'bg-pink-500'
    },
    {
      icon: Download,
      title: 'CSV Export',
      description: 'Export your expense data to CSV format for further analysis or backup.',
      color: 'bg-indigo-500'
    },
    {
      icon: Calendar,
      title: 'Date Filtering',
      description: 'Filter expenses by custom date ranges to analyze specific time periods.',
      color: 'bg-teal-500'
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Track expenses by payment method - Cash, Credit Card, Debit Card, or UPI.',
      color: 'bg-yellow-500'
    },
    {
      icon: BarChart3,
      title: 'Category Analysis',
      description: 'Analyze spending across 11+ categories with color-coded visualization.',
      color: 'bg-red-500'
    },
    {
      icon: TrendingUp,
      title: 'Savings Tracking',
      description: 'Monitor your savings with real-time calculations based on income and expenses.',
      color: 'bg-cyan-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Bank-level encryption and security to keep your financial data safe.',
      color: 'bg-gray-700'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Access your finances on any device - desktop, tablet, or mobile.',
      color: 'bg-lime-500'
    }
  ];

  const useCases = [
    {
      title: 'Personal Finance',
      description: 'Perfect for individuals tracking daily expenses and managing personal budgets.',
      emoji: '👤'
    },
    {
      title: 'Family Budgeting',
      description: 'Manage household expenses and track family spending across categories.',
      emoji: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Small Business',
      description: 'Track business expenses, categorize costs, and generate financial reports.',
      emoji: '💼'
    },
    {
      title: 'Students',
      description: 'Stay within budget while managing education and living expenses.',
      emoji: '🎓'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="text-indigo-600"> Complete Control</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to manage your finances effectively, all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Perfect For Everyone
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            No matter who you are, ExpenseTracker adapts to your needs
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg"
              >
                <div className="text-5xl mb-4">{useCase.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Real-Time Insights
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get instant visibility into your spending patterns with our advanced analytics dashboard. 
                Track trends, identify savings opportunities, and make smarter financial decisions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
                  <span>7-day spending trends</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <PieChart className="w-5 h-5 text-purple-500 mr-3" />
                  <span>Category-wise breakdown</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <BarChart3 className="w-5 h-5 text-blue-500 mr-3" />
                  <span>Monthly comparison charts</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 h-80 flex items-center justify-center"
            >
              <BarChart3 className="w-48 h-48 text-indigo-600 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Using These Features Today
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of users who are already managing their money better.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors shadow-xl"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;
