import React, { createContext, useState, useEffect } from 'react';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [wallets, setWallets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch wallets
        const walletsResponse = await fetch('https://digistar-demo-be.vercel.app/api/wallets');
        if (!walletsResponse.ok) throw new Error('Failed to fetch wallets');
        const walletsData = await walletsResponse.json();
        setWallets(walletsData.data || []);

        // Fetch categories
        const categoriesResponse = await fetch('https://digistar-demo-be.vercel.app/api/categories');
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.data || []);

        // Fetch expenses
        const expensesResponse = await fetch('https://digistar-demo-be.vercel.app/api/expense-items');
        if (!expensesResponse.ok) throw new Error('Failed to fetch expenses');
        const expensesData = await expensesResponse.json();
        setExpenses(expensesData.data || []); // Ensure expenses is an array
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally, handle errors or set an error state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  const addWallet = async (name) => {
    try {
      const response = await fetch('https://digistar-demo-be.vercel.app/api/wallets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (data.data) setWallets(prevWallets => [...prevWallets, data.data]);
      else console.error('Failed to create wallet', data);
    } catch (error) {
      console.error('Error adding wallet:', error);
    }
  };

  const deleteWallet = async (id) => {
    try {
      await fetch(`https://digistar-demo-be.vercel.app/api/wallets/${id}`, {
        method: 'DELETE',
      });
      setWallets(prevWallets => prevWallets.filter(wallet => wallet._id !== id));
    } catch (error) {
      console.error('Error deleting wallet:', error);
    }
  };

  const updateWallet = async (id, name) => {
    try {
      const response = await fetch(`https://digistar-demo-be.vercel.app/api/wallets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (data.data) {
        setWallets(prevWallets => prevWallets.map(wallet => wallet._id === id ? data.data : wallet));
      } else {
        console.error('Failed to update wallet', data);
      }
    } catch (error) {
      console.error('Error updating wallet:', error);
    }
  };

  const addCategory = async (name) => {
    try {
      const response = await fetch('https://digistar-demo-be.vercel.app/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (data.data) setCategories(prevCategories => [...prevCategories, data.data]);
      else console.error('Failed to create category', data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await fetch(`https://digistar-demo-be.vercel.app/api/categories/${id}`, {
        method: 'DELETE',
      });
      setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const addExpense = async (title, amount, walletId, categoryId) => {
    try {
      const response = await fetch('https://digistar-demo-be.vercel.app/api/expense-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount, wallet: walletId, category: categoryId }),
      });
      const data = await response.json();
      if (data.data) setExpenses(prevExpenses => [...prevExpenses, data.data]);
      else console.error('Failed to create expense', data);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await fetch(`https://digistar-demo-be.vercel.app/api/expense-items/${id}`, {
        method: 'DELETE',
      });
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <BudgetContext.Provider value={{ 
      wallets, 
      categories, 
      expenses, 
      addWallet, 
      deleteWallet, 
      updateWallet, 
      addCategory, 
      deleteCategory, 
      addExpense, 
      deleteExpense,
      loading 
    }}>
      {children}
    </BudgetContext.Provider>
  );
};
