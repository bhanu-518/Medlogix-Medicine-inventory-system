import React from 'react';
import { Download, BarChart, PieChart, TrendingUp } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable  from 'jspdf-autotable';
import './SectionStyles.css';

const GenerateReport = () => {
  const reports = [
    {
      id: 1,
      title: 'Inventory Summary',
      description: 'Complete overview of all medications and supplies',
      icon: BarChart,
      data: [
        ['Medicine Name', 'Category', 'Quantity', 'Status'],
        ['Paracetamol', 'Tablet', '150', 'In Stock'],
        ['Amoxicillin', 'Capsule', '0', 'Out of Stock'],
        ['Bandage', 'First Aid', '10', 'Low'],
      ],
    },
    {
      id: 2,
      title: 'Expiry Report',
      description: 'Items expiring in the next 30 days',
      icon: TrendingUp,
      data: [
        ['Medicine Name', 'Expiry Date', 'Status'],
        ['Ibuprofen', '2024-06-10', 'Expiring Soon'],
        ['Amoxicillin', '2024-05-15', 'Expiring Soon'],
        ['Bandage', '2024-12-15', 'In Stock'],
      ],
    },
    {
      id: 3,
      title: 'Stock Analysis',
      description: 'Low stock and reorder recommendations',
      icon: PieChart,
      data: [
        ['Item', 'Current Stock', 'Recommended Reorder'],
        ['Syringes', '50', '100'],
        ['Gloves', '200', '300'],
        ['Alcohol Swabs', '0', '200'],
      ],
    },
    {
      id: 4,
      title: 'Usage Statistics',
      description: 'Monthly consumption patterns',
      icon: BarChart,
      data: [
        ['Month', 'Medicine Name', 'Quantity Used'],
        ['January', 'Paracetamol', '30'],
        ['February', 'Ibuprofen', '20'],
        ['March', 'Amoxicillin', '15'],
      ],
    },
  ];

  const exportToPDF = (title, data) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 28);
    autoTable(doc, {
    startY: 35,
    head: [data[0]], // header row
    body: data.slice(1), // body rows
    theme: 'striped',
  });
    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="section">
      <div className="section-header">
        <h1>Generate Reports</h1>
      </div>

      <div className="reports-grid">
        {reports.map(({ id, title, description, icon: Icon, data }) => (
          <div key={id} className="report-card">
            <div className="report-icon">
              <Icon size={32} />
            </div>
            <div className="report-content">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <div className="report-actions">
              <button
                className="export-button flex items-center gap-2 text-white bg-[#025E92] px-3 py-2 rounded hover:bg-[#01446d] transition-colors"
                onClick={() => exportToPDF(title, data)}
              >
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


