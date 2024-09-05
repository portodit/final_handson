import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BudgetContext } from '../context/BudgetContext';

const WalletDetailPage = () => {
  const { walletId } = useParams();
  const { wallets, categories, updateWallet, addCategory } = useContext(BudgetContext);
  const [currentWallet, setCurrentWallet] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    console.log('Wallet ID from URL:', walletId); // Debugging log
    console.log('Wallets:', wallets); // Debugging log
    const wallet = wallets.find(wallet => wallet._id === walletId);
    console.log('Current Wallet:', wallet); // Debugging log
    setCurrentWallet(wallet);
  }, [walletId, wallets]);

  const handleUpdateWallet = () => {
    if (currentWallet) {
      updateWallet(currentWallet._id, currentWallet.name);
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName);
      setNewCategoryName('');
    }
  };

  if (!currentWallet) return <p>No wallet found.</p>; // Improved loading message

  const walletCategories = categories.filter(category => category.wallet._id === currentWallet._id);

  return (
    <div className="wallet-detail-page">
      <h1>Detail Wallet</h1>
      <input
        type="text"
        value={currentWallet.name}
        onChange={(e) => setCurrentWallet({ ...currentWallet, name: e.target.value })}
      />
      <button onClick={handleUpdateWallet}>Update Wallet</button>
      <h2>Kategori</h2>
      <input
        type="text"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="Tambah kategori baru"
      />
      <button onClick={handleAddCategory}>Tambah Kategori</button>
      {walletCategories.length === 0 ? (
        <p>Kategori untuk wallet ini belum ada.</p>
      ) : (
        <ul>
          {walletCategories.map(category => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WalletDetailPage;
