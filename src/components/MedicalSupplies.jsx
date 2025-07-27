import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import './SectionStyles.css';

const MedicalSupplies = () => {
  const [supplies, setSupplies] = useState([
    { id: 1, item: 'Syringe', category: 'Equipment', quantity: 100, availability: 'IN STOCK' },
    { id: 2, item: 'Bandage', category: 'First Aid', quantity: 50, availability: 'LOW' },
    { id: 3, item: 'Gloves', category: 'Protection', quantity: 0, availability: 'OUT OF STOCK' },
    { id: 4, item: 'Thermometer', category: 'Diagnostic', quantity: 25, availability: 'IN STOCK' },
    { id: 5, item: 'Scissors', category: 'Surgical Tools', quantity: 10, availability: 'LOW' },
    { id: 6, item: 'Face Mask', category: 'Protection', quantity: 0, availability: 'OUT OF STOCK' },
    { id: 7, item: 'Alcohol Swabs', category: 'Disinfectant', quantity: 75, availability: 'IN STOCK' },
    { id: 8, item: 'IV Drip', category: 'Fluid Therapy', quantity: 15, availability: 'LOW' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newSupply, setNewSupply] = useState({
    item: '',
    category: '',
    quantity: '',
    availability: 'IN STOCK',
  });
  const [editingId, setEditingId] = useState(null);

  const handleAddSupply = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      // Update existing supply
      setSupplies(supplies.map(s =>
        s.id === editingId ? { id: editingId, ...newSupply } : s
      ));
    } else {
      // Add new supply
      const id = supplies.length ? Math.max(...supplies.map(s => s.id)) + 1 : 1;
      setSupplies([...supplies, { id, ...newSupply }]);
    }

    setNewSupply({ item: '', category: '', quantity: '', availability: 'IN STOCK' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (supply) => {
    setNewSupply({
      item: supply.item,
      category: supply.category,
      quantity: supply.quantity,
      availability: supply.availability,
    });
    setEditingId(supply.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setSupplies(supplies.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="section">
      <div className="section-header">
        <h1>Manage Medical Supplies</h1>
        <button
          className="bg-[#025E92] text-white px-6 py-2 rounded font-semibold hover:bg-[#01446d] transition-colors"
          onClick={() => {
            setShowForm(!showForm);
            setNewSupply({ item: '', category: '', quantity: '', availability: 'IN STOCK' });
            setEditingId(null);
          }}
        >
          {showForm ? 'Cancel' : 'Add Supply'}
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
            {editingId !== null ? 'Update' : 'Submit'}
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
                  <div className="action-buttons flex gap-3">
                    <button
                      className="action-button edit"
                      onClick={() => handleEdit(supply)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDelete(supply.id)}
                      title="Delete"
                    >
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
