import React, { useContext, useState } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import '../styles/ExpenseItemComponent.css';
import { FaTrash } from 'react-icons/fa';

const ExpenseItemComponent = () => {
  const { expenses, addExpense, deleteExpense } = useContext(BudgetContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = () => {
    if (title && amount) {
      addExpense(title, amount);
      setTitle("");
      setAmount("");
    }
  };

  return (
    <div className="expense-item-component">
      <h2>Expenses</h2>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Judul Pengeluaran"
      />
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Jumlah"
      />
      <button onClick={handleAddExpense}>Tambah Pengeluaran</button>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.title}: {expense.amount}
            <button onClick={() => deleteExpense(expense._id)}><FaTrash /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseItemComponent;
