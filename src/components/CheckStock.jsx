import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import './SectionStyles.css';

const StockSection = () => {
    const [filter, setFilter] = useState('all');

    const stockItems = [
        { id: 1, name: "Aspirin", quantity: 500, threshold: 100, status: "Normal" },
        { id: 2, name: "Amoxicillin", quantity: 250, threshold: 200, status: "Normal" },
        { id: 3, name: "Ibuprofen", quantity: 50, threshold: 100, status: "Low" },
        { id: 4, name: "Face Masks", quantity: 25, threshold: 50, status: "Critical" },
        { id: 5, name: "Insulin", quantity: 15, threshold: 30, status: "Low" },
        { id: 6, name: "Bandages", quantity: 0, threshold: 20, status: "Out" },
    ];

    const filteredItems = stockItems.filter(item => {
        if (filter === 'low') return item.status === 'Low';
        if (filter === 'critical') return item.status === 'Critical';
        if (filter === 'out') return item.status === 'Out';
        return true;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Low':
                return 'warning';    // e.g., orange/yellow
            case 'Critical':
                return 'critical';   // new distinct color
            case 'Out':
                return 'danger';     // red
            default:
                return 'success';    // green
        }
    };


    return (
        <div className="section">
            <div className="section-header">
                <h1>Check Stock Levels</h1>
                <div className="filter-buttons">
                    {['all', 'low', 'critical', 'out'].map(type => (
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
                            <th>Current Stock</th>
                            <th>Threshold</th>
                            <th>Status</th>
                            <th>Alert</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(item => (
                            <tr
                                key={item.id}
                                className={
                                    item.status === 'Out'
                                        ? 'out-row'
                                        : item.status === 'Critical'
                                            ? 'critical-row'
                                            : item.status === 'Low'
                                                ? 'low-row'
                                                : ''
                                }
                            >


                                <td className="font-medium">{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.threshold}</td>
                                <td>
                                    <span className={`status-badge ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    {item.status !== 'Normal' ? (
                                        <AlertTriangle size={20} className="alert-icon" />
                                    ) : (
                                        <span className="text-green-500 text-xs">✓</span>
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

export default StockSection;
