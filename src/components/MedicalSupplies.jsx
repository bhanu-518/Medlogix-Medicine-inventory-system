import React, { useState } from "react";

const initialSupplies = [
  { id: 1, item: "Sterile Gloves", category: "PPE", quantity: "500 boxes", availability: "IN STOCK" },
  { id: 2, item: "Syringes (10ml)", category: "Injection", quantity: "1000 units", availability: "LOW" },
  { id: 3, item: "Bandages", category: "Wound Care", quantity: "200 rolls", availability: "IN STOCK" },
  { id: 4, item: "Alcohol Swabs", category: "Antiseptic", quantity: "0", availability: "OUT OF STOCK" },
];

function getAvailabilityBadge(status) {
  if (status === "IN STOCK") return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">IN STOCK</span>;
  if (status === "LOW") return <span className="bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold">LOW</span>;
  if (status === "OUT OF STOCK") return <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">OUT OF STOCK</span>;
  return null;
}

function MedicalSupplies() {
  const [supplies, setSupplies] = useState(initialSupplies);
  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [newSupply, setNewSupply] = useState({ item: '', category: '', quantity: '', availability: 'IN STOCK' });

  const handleEdit = (supply) => {
    setEditId(supply.id);
    setEditRow(supply);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (id) => {
    setSupplies((prev) => prev.map(s => s.id === id ? { ...editRow, id } : s));
    setEditId(null);
    setEditRow({});
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditRow({});
  };

  const handleDelete = (id) => {
    setSupplies((prev) => prev.filter(s => s.id !== id));
  };

  const handleAddSupply = (e) => {
    e.preventDefault();
    if (!newSupply.item || !newSupply.category || !newSupply.quantity || !newSupply.availability) return;
    setSupplies(prev => [
      ...prev,
      { ...newSupply, id: Date.now() }
    ]);
    setNewSupply({ item: '', category: '', quantity: '', availability: 'IN STOCK' });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center w-full max-w-5xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Manage Medical Supplies
      </h1>
      {/* Add Supply Form */}
      <form
        className="flex flex-wrap gap-4 mb-8 w-full items-end"
        onSubmit={handleAddSupply}
      >
        <input
          type="text"
          placeholder="Item"
          className="border px-3 py-2 rounded w-40"
          value={newSupply?.item || ''}
          onChange={e => setNewSupply(s => ({ ...s, item: e.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="border px-3 py-2 rounded w-40"
          value={newSupply?.category || ''}
          onChange={e => setNewSupply(s => ({ ...s, category: e.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="Quantity"
          className="border px-3 py-2 rounded w-32"
          value={newSupply?.quantity || ''}
          onChange={e => setNewSupply(s => ({ ...s, quantity: e.target.value }))}
          required
        />
        <select
          className="border px-3 py-2 rounded w-40"
          value={newSupply?.availability || 'IN STOCK'}
          onChange={e => setNewSupply(s => ({ ...s, availability: e.target.value }))}
          required
        >
          <option value="IN STOCK">IN STOCK</option>
          <option value="LOW">LOW</option>
          <option value="OUT OF STOCK">OUT OF STOCK</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition-colors"
        >
          Add Supply
        </button>
      </form>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-left text-gray-700">
          <thead>
            <tr className="text-gray-400 uppercase text-sm">
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Availability</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((supply) => (
              <tr key={supply.id} className="border-b last:border-b-0">
                {editId === supply.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input name="item" value={editRow.item} onChange={handleEditChange} className="border px-2 py-1 rounded w-32" />
                    </td>
                    <td className="px-6 py-4">
                      <input name="category" value={editRow.category} onChange={handleEditChange} className="border px-2 py-1 rounded w-32" />
                    </td>
                    <td className="px-6 py-4">
                      <input name="quantity" value={editRow.quantity} onChange={handleEditChange} className="border px-2 py-1 rounded w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <select name="availability" value={editRow.availability} onChange={handleEditChange} className="border px-2 py-1 rounded">
                        <option value="IN STOCK">IN STOCK</option>
                        <option value="LOW">LOW</option>
                        <option value="OUT OF STOCK">OUT OF STOCK</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleEditSave(supply.id)} className="bg-green-600 text-white px-4 py-1 rounded font-semibold hover:bg-green-700 transition-colors">SAVE</button>
                      <button onClick={handleEditCancel} className="bg-gray-400 text-white px-4 py-1 rounded font-semibold hover:bg-gray-500 transition-colors">CANCEL</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{supply.item}</td>
                    <td className="px-6 py-4">{supply.category}</td>
                    <td className="px-6 py-4">{supply.quantity}</td>
                    <td className="px-6 py-4">{getAvailabilityBadge(supply.availability)}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleEdit(supply)} className="bg-blue-600 text-white px-4 py-1 rounded font-semibold hover:bg-blue-700 transition-colors">EDIT</button>
                      <button onClick={() => handleDelete(supply.id)} className="bg-red-600 text-white px-4 py-1 rounded font-semibold hover:bg-red-700 transition-colors">DELETE</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicalSupplies; 