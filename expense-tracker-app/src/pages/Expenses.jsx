import { useEffect, useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, Search, Filter, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatCurrency, formatDate, categoryColors, categories, paymentMethods } from '../utils/helpers';

const Expenses = () => {
  const { user } = useAuth();
  const { expenses, loading, fetchExpenses, addExpense, updateExpense, deleteExpense } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    startDate: '',
    endDate: '',
  });
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0],
    description: '',
    paymentMethod: 'Cash',
  });

  useEffect(() => {
    handleFilterChange();
  }, [filters]);

  const handleFilterChange = () => {
    const filterParams = {};
    if (filters.search) filterParams.search = filters.search;
    if (filters.category !== 'All') filterParams.category = filters.category;
    if (filters.startDate) filterParams.startDate = filters.startDate;
    if (filters.endDate) filterParams.endDate = filters.endDate;
    fetchExpenses(filterParams);
  };

  const openModal = (expense = null) => {
    if (expense) {
      setEditingExpense(expense);
      setFormData({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: new Date(expense.date).toISOString().split('T')[0],
        description: expense.description || '',
        paymentMethod: expense.paymentMethod,
      });
    } else {
      setEditingExpense(null);
      setFormData({
        title: '',
        amount: '',
        category: 'Food & Dining',
        date: new Date().toISOString().split('T')[0],
        description: '',
        paymentMethod: 'Cash',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    let result;
    if (editingExpense) {
      result = await updateExpense(editingExpense._id, expenseData);
    } else {
      result = await addExpense(expenseData);
    }

    if (result.success) {
      closeModal();
      fetchExpenses(filters);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
  };

  const filteredExpenses = expenses;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
            <p className="text-gray-600 mt-1">Track and manage your expenses</p>
          </div>
          <button
            onClick={() => openModal()}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="input-field pl-10 appearance-none"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="input-field pl-10"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        {/* Expenses List */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="card">
            {filteredExpenses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Title</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Category</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Payment</th>
                      <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">Amount</th>
                      <th className="text-right py-4 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map((expense, index) => (
                      <motion.tr
                        key={expense._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{expense.title}</p>
                            {expense.description && (
                              <p className="text-xs text-gray-500 mt-1">{expense.description}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[expense.category]?.bg} ${categoryColors[expense.category]?.text}`}>
                            {expense.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{formatDate(expense.date)}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{expense.paymentMethod}</td>
                        <td className="py-4 px-4 text-sm font-semibold text-gray-900 text-right">
                          {formatCurrency(expense.amount, user?.currency)}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => openModal(expense)}
                              className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(expense._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No expenses found</p>
                <button
                  onClick={() => openModal()}
                  className="mt-4 btn-primary"
                >
                  Add Your First Expense
                </button>
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingExpense ? 'Edit Expense' : 'Add New Expense'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="e.g., Grocery shopping"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="input-field"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="input-field"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows="3"
                placeholder="Optional notes..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={closeModal} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingExpense ? 'Update' : 'Add'} Expense
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Expenses;
