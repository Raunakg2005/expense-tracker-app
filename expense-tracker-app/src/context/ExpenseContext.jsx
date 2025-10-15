import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchExpenses();
      fetchBudgets();
    }
  }, [isAuthenticated]);

  const fetchExpenses = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/expenses?${params}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await api.get('/budgets');
      setBudgets(response.data);
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
    }
  };

  const fetchStats = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(`/expenses/stats/summary?${params}`);
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const response = await api.post('/expenses', expenseData);
      setExpenses((prev) => [response.data, ...prev]);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add expense',
      };
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const response = await api.put(`/expenses/${id}`, expenseData);
      setExpenses((prev) =>
        prev.map((expense) => (expense._id === id ? response.data : expense))
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update expense',
      };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete expense',
      };
    }
  };

  const addBudget = async (budgetData) => {
    try {
      const response = await api.post('/budgets', budgetData);
      setBudgets((prev) => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add budget',
      };
    }
  };

  const updateBudget = async (id, budgetData) => {
    try {
      const response = await api.put(`/budgets/${id}`, budgetData);
      setBudgets((prev) =>
        prev.map((budget) => (budget._id === id ? response.data : budget))
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update budget',
      };
    }
  };

  const deleteBudget = async (id) => {
    try {
      await api.delete(`/budgets/${id}`);
      setBudgets((prev) => prev.filter((budget) => budget._id !== id));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete budget',
      };
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        budgets,
        loading,
        stats,
        fetchExpenses,
        fetchBudgets,
        fetchStats,
        addExpense,
        updateExpense,
        deleteExpense,
        addBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
