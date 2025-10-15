import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';
import Expense from './models/Expense.js';
import Budget from './models/Budget.js';

dotenv.config();

// Sample data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    password: 'password123',
    monthlyIncome: 5000,
    currency: 'USD',
    notifications: {
      budgetAlerts: true,
      weeklyReports: true,
      expenseReminders: false
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    password: 'password123',
    monthlyIncome: 6500,
    currency: 'USD',
    notifications: {
      budgetAlerts: true,
      weeklyReports: false,
      expenseReminders: true
    }
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567892',
    password: 'password123',
    monthlyIncome: 4000,
    currency: 'EUR',
    notifications: {
      budgetAlerts: false,
      weeklyReports: true,
      expenseReminders: true
    }
  }
];

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Personal Care',
  'Groceries',
  'Other'
];

const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI'];

// Generate random expenses for a user
const generateExpenses = (userId, count = 30) => {
  const expenses = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 90); // Random date within last 90 days
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amount = parseFloat((Math.random() * 500 + 10).toFixed(2)); // $10 - $510
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    
    const titles = {
      'Food & Dining': ['Restaurant Bill', 'Coffee Shop', 'Lunch', 'Dinner', 'Fast Food'],
      'Transportation': ['Uber Ride', 'Gas Station', 'Parking', 'Car Maintenance', 'Public Transport'],
      'Shopping': ['Online Shopping', 'Clothing Store', 'Electronics', 'Home Goods', 'Books'],
      'Entertainment': ['Movie Tickets', 'Concert', 'Streaming Service', 'Gaming', 'Sports Event'],
      'Bills & Utilities': ['Electricity Bill', 'Internet Bill', 'Water Bill', 'Phone Bill', 'Rent'],
      'Healthcare': ['Pharmacy', 'Doctor Visit', 'Medicine', 'Health Insurance', 'Gym Membership'],
      'Education': ['Course Fee', 'Books', 'Online Class', 'Tuition', 'Study Materials'],
      'Travel': ['Flight Ticket', 'Hotel', 'Vacation', 'Travel Insurance', 'Tour Package'],
      'Personal Care': ['Salon', 'Spa', 'Cosmetics', 'Haircut', 'Beauty Products'],
      'Groceries': ['Supermarket', 'Weekly Groceries', 'Fresh Produce', 'Dairy Products', 'Snacks'],
      'Other': ['Gift', 'Donation', 'Miscellaneous', 'Emergency', 'Subscription']
    };
    
    const possibleTitles = titles[category];
    const title = possibleTitles[Math.floor(Math.random() * possibleTitles.length)];
    
    expenses.push({
      user: userId,
      title,
      amount,
      category,
      date,
      paymentMethod,
      description: `Sample ${category.toLowerCase()} expense`
    });
  }
  
  return expenses;
};

// Generate budgets for a user
const generateBudgets = (userId) => {
  const budgets = [
    {
      user: userId,
      category: 'Food & Dining',
      limit: 500,
      period: 'monthly',
      alertThreshold: 80
    },
    {
      user: userId,
      category: 'Transportation',
      limit: 300,
      period: 'monthly',
      alertThreshold: 75
    },
    {
      user: userId,
      category: 'Shopping',
      limit: 400,
      period: 'monthly',
      alertThreshold: 85
    },
    {
      user: userId,
      category: 'Entertainment',
      limit: 200,
      period: 'monthly',
      alertThreshold: 90
    },
    {
      user: userId,
      category: 'Bills & Utilities',
      limit: 600,
      period: 'monthly',
      alertThreshold: 70
    }
  ];
  
  return budgets;
};

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Expense.deleteMany({});
    await Budget.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword
      });
      createdUsers.push(user);
      console.log(`   ✓ Created user: ${user.email}`);
    }

    // Create expenses for each user
    console.log('💰 Creating expenses...');
    for (const user of createdUsers) {
      const expenses = generateExpenses(user._id, 30);
      await Expense.insertMany(expenses);
      console.log(`   ✓ Created ${expenses.length} expenses for ${user.email}`);
    }

    // Create budgets for each user
    console.log('📊 Creating budgets...');
    for (const user of createdUsers) {
      const budgets = generateBudgets(user._id);
      await Budget.insertMany(budgets);
      console.log(`   ✓ Created ${budgets.length} budgets for ${user.email}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Sample Login Credentials:');
    console.log('   Email: john@example.com');
    console.log('   Password: password123');
    console.log('\n   Email: jane@example.com');
    console.log('   Password: password123');
    console.log('\n   Email: mike@example.com');
    console.log('   Password: password123\n');

    // Disconnect
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
