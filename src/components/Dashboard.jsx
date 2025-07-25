import React, { useState } from "react";
import {
  MdMedication,
  MdMedicalServices,
  MdEvent,
  MdGroup,
  MdLogout,
  MdHome,
  MdFileOpen,
  MdBarChart
} from "react-icons/md";
import MedicalSupplies from "./MedicalSupplies";
import Home from "./Home";
import TrackExpiryDamage from "./TrackExpiryDamage";
import GenerateReport from "./GenerateReport";


const SIDEBAR_VIEWS = [
  { key: 'home', label: 'Home', icon: MdHome },
  { key: 'medications', label: 'Manage Medications', icon: MdMedication },
  { key: 'supplies', label: 'Manage Medical Supplies', icon: MdMedicalServices },
  { key: 'stock', label: 'Check Stock Levels', icon: MdBarChart },
  { key: 'expiry', label: 'Track Expiry/Damage', icon: MdEvent },
  { key: 'reports', label: 'Generate Reports', icon: MdFileOpen  },
  { key: 'users', label: 'Manage Users', icon: MdGroup },
];

function Dashboard({ onLogout }) {
  const [activeView, setActiveView] = useState('medications');

  function renderMainContent() {
    if (activeView === 'home') {
      return <Home />
    }
    if (activeView === 'medications') {
      return (
        <div className="bg-gray-50 rounded-2xl shadow p-10 flex flex-col items-center w-full max-w-4xl mt-10">
          <h1 className="text-2xl font-bold mb-2 text-center">Manage Medications</h1>
          <p className="text-gray-500 text-center">Medication management coming soon.</p>
        </div>
      );
    }
    if (activeView === 'supplies') {
      return <MedicalSupplies />;
    }
    if (activeView === 'stock') {
      return (
        <div className="bg-gray-50 rounded-2xl shadow p-10 flex flex-col items-center w-full max-w-4xl mt-10">
          <h1 className="text-2xl font-bold mb-2 text-center">Check Stock Levels</h1>
          <p className="text-gray-500 text-center">Stock level checking coming soon.</p>
        </div>
      );
    }
    if (activeView === 'expiry') {
      return <TrackExpiryDamage />;
      
    }
    if (activeView === 'reports') {
      return <GenerateReport />
    }
    if (activeView === 'users') {
      return (
        <div className="bg-gray-50 rounded-2xl shadow p-10 flex flex-col items-center w-full max-w-4xl mt-10">
          <h1 className="text-2xl font-bold mb-2 text-center">Manage Users</h1>
          <p className="text-gray-500 text-center">User management coming soon.</p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col justify-between py-6 px-4 border-r">
        <div>
          <div className="flex items-center mb-10">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
            <span className="font-bold text-lg text-gray-700">MedLogix</span>
          </div>
          <nav className="flex flex-col gap-2">
            {SIDEBAR_VIEWS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`group flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200 border ${activeView === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-900 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                onClick={() => setActiveView(key)}
              >
                <Icon size={24} className={`transition-colors duration-200 group-hover:text-blue-600 ${activeView === key ? 'text-yellow-300' : ''}`} />
                {label}
              </button>
            ))}
          </nav>
        </div>
        <button
          className="group flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-red-700 hover:text-yellow-300"
          onClick={() => { console.log('Logout clicked'); onLogout(); }}
        >
          <MdLogout size={24} className="transition-colors duration-200 group-hover:text-yellow-300" />
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {renderMainContent()}
      </main>
    </div>
  );
}

export default Dashboard;
