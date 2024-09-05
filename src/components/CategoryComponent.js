import React, { useContext, useState } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import '../styles/CategoryComponent.css';
import { FaTrash } from 'react-icons/fa';

const CategoryComponent = () => {
  const { categories, addCategory, deleteCategory } = useContext(BudgetContext);
  const [name, setName] = useState("");

  const handleAddCategory = () => {
    if (name) {
      addCategory(name);
      setName("");
    }
  };

  return (
    <div className="category-component">
      <h2>Categories</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Nama Kategori"
      />
      <button onClick={handleAddCategory}>Tambah Kategori</button>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => deleteCategory(category._id)}><FaTrash /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryComponent;
