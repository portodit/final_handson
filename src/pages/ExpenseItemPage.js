import React, { useContext, useState, useEffect } from 'react';
import { BudgetContext } from '../context/BudgetContext';

const ExpenseItemsPage = () => {
  const { categories, expenses, addExpense } = useContext(BudgetContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', flowType: 'income' });

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]._id);
    }
  }, [categories]);

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount && selectedCategory) {
      addExpense(newExpense.title, parseFloat(newExpense.amount), selectedCategory, newExpense.flowType);
      setNewExpense({ title: '', amount: '', flowType: 'income' });
    }
  };

  return (
    <div className="expense-items-page">
      <h1>Expense Items</h1>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
      <input
        type="text"
        value={newExpense.title}
        onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
        placeholder="Expense title"
      />
      <input
        type="number"
        value={newExpense.amount}
        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        placeholder="Amount"
      />
      <select
        value={newExpense.flowType}
        onChange={(e) => setNewExpense({ ...newExpense, flowType: e.target.value })}
      >
        <option value="income">Income</option>
        <option value="outcome">Outcome</option>
      </select>
      <button onClick={handleAddExpense}>Add Expense</button>
      <ul>
        {expenses
          .filter(expense => expense.category._id === selectedCategory)
          .map(expense => (
            <li key={expense._id}>
              {expense.title} - {expense.amount} - {expense.flowType}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExpenseItemsPage;
