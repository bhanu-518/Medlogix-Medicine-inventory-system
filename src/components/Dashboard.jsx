import React, { useState } from "react";
import {
  MdMedicalServices,
  MdEvent,
  MdGroup,
  MdLogout,
  MdHome,
  MdFileOpen,
  MdBarChart,
  MdMedication
} from "react-icons/md";
import MedicalSupplies from "./MedicalSupplies";
import Home from "./Home";
import TrackExpiryDamage from "./TrackExpiryDamage";
import CheckStock from "./CheckStock";
import ManageUser from "./ManageUser";
import GenerateReport from "./GenerateReport";
import { Pill } from "lucide-react";
import Medications from "./Medications";
import MobileHeader from "./MobileHeader";

const SIDEBAR_VIEWS = [
  { key: 'home', label: 'Home', icon: MdHome },
  { key: 'medications', label: 'Manage Medications', icon: MdMedication },
  { key: 'supplies', label: 'Manage Medical Supplies', icon: MdMedicalServices },
  { key: 'stock', label: 'Check Stock Levels', icon: MdBarChart },
  { key: 'expiry', label: 'Track Expiry/Damage', icon: MdEvent },
  { key: 'reports', label: 'Generate Reports', icon: MdFileOpen },
  { key: 'users', label: 'Manage Users', icon: MdGroup },
];

function Dashboard({ onLogout }) {
  const [activeView, setActiveView] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  function renderMainContent() {
    switch (activeView) {
      case "home":
        return <Home />;
      case "medications":
        return <Medications />;
      case "supplies":
        return <MedicalSupplies />;
      case "stock":
        return <CheckStock />;
      case "expiry":
        return <TrackExpiryDamage />;
      case "reports":
        return <GenerateReport />;
      case "users":
        return <ManageUser />;
      default: return null;
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-[#025E92] text-white flex flex-col justify-between py-6 px-4 fixed lg:static top-0 left-0 h-full z-50 w-64 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-white text-[#025E92] p-4 rounded-full shadow">
              <Pill size={32} />
            </div>
            <h1 className="mt-2 text-2xl font-bold">MedLogix</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {SIDEBAR_VIEWS.map(({ key, label, icon: Icon }) => {
              const isActive = activeView === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveView(key);
                    setIsSidebarOpen(false);
                  }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200
                    ${isActive
                      ? "bg-[#035785] text-white before:content-[''] before:absolute before:left-0 before:h-6 before:w-1 before:bg-white before:rounded-r-lg"
                      : "bg-white text-[#025E92] hover:bg-gray-200"
                    }`}
                >
                  <Icon size={20} className={isActive ? "text-white" : "text-[#025E92]"} />
                  <span className="text-sm">{label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 border border-red-400 text-red-400 py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          <MdLogout size={20} />
          Logout
        </button>
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
