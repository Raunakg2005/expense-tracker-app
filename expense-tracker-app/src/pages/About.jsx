import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, TrendingUp, Shield, Award, Heart } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

const About = () => {
  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Expenses Tracked', value: '50,000+', icon: TrendingUp },
    { label: 'Money Saved', value: '$2M+', icon: Award },
    { label: 'Countries', value: '25+', icon: Target }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your financial data is encrypted and protected with industry-standard security measures.'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Built with you in mind. Simple, intuitive, and designed for everyday use.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'We constantly evolve based on user feedback to provide the best experience.'
    }
  ];

  const team = [
    { 
      name: 'Neelutpal Dutta', 
      role: 'Full Stack Developer',
      image: '/neel.jpg'
    },
    { 
      name: 'Naman Agarwal', 
      role: 'Backend Developer',
      image: '/naman.jpg'
    },
    { 
      name: 'Omkar Dalla', 
      role: 'Frontend Developer',
      image: '/omkar.jpg'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-indigo-600">ExpenseTracker</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're on a mission to help people take control of their finances through 
              simple, powerful expense tracking and budgeting tools.
            </p>
          </motion.div>
        </div>
      </section>  

      {/* Stats Section rkg */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                ExpenseTracker was born from a simple frustration: managing personal finances 
                was too complicated and time-consuming. In 2023, our founder Alex Johnson 
                decided to create a solution that would make expense tracking as simple as 
                sending a text message.
              </p>
              <p>
                What started as a weekend project quickly grew into a comprehensive financial 
                management platform used by thousands of people worldwide. Our team of passionate 
                developers, designers, and financial experts work tirelessly to build tools that 
                truly make a difference in people's lives.
              </p>
              <p>
                Today, ExpenseTracker helps users track over 50,000 expenses monthly, save 
                millions of dollars through better budgeting, and gain peace of mind about 
                their financial health.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <value.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
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
              Ready to Take Control of Your Finances?
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

export default About;
