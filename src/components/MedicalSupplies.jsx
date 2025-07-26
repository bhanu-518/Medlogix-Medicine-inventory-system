import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import './SectionStyles.css';

const MedicalSupplies = () => {
  const [supplies, setSupplies] = useState([
    { id: 1, item: 'Syringe', category: 'Equipment', quantity: 100, availability: 'IN STOCK' },
    { id: 2, item: 'Bandage', category: 'First Aid', quantity: 50, availability: 'LOW' },
    { id: 3, item: 'Gloves', category: 'Protection', quantity: 0, availability: 'OUT OF STOCK' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newSupply, setNewSupply] = useState({
    item: '',
    category: '',
    quantity: '',
    availability: 'IN STOCK',
  });

  const handleAddSupply = (e) => {
    e.preventDefault();
    const id = supplies.length + 1;
    const updatedSupplies = [...supplies, { id, ...newSupply }];
    setSupplies(updatedSupplies);
    setNewSupply({ item: '', category: '', quantity: '', availability: 'IN STOCK' });
    setShowForm(false);
  };

  return (
    <div className="section">
      <div className="section-header">
        <h1>Manage Medical Supplies</h1>
        <button
          className="bg-[#025E92] text-white px-6 py-2 rounded font-semibold hover:bg-[#01446d] transition-colors"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel Add" : "Add Supply"}
        </button>
      </div>

      {showForm && (
        <form className="flex flex-wrap gap-4 mb-8 w-full items-end" onSubmit={handleAddSupply}>
          <input
            type="text"
            placeholder="Item"
            className="border px-3 py-2 rounded w-40"
            value={newSupply.item}
            onChange={(e) => setNewSupply({ ...newSupply, item: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="border px-3 py-2 rounded w-40"
            value={newSupply.category}
            onChange={(e) => setNewSupply({ ...newSupply, category: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border px-3 py-2 rounded w-32"
            value={newSupply.quantity}
            onChange={(e) => setNewSupply({ ...newSupply, quantity: e.target.value })}
            required
          />

          <select
            className="border px-3 py-2 rounded w-40 text-[#025E92] border-[#025E92] font-semibold"
            value={newSupply.availability}
            onChange={(e) => setNewSupply({ ...newSupply, availability: e.target.value })}
          >
            <option value="IN STOCK">IN STOCK</option>
            <option value="LOW">LOW</option>
            <option value="OUT OF STOCK">OUT OF STOCK</option>
          </select>

          <button
            type="submit"
            className="bg-[#025E92] text-white px-6 py-2 rounded font-semibold hover:bg-[#01446d] transition-colors"
          >
            Submit
          </button>
        </form>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((supply) => (
              <tr key={supply.id}>
                <td className="font-medium">{supply.item}</td>
                <td>{supply.category}</td>
                <td>{supply.quantity}</td>
                <td>
                  <span
                    className={`status-badge ${
                      supply.availability === 'LOW'
                        ? 'warning'
                        : supply.availability === 'OUT OF STOCK'
                        ? 'danger'
                        : 'success'
                    }`}
                  >
                    {supply.availability}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button edit">
                      <Edit size={16} />
                    </button>
                    <button className="action-button delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalSupplies;
