export const categoryColors = {
  'Food & Dining': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', color: '#f97316' },
  'Transportation': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', color: '#3b82f6' },
  'Shopping': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300', color: '#ec4899' },
  'Entertainment': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', color: '#a855f7' },
  'Bills & Utilities': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', color: '#eab308' },
  'Healthcare': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', color: '#ef4444' },
  'Education': { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300', color: '#6366f1' },
  'Travel': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300', color: '#06b6d4' },
  'Personal Care': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300', color: '#10b981' },
  'Investment': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', color: '#22c55e' },
  'Other': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', color: '#6b7280' },
};

export const categories = Object.keys(categoryColors);

export const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Digital Wallet'];

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const exportToCSV = (data, filename) => {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).join(','));
  const csv = [headers, ...rows].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const getMonthDateRange = (monthOffset = 0) => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + monthOffset + 1, 0);
  
  return {
    startDate: firstDay.toISOString().split('T')[0],
    endDate: lastDay.toISOString().split('T')[0],
  };
};
