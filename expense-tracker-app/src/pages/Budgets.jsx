import { useEffect, useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatCurrency, categoryColors, categories } from '../utils/helpers';

const Budgets = () => {
  const { user } = useAuth();
  const { budgets, loading, fetchBudgets, addBudget, updateBudget, deleteBudget } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Food & Dining',
    limit: '',
    period: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    alertThreshold: 80,
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const openModal = (budget = null) => {
    if (budget) {
      setEditingBudget(budget);
      setFormData({
        category: budget.category,
        limit: budget.limit,
        period: budget.period,
        startDate: new Date(budget.startDate).toISOString().split('T')[0],
        endDate: new Date(budget.endDate).toISOString().split('T')[0],
        alertThreshold: budget.alertThreshold,
      });
    } else {
      setEditingBudget(null);
      setFormData({
        category: 'Food & Dining',
        limit: '',
        period: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
        alertThreshold: 80,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const budgetData = {
      ...formData,
      limit: parseFloat(formData.limit),
    };

    let result;
    if (editingBudget) {
      result = await updateBudget(editingBudget._id, budgetData);
    } else {
      result = await addBudget(budgetData);
    }

    if (result.success) {
      closeModal();
      fetchBudgets();
    } else {
      alert(result.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      await deleteBudget(id);
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusBadge = (percentage) => {
    if (percentage >= 100) return { text: 'Over Budget', color: 'bg-red-100 text-red-700' };
    if (percentage >= 80) return { text: 'High Usage', color: 'bg-orange-100 text-orange-700' };
    if (percentage >= 60) return { text: 'On Track', color: 'bg-yellow-100 text-yellow-700' };
    return { text: 'Good', color: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
            <p className="text-gray-600 mt-1">Create and track your spending limits</p>
          </div>
          <button
            onClick={() => openModal()}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Budget</span>
          </button>
        </div>

        {/* Budget Cards */}
        {loading ? (
          <LoadingSpinner />
        ) : budgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.map((budget, index) => {
              const status = getStatusBadge(budget.percentage);
              return (
                <motion.div
                  key={budget._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card relative overflow-hidden"
                >
                  {/* Category Header */}
                  <div className={`absolute top-0 left-0 right-0 h-2 ${categoryColors[budget.category]?.bg}`}></div>
                  
                  <div className="flex justify-between items-start mb-4 mt-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{budget.category}</h3>
                      <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => openModal(budget)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(budget._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Budget Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        {formatCurrency(budget.spent, user?.currency)} spent
                      </span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(budget.limit, user?.currency)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(budget.percentage, 100)}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full ${getProgressColor(budget.percentage)}`}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{budget.percentage.toFixed(1)}% used</span>
                      {budget.remaining >= 0 ? (
                        <span className="text-xs text-green-600 font-medium">
                          {formatCurrency(budget.remaining, user?.currency)} remaining
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 font-medium flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {formatCurrency(Math.abs(budget.remaining), user?.currency)} over
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Period Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      <div className="font-medium text-gray-700 mb-1 capitalize">{budget.period}</div>
                      <div>
                        {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No budgets yet</h3>
            <p className="text-gray-600 mb-6">Create your first budget to start tracking your spending</p>
            <button onClick={() => openModal()} className="btn-primary">
              Create Budget
            </button>
          </div>
        )}

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingBudget ? 'Edit Budget' : 'Create New Budget'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
                disabled={!!editingBudget}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {editingBudget && (
                <p className="text-xs text-gray-500 mt-1">Category cannot be changed for existing budgets</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Limit *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  className="input-field"
                  placeholder="1000.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period *</label>
                <select
                  required
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="input-field"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Threshold ({formData.alertThreshold}%)
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={formData.alertThreshold}
                onChange={(e) => setFormData({ ...formData, alertThreshold: parseInt(e.target.value) })}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                You'll be notified when {formData.alertThreshold}% of the budget is used
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={closeModal} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingBudget ? 'Update' : 'Create'} Budget
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Budgets;
