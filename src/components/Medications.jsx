import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import './SectionStyles.css';

const MedicationsSection = () => {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Aspirin', type: 'Tablet', quantity: 500, manufactured: '2023-12-15', status: 'In Stock' },
    { id: 2, name: 'Amoxicillin', type: 'Capsule', quantity: 250, manufactured: '2023-08-20', status: 'In Stock' },
    { id: 3, name: 'Ibuprofen', type: 'Tablet', quantity: 50, manufactured: '2024-06-10', status: 'Low Stock' },
    { id: 4, name: 'Paracetamol', type: 'Syrup', quantity: 75, manufactured: '2024-01-30', status: 'In Stock' },
    { id: 5, name: 'Insulin', type: 'Injection', quantity: 25, manufactured: '2024-05-15', status: 'Low Stock' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    type: '',
    quantity: '',
    manufactured: '',
    status: 'In Stock',
  });

  const handleAddMedication = (e) => {
    e.preventDefault();
    const id = medications.length + 1;
    setMedications([...medications, { id, ...newMedication }]);
    setNewMedication({ name: '', type: '', quantity: '', manufactured: '', status: 'In Stock' });
    setShowForm(false);
  };

  return (
    <div className="section">
      {/* Responsive header section */}
      <div className="section-header flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Manage Medications</h1>
        <button
          type="button"
          className="bg-[#025E92] text-white px-6 py-2 rounded font-semibold hover:bg-[#01466E] transition-colors"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Medications'}
        </button>
      </div>

      {showForm && (
        <form className="flex flex-wrap gap-4 mb-6" onSubmit={handleAddMedication}>
          <input
            type="text"
            placeholder="Name"
            className="border px-3 py-2 rounded w-40"
            value={newMedication.name}
            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Type"
            className="border px-3 py-2 rounded w-40"
            value={newMedication.type}
            onChange={(e) => setNewMedication({ ...newMedication, type: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border px-3 py-2 rounded w-32"
            value={newMedication.quantity}
            onChange={(e) => setNewMedication({ ...newMedication, quantity: e.target.value })}
            required
          />
          <input
            type="date"
            className="border px-3 py-2 rounded w-48"
            value={newMedication.manufactured}
            onChange={(e) => setNewMedication({ ...newMedication, manufactured: e.target.value })}
            required
          />
          <select
            className="border px-3 py-2 rounded w-40 text-[#025E92] border-[#025E92] font-semibold"
            value={newMedication.status}
            onChange={(e) => setNewMedication({ ...newMedication, status: e.target.value })}
          >
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <button
            type="submit"
            className="bg-[#025E92] text-white px-6 py-2 rounded font-semibold hover:bg-[#01466E] transition-colors"
          >
            Submit
          </button>
        </form>
      )}

      <div className="table-container overflow-x-auto">
        <table className="data-table w-full text-sm md:text-base">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Manufactured Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med) => (
              <tr key={med.id}>
                <td className="font-medium">{med.name}</td>
                <td>{med.type}</td>
                <td>{med.quantity}</td>
                <td>{med.manufactured}</td>
                <td>
                  <span
                    className={`status-badge ${
                      med.status === 'Low Stock'
                        ? 'warning'
                        : med.status === 'Out of Stock'
                        ? 'danger'
                        : 'success'
                    }`}
                  >
                    {med.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons flex gap-2">
                    <button className="action-button edit" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="action-button delete" title="Delete">
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

export default MedicationsSection;
