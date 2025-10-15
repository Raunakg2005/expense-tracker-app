import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  PieChart, 
  Shield, 
  Smartphone, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Globe,
  Lock
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

const LandingPage = () => {
  const features = [
    {
      icon: <PieChart className="w-8 h-8" />,
      title: 'Smart Analytics',
      description: 'Get detailed insights into your spending patterns with interactive charts and reports.'
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: 'Budget Management',
      description: 'Set budgets for different categories and track your progress in real-time.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Expense Tracking',
      description: 'Record and categorize all your expenses with just a few clicks.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely with industry-standard protection.'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Friendly',
      description: 'Access your expenses anywhere with our fully responsive design.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Visual Reports',
      description: 'Export detailed reports and visualize your financial journey.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Tracked Expenses' },
    { number: '₹1Cr+', label: 'Money Managed' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Take Control of Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                Finances
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Track expenses, set budgets, and achieve your financial goals with our intelligent expense tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                <span>Sign In</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6 mt-8">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Free forever
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monthly Income</p>
                      <p className="text-xl font-bold text-gray-900">₹85,000</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expenses</p>
                      <p className="text-xl font-bold text-gray-900">₹45,230</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Savings</p>
                      <p className="text-xl font-bold text-gray-900">₹39,770</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-10 -right-10 w-72 h-72 bg-primary-200 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need to manage your finances effectively</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose ExpenseTracker?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Zap className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Lightning Fast</h3>
                    <p className="text-gray-600">Add expenses in seconds with our intuitive interface</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Lock className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Bank-Level Security</h3>
                    <p className="text-gray-600">Your data is encrypted and protected with advanced security</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Trusted by Thousands</h3>
                    <p className="text-gray-600">Join 10,000+ users managing their finances better</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Globe className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Access Anywhere</h3>
                    <p className="text-gray-600">Mobile-friendly design works on all your devices</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop" 
                alt="Analytics Dashboard"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Take Control?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who are already managing their finances better with ExpenseTracker
          </p>
          <Link to="/signup" className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg">
            <span>Get Started for Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">ExpenseTracker</span>
              </div>
              <p className="text-sm">Your trusted partner in financial management.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><a href="mailto:support@expensetracker.com" className="hover:text-white">Email Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 ExpenseTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
