import React, { useState } from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';
import './SectionStyles.css'; 

// Add expiry/type/status to your initial medical supplies
const supplies = [
  {
    id: 1,
    item: "Sterile Gloves",
    category: "PPE",
    quantity: "500 boxes",
    availability: "IN STOCK",
    expiry: "2024-08-30",
    type: "normal",
    status: "Normal"
  },
  {
    id: 2,
    item: "Syringes (10ml)",
    category: "Injection",
    quantity: "1000 units",
    availability: "LOW",
    expiry: "2024-06-10",
    type: "expiring",
    status: "Expiring Soon"
  },
  {
    id: 3,
    item: "Bandages",
    category: "Wound Care",
    quantity: "200 rolls",
    availability: "IN STOCK",
    expiry: "2024-12-15",
    type: "normal",
    status: "Normal"
  },
  {
    id: 4,
    item: "Alcohol Swabs",
    category: "Antiseptic",
    quantity: "0",
    availability: "OUT OF STOCK",
    expiry: "2024-05-15",
    type: "expired",
    status: "Expired"
  },
  {
    id: 5,
    item: "Damaged Syringes",
    category: "Injection",
    quantity: "N/A",
    availability: "OUT OF STOCK",
    expiry: "2024-12-15",
    type: "damaged",
    status: "Damaged"
  }
];

const TrackExpiryDamage = () => {
  const [filter, setFilter] = useState('all');

  const filteredItems = supplies.filter(item => {
    if (filter === 'expired') return item.type === 'expired';
    if (filter === 'expiring') return item.type === 'expiring';
    if (filter === 'damaged') return item.type === 'damaged';
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Expired': return <span className="badge danger">Expired</span>;
      case 'Expiring Soon': return <span className="badge warning">Expiring Soon</span>;
      case 'Damaged': return <span className="badge danger">Damaged</span>;
      default: return <span className="badge success">Normal</span>;
    }
  };

  return (
    <div className="section">
      <div className="section-header">
        <h1>Track Expiry & Damage</h1>
        <div className="filter-buttons">
          {['all', 'expired', 'expiring', 'damaged'].map(type => (
            <button
              key={type}
              className={`filter-button ${filter === type ? 'active' : ''}`}
              onClick={() => setFilter(type)}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id} className={item.type === 'expired' || item.type === 'damaged' ? 'critical-row' : item.type === 'expiring' ? 'low-row' : ''}>
                <td>{item.item}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td className="date-cell">
                  <Calendar size={16} className="mr-1" /> {item.expiry}
                </td>
                <td>{getStatusBadge(item.status)}</td>
                <td>
                  {(item.type === 'expired' || item.type === 'expiring' || item.type === 'damaged') && (
                    <AlertTriangle size={20} color="#e74c3c" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackExpiryDamage;




// ==== Frontend: TrackExpiry.jsx ====
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './TrackExpiry.css';

// const TrackExpiry = () => {
//   const [expiring, setExpiring] = useState([]);

//   useEffect(() => {
//     const nextMonth = new Date();
//     nextMonth.setMonth(nextMonth.getMonth() + 1);
//     axios.post('/api/medications/expiring', { date: nextMonth })
//       .then(res => setExpiring(res.data));
//   }, []);

//   return (
//     <div className="section">
//       <h1>Expiring Soon</h1>
//       <div className="expiry-grid">
//         {expiring.map(med => (
//           <div key={med._id} className="expiry-card">
//             <h3>{med.name}</h3>
//             <p>Expires: {new Date(med.expiryDate).toLocaleDateString()}</p>
//             <p>Qty: {med.quantity}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrackExpiry;


// // ==== Backend: routes/medications.js ====
// import express from 'express';
// import Medication from '../models/Medication.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const meds = await Medication.find().sort({ name: 1 });
//   res.json(meds);
// });

// router.post('/expiring', async (req, res) => {
//   const { date } = req.body;
//   const meds = await Medication.find({ expiryDate: { $lt: new Date(date) } });
//   res.json(meds);
// });

// export default router;


// // ==== Backend: models/Medication.js ====
// import mongoose from 'mongoose';

// const medicationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
//   manufactureDate: { type: Date, required: true },
//   expiryDate: { type: Date, required: true }
// });

// export default mongoose.model('Medication', medicationSchema);

