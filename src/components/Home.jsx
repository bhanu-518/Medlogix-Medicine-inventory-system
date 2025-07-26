import React, { useEffect, useState } from 'react';
import { FaPlusCircle, FaChartLine, FaClipboardList } from 'react-icons/fa';
import './Home.css';

const WelcomeSection = () => {
  const [metrics, setMetrics] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch metrics and activities from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoints
      const metricsResponse = await fetch('/api/metrics');
      const activitiesResponse = await fetch('/api/activities');

      const metricsData = await metricsResponse.json();
      const activitiesData = await activitiesResponse.json();

      setMetrics(metricsData);
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and set interval for real-time updates
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const quickActions = [
    {
      id: 1,
      title: "Add Medication",
      icon: <FaPlusCircle className="text-blue-600 text-3xl" />
    },
    {
      id: 2,
      title: "Generate Report",
      icon: <FaChartLine className="text-green-600 text-3xl" />
    },
    {
      id: 3,
      title: "Inventory Check",
      icon: <FaClipboardList className="text-orange-600 text-3xl" />
    }
  ];

  return (
    <div className="welcome-section bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="welcome-title text-4xl md:text-4xl font-bold text-blue-800 mb-3 text-left">
            MedLogix Inventory Dashboard
          </h1>

          <p className="welcome-subtitle text-lg text-gray-600 text-left">
            Manage your medication inventory efficiently
          </p>
        </div>

        {/* Metrics Cards */}
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

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
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

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {activities.map((activity) => (
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
