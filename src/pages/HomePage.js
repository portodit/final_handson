import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BudgetContext } from '../context/BudgetContext';
import '../styles/HomePage.css';
import { FaTrash } from 'react-icons/fa';

function HomePage() {
  const { wallets, addWallet, deleteWallet } = useContext(BudgetContext);
  const [newWalletName, setNewWalletName] = useState('');

  const handleAddWallet = () => {
    if (newWalletName) {
      addWallet(newWalletName);
      setNewWalletName('');
    }
  };

  return (
    <div className="home-page">
      <h1>Daftar Wallet</h1>
      <input
        type="text"
        value={newWalletName}
        onChange={(e) => setNewWalletName(e.target.value)}
        placeholder="Nama Wallet"
      />
      <button onClick={handleAddWallet}>Tambah Wallet</button>
      <ul>
        {Array.isArray(wallets) && wallets.length > 0 ? (
          wallets.map(wallet => (
            <li key={wallet._id}>
              <Link to={`/wallet/${wallet._id}`}>{wallet.name}</Link>
              <button onClick={() => deleteWallet(wallet._id)}><FaTrash /></button>
            </li>
          ))
        ) : (
          <p>Belum ada wallet.</p>
        )}
      </ul>
    </div>
  );
}

export default HomePage;
