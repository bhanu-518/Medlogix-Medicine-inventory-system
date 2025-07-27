import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import './SectionStyles.css';

const MedicationsSection = () => {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Aspirin', type: 'Tablet', quantity: 500, manufactured: '2023-12-15', status: 'In Stock' },
    { id: 2, name: 'Amoxicillin', type: 'Capsule', quantity: 250, manufactured: '2023-08-20', status: 'In Stock' },
    { id: 3, name: 'Ibuprofen', type: 'Tablet', quantity: 50, manufactured: '2024-06-10', status: 'Low Stock' },
    { id: 4, name: 'Paracetamol', type: 'Syrup', quantity: 75, manufactured: '2024-01-30', status: 'In Stock' },
    { id: 5, name: 'Insulin', type: 'Injection', quantity: 25, manufactured: '2024-05-15', status: 'Low Stock' },
    { id: 6, name: 'Cough Syrup', type: 'Syrup', quantity: 0, manufactured: '2023-11-05', status: 'Out of Stock' },
    { id: 7, name: 'Metformin', type: 'Tablet', quantity: 300, manufactured: '2024-03-12', status: 'In Stock' },
    { id: 8, name: 'Azithromycin', type: 'Tablet', quantity: 90, manufactured: '2024-02-28', status: 'In Stock' },
    { id: 9, name: 'Vitamin C', type: 'Tablet', quantity: 20, manufactured: '2024-06-01', status: 'Low Stock' },
    { id: 10, name: 'Hydrocortisone', type: 'Cream', quantity: 0, manufactured: '2023-10-10', status: 'Out of Stock' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const location = useLocation();

  const [newMedication, setNewMedication] = useState({
    name: '',
    type: '',
    quantity: '',
    manufactured: '',
    status: 'In Stock',
  });

  // Show form if '?add=true' in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('add') === 'true') {
      setShowForm(true);
    }
  }, [location]);

  // Submit form (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Edit mode: update existing medication
      setMedications((prev) =>
        prev.map((med) => (med.id === editId ? { id: editId, ...newMedication } : med))
      );
    } else {
      // Add mode: create new medication
      const id = medications.length + 1;
      setMedications([...medications, { id, ...newMedication }]);
    }

    // Reset form state
    setNewMedication({ name: '', type: '', quantity: '', manufactured: '', status: 'In Stock' });
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  // Delete medication
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this medication?');
    if (confirm) {
      setMedications(medications.filter((med) => med.id !== id));
    }
  };

  // Start editing
  const handleEdit = (med) => {
    setShowForm(true);
    setIsEditing(true);
    setEditId(med.id);
    setNewMedication({
      name: med.name,
      type: med.type,
      quantity: med.quantity,
      manufactured: med.manufactured,
      status: med.status,
    });
  };

  return (
    <div className="section">
      {/* Header */}
      <div className="section-header flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Manage Medications</h1>
        <button
          type="button"
          className="bg-[#025E92] text-white px-6 py-2 rounded font-semibold hover:bg-[#01466E] transition-colors"
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false);
            setNewMedication({ name: '', type: '', quantity: '', manufactured: '', status: 'In Stock' });
          }}
        >
          {showForm ? 'Cancel' : 'Add Medications'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form className="flex flex-wrap gap-4 mb-6" onSubmit={handleSubmit}>
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
            {isEditing ? 'Update' : 'Submit'}
          </button>
        </form>
      )}

      {/* Table */}
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
                  <div className="action-buttons flex gap-3">
                    <button
                      className="action-button edit"
                      title="Edit"
                      onClick={() => handleEdit(med)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="action-button delete"
                      title="Delete"
                      onClick={() => handleDelete(med.id)}
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

export default MedicationsSection;
