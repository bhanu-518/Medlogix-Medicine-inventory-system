import React, { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import './SectionStyles.css';

const TrackExpiryDamage = () => {
  const [filter, setFilter] = useState('all');

  const supplies = [
    {
      id: 1,
      name: "Sterile Gloves",
      expiry: "2024-08-30",
      daysLeft: 115,
      type: "normal",
      status: "Normal"
    },
    {
      id: 2,
      name: "Syringes (10ml)",
      expiry: "2024-06-10",
      daysLeft: 30,
      type: "expiring",
      status: "Expiring Soon"
    },
    {
      id: 3,
      name: "Bandages",
      expiry: "2024-12-15",
      daysLeft: 222,
      type: "normal",
      status: "Normal"
    },
    {
      id: 4,
      name: "Alcohol Swabs",
      expiry: "2024-05-15",
      daysLeft: 0,
      type: "expired",
      status: "Expired"
    },
    {
      id: 5,
      name: "Damaged Syringes",
      expiry: "2024-12-15",
      daysLeft: 0,
      type: "damaged",
      status: "Damaged"
    }
  ];

  const filteredItems = supplies.filter(item => {
    if (filter === 'expired') return item.type === 'expired';
    if (filter === 'expiring') return item.type === 'expiring';
    if (filter === 'damaged') return item.type === 'damaged';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Expired': return 'danger';
      case 'Expiring Soon': return 'warning';
      case 'Damaged': return 'danger';
      default: return 'success';
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
              {type === 'all' ? 'All Items' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Expiry Date</th>
              <th>Days Left</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr
                key={item.id}
                className={
                  item.type === 'expired' || item.type === 'damaged'
                    ? 'critical-row'
                    : item.type === 'expiring'
                    ? 'low-row'
                    : ''
                }
              >
                <td className="font-medium">{item.name}</td>
                <td>
                  <div className="date-cell">
                    <Calendar size={16} /> {item.expiry}
                  </div>
                </td>
                <td>{item.type === 'damaged' ? 'N/A' : item.daysLeft}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  {(item.type === 'expired' || item.type === 'expiring' || item.type === 'damaged') && (
                    <AlertCircle size={20} className="alert-icon" />
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

