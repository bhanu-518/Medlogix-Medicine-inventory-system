import React from 'react';
import { Download, BarChart, PieChart, TrendingUp } from 'lucide-react';
//import './GenerateReport.css';  // use your provided CSS saved here

const GenerateReport = () => {
  const reports = [
    { id: 1, title: 'Inventory Summary', description: 'Complete overview of all medications and supplies', icon: BarChart },
    { id: 2, title: 'Expiry Report', description: 'Items expiring in the next 30 days', icon: TrendingUp },
    { id: 3, title: 'Stock Analysis', description: 'Low stock and reorder recommendations', icon: PieChart },
    { id: 4, title: 'Usage Statistics', description: 'Monthly consumption patterns', icon: BarChart },
  ];

  return (
    <div className="section">
      <div className="section-header">
        <h1>Generate Reports</h1>
      </div>

      <div className="reports-grid">
        {reports.map(({ id, title, description, icon: Icon }) => (
          <div key={id} className="report-card">
            <div className="report-icon">
              <Icon size={32} />
            </div>
            <div className="report-content">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <div className="report-actions">
              <button className="export-button">
                <Download size={16} />
                Export PDF
              </button>
              
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default GenerateReport;





// // ==== Frontend: GenerateReport.jsx ====
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Download, BarChart, PieChart, TrendingUp } from 'lucide-react';
// import './GenerateReport.css';

// const GenerateReport = () => {
//   const [reportData, setReportData] = useState([]);

//   const reports = [
//     { id: 1, title: 'Inventory Summary', description: 'Overview of all medications', icon: BarChart },
//     { id: 2, title: 'Expiry Report', description: 'Items expiring soon', icon: TrendingUp },
//     { id: 3, title: 'Stock Analysis', description: 'Low stock & reorder', icon: PieChart },
//     { id: 4, title: 'Usage Stats', description: 'Consumption trends', icon: BarChart },
//   ];

//   useEffect(() => {
//     axios.get('/api/medications').then(res => setReportData(res.data));
//   }, []);

//   return (
//     <div className="section">
//       <h1>Generate Reports</h1>
//       <div className="reports-grid">
//         {reports.map(({ id, title, description, icon: Icon }) => (
//           <div key={id} className="report-card">
//             <div className="report-icon"><Icon size={32} /></div>
//             <div className="report-content">
//               <h3>{title}</h3>
//               <p>{description}</p>
//             </div>
//             <div className="report-actions">
//               <button className="export-button"><Download size={16} /> Export PDF</button>
//               <button className="export-button secondary"><Download size={16} /> Export Excel</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GenerateReport;


