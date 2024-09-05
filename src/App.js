import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryComponent from './components/CategoryComponent';
import ExpenseItemComponent from './components/ExpenseItemComponent';
import WalletDetailPage from './pages/WalletDetailPage';
import { BudgetProvider } from './context/BudgetContext';
import './App.css';

function App() {
  return (
    <BudgetProvider>
      <Router>
        <div className="app-container">
          <header>
            <h1>BudgetMaster</h1>
            <p>Your ultimate tool for managing budgets effectively and efficiently.</p>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoryComponent />} />
              <Route path="/expenses" element={<ExpenseItemComponent />} />
              <Route path="/wallet/:id" element={<WalletDetailPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BudgetProvider>
  );
}

export default App;
