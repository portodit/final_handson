import React, { useContext, useState } from 'react';
import { BudgetContext } from '../context/BudgetContext';

const WalletComponent = () => {
  const { wallets, addWallet } = useContext(BudgetContext);
  const [name, setName] = useState("");

  const handleAddWallet = () => {
    addWallet(name);
    setName("");
  };

  return (
    <div className="wallet-component">
      <h2>Wallets</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Nama Wallet"
      />
      <button onClick={handleAddWallet}>Tambah Wallet</button>
      
      
      <ul>
        {Array.isArray(wallets) && wallets.map((wallet) => (
          <li key={wallet._id}>{wallet.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WalletComponent;
