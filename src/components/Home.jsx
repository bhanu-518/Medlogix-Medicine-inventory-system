import React, { useEffect, useState } from 'react';
import { FaPlusCircle, FaChartLine, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WelcomeSection = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  const allActivities = [
    { id: 1, message: 'Added new medication Paracetamol', details: 'Quantity: 100 tablets', timestamp: '2025-07-25 14:30', type: 'blue', icon: <FaPlusCircle /> },
    { id: 2, message: 'Updated stock for Bandages', details: 'Quantity decreased by 20', timestamp: '2025-07-24 10:15', type: 'orange', icon: <FaClipboardList /> },
    { id: 3, message: 'Deleted expired Gloves', details: 'Removed 30 units', timestamp: '2025-07-23 09:00', type: 'red', icon: <FaClipboardList /> },
    { id: 4, message: 'Generated inventory report', details: 'Report generated for July 2025', timestamp: '2025-07-22 16:45', type: 'green', icon: <FaClipboardList /> },
    { id: 5, message: 'Added new supplier', details: 'Supplier: MedSupply Inc.', timestamp: '2025-07-21 11:30', type: 'blue', icon: <FaPlusCircle /> },
    { id: 6, message: 'Received shipment of syringes', details: 'Quantity: 500 units', timestamp: '2025-07-20 14:20', type: 'green', icon: <FaClipboardList /> },
    { id: 7, message: 'Set reorder level for Bandages', details: 'Reorder quantity set to 50', timestamp: '2025-07-19 13:10', type: 'orange', icon: <FaClipboardList /> },
    { id: 8, message: 'Performed stock audit', details: 'All items verified', timestamp: '2025-07-18 09:50', type: 'green', icon: <FaClipboardList /> },
  ];

  const [showAllActivities, setShowAllActivities] = useState(false);

  // Fake fetch for metrics data
  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const fakeMetrics = [
        { id: 1, title: 'Total Medications', value: 120, change: '+5%', trend: 'up', bgColor: 'bg-blue-100', icon: <FaChartLine /> },
        { id: 2, title: 'Low Stock Items', value: 8, change: '-2%', trend: 'down', bgColor: 'bg-red-100', icon: <FaClipboardList /> },
        { id: 3, title: 'Expiring Soon', value: 4, change: '+1%', trend: 'up', bgColor: 'bg-yellow-100', icon: <FaChartLine /> },
      ];
      setMetrics(fakeMetrics);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const quickActions = [
    {
      id: 1,
      title: "Add Medication",
      icon: <FaPlusCircle className="text-blue-600 text-3xl" />, // Blue color
      onClick: () => alert('Navigate to Add Medication'),
    },
    {
      id: 2,
      title: "Generate Report",
      icon: <FaChartLine className="text-green-600 text-3xl" />, // Green color
      onClick: () => alert('Navigate to Generate Report'),
    },
    {
      id: 3,
      title: "Inventory Check",
      icon: <FaClipboardList className="text-orange-600 text-3xl" />, // Orange color
      onClick: () => alert('Navigate to Inventory Check'),
    }
  ];


  // Decide how many activities to show
  const activitiesToShow = showAllActivities ? allActivities : allActivities.slice(0, 3);

  return (
    <div className="welcome-section bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="welcome-title text-4xl md:text-4xl font-bold mb-3 text-left text-[#025E92]">
            MedLogix Inventory Dashboard
          </h1>

          <p className="welcome-subtitle text-lg text-gray-600 text-left text-[#025E92]">
            Manage your medication inventory efficiently
          </p>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="metric-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {metric.title}
                    </h3>
                    <p className="text-3xl font-bold mt-2">
                      {metric.value}
                    </p>
                    <p className={`mt-2 text-sm ${metric.trend === 'up' ? 'text-green-500' :
                      metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                      }`}>
                      {metric.change}
                    </p>
                  </div>
                  <div className={`${metric.bgColor} p-3 rounded-full`}>
                    {metric.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.onClick}
                className="quick-action-button bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center"
              >
                <div className="mb-3">
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {action.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <button
              className="text-primary hover:text-primary-dark text-sm font-medium"
              onClick={() => setShowAllActivities(!showAllActivities)}
            >
              {showAllActivities ? "Show Less" : "View All"}
            </button>
          </div>

          <div className="space-y-4">
            {activitiesToShow.map((activity) => (
              <div key={activity.id} className="activity-item flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className={`bg-${activity.type}-100 p-2 rounded-full mr-4`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{activity.message}</h4>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                </div>
                <div className="text-sm text-gray-400 ml-4">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
