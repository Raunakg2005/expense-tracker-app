import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on the "Sign Up" button in the top right corner. Fill in your name, email, and create a password. You can also sign up using OTP authentication by clicking "Login with OTP".'
        },
        {
          q: 'Is ExpenseTracker free to use?',
          a: 'Yes! ExpenseTracker is completely free to use. All features including expense tracking, budgeting, reports, and analytics are available at no cost.'
        },
        {
          q: 'What devices can I use ExpenseTracker on?',
          a: 'ExpenseTracker is a responsive web application that works on all devices - desktop computers, tablets, and mobile phones. Simply access it through your web browser.'
        }
      ]
    },
    {
      category: 'Expenses',
      questions: [
        {
          q: 'How do I add an expense?',
          a: 'Navigate to the Expenses page and click the "Add Expense" button. Fill in the details including title, amount, category, date, and payment method, then click Save.'
        },
        {
          q: 'Can I edit or delete expenses?',
          a: 'Yes! On the Expenses page, each expense has Edit and Delete buttons. Click Edit to modify the expense details, or Delete to remove it permanently.'
        },
        {
          q: 'What expense categories are available?',
          a: 'We offer 11 categories: Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Healthcare, Education, Travel, Personal Care, Groceries, and Other.'
        },
        {
          q: 'Can I filter expenses by date?',
          a: 'Yes! Use the date range filters on the Expenses page to view expenses from specific time periods. You can also search by title and filter by category.'
        }
      ]
    },
    {
      category: 'Budgets',
      questions: [
        {
          q: 'How do I set a budget?',
          a: 'Go to the Budgets page and click "Create Budget". Select a category, set your budget limit, choose the period (monthly), and set an alert threshold percentage.'
        },
        {
          q: 'What is an alert threshold?',
          a: 'The alert threshold is a percentage (e.g., 80%) that triggers a warning when your spending reaches that level. For example, if your budget is $500 and threshold is 80%, you\'ll be alerted when you spend $400.'
        },
        {
          q: 'Can I have multiple budgets?',
          a: 'Yes! You can create separate budgets for different expense categories to track spending across multiple areas of your finances.'
        }
      ]
    },
    {
      category: 'Reports & Analytics',
      questions: [
        {
          q: 'What reports are available?',
          a: 'The Reports page includes: monthly expense trends (bar chart), category breakdown (pie chart), weekly spending patterns (line chart), and a list of your top 10 expenses.'
        },
        {
          q: 'Can I export my expense data?',
          a: 'Yes! On the Reports page, click the "Export CSV" button to download all your expense data in CSV format, which can be opened in Excel or Google Sheets.'
        },
        {
          q: 'How often are charts updated?',
          a: 'All charts and analytics update in real-time whenever you add, edit, or delete an expense. Your dashboard always shows the latest data.'
        }
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        {
          q: 'How do I change my password?',
          a: 'Currently, password changes can be done by contacting support. A self-service password reset feature is coming soon!'
        },
        {
          q: 'Is my financial data secure?',
          a: 'Yes! We use industry-standard encryption for all data transmission and storage. Your password is hashed using bcrypt, and authentication uses JWT tokens.'
        },
        {
          q: 'Can I update my profile information?',
          a: 'Yes! Go to the Profile page where you can update your name, monthly income, currency preference, and notification settings.'
        },
        {
          q: 'How does OTP login work?',
          a: 'Click "Login with OTP", enter your phone number or email, and you\'ll receive a 6-digit OTP. Enter this code to log in without a password. OTPs expire after 10 minutes.'
        }
      ]
    },
    {
      category: 'Notifications',
      questions: [
        {
          q: 'What notifications can I receive?',
          a: 'You can enable three types of notifications: Budget Alerts (when approaching budget limits), Weekly Reports (summary of spending), and Expense Reminders (prompts to log expenses).'
        },
        {
          q: 'How do I manage notification preferences?',
          a: 'Go to Profile > Notifications tab. Toggle the switches for Budget Alerts, Weekly Reports, and Expense Reminders to enable or disable each notification type.'
        }
      ]
    }
  ];

  const guides = [
    {
      icon: Book,
      title: 'Getting Started Guide',
      description: 'Learn the basics of ExpenseTracker in 5 minutes'
    },
    {
      icon: HelpCircle,
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides for all features'
    },
    {
      icon: MessageCircle,
      title: 'Community Forum',
      description: 'Connect with other users and share tips'
    },
    {
      icon: Mail,
      title: 'Contact Support',
      description: 'Get help from our support team'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How Can We Help?
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Search our knowledge base or browse frequently asked questions
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <guide.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600">{guide.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          {filteredFAQs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No results found for "{searchQuery}". Try a different search term.
              </p>
            </div>
          )}

          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-indigo-600 rounded mr-3"></span>
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((item, index) => {
                  const globalIndex = `${categoryIndex}-${index}`;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-indigo-600 flex-shrink-0 transition-transform ${
                            openFAQ === globalIndex ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {openFAQ === globalIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                              <p className="pt-4">{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-xl"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Help;
