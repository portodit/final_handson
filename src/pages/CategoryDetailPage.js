import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BudgetContext } from '../context/BudgetContext';

const CategoryDetailPage = () => {
  const { walletId, categoryId } = useParams(); // Periksa nama parameter
  const { categories, expenses, addExpense } = useContext(BudgetContext);
  const category = categories.find((c) => c._id === categoryId);
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const handleAddExpense = () => {
    if (newExpenseTitle && newExpenseAmount) {
      addExpense(newExpenseTitle, newExpenseAmount, categoryId, walletId, 'outcome');
      setNewExpenseTitle('');
      setNewExpenseAmount('');
    }
  };

  const categoryExpenses = expenses.filter((expense) => expense.category._id === categoryId);

  return (
    <div>
      <h1>Detail Kategori: {category ? category.name : 'Loading...'}</h1>
      <ul>
        {categoryExpenses.map((expense) => (
          <li key={expense._id}>{expense.title} - {expense.amount}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newExpenseTitle}
        onChange={(e) => setNewExpenseTitle(e.target.value)}
        placeholder="Judul Expense"
      />
      <input
        type="number"
        value={newExpenseAmount}
        onChange={(e) => setNewExpenseAmount(e.target.value)}
        placeholder="Jumlah Expense"
      />
      <button onClick={handleAddExpense}>Tambah Expense</button>
    </div>
  );
}

export default CategoryDetailPage;
