import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Edit, Trash2, Shield, User } from 'lucide-react';
import './SectionStyles.css';

const UsersSection = () => {
    const initialUsers = [
        { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@medlogix.com', role: 'Administrator', status: 'Active', lastLogin: '2024-03-15' },
        { id: 2, name: 'Mike Chen', email: 'mike.chen@medlogix.com', role: 'Pharmacist', status: 'Active', lastLogin: '2024-03-14' },
        { id: 3, name: 'Lisa Rodriguez', email: 'lisa.rodriguez@medlogix.com', role: 'Inventory Manager', status: 'Active', lastLogin: '2024-03-13' },
        { id: 4, name: 'John Smith', email: 'john.smith@medlogix.com', role: 'Staff', status: 'Inactive', lastLogin: '2024-02-28' },
        { id: 5, name: 'Emma Wilson', email: 'emma.wilson@medlogix.com', role: 'Pharmacist', status: 'Active', lastLogin: '2024-03-15' },
    ];

    const [users, setUsers] = useState(initialUsers);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const location = useLocation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Staff',
        status: 'Active',
        lastLogin: '', // optional, can set default or skip in form
    });

    // Show form if '?add=true' in URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('add') === 'true') {
            setShowForm(true);
        }
    }, [location]);

    const getRoleIcon = (role) => (role === 'Administrator' ? Shield : User);

    const getRoleColor = (role) => {
        switch (role) {
            case 'Administrator':
                return 'admin';
            case 'Pharmacist':
                return 'pharmacist';
            case 'Inventory Manager':
                return 'manager';
            default:
                return 'staff';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit form handler for add and edit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            // Update user
            setUsers((prev) =>
                prev.map((user) => (user.id === editId ? { id: editId, ...formData } : user))
            );
        } else {
            // Add new user
            const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
            setUsers([...users, { id, ...formData, lastLogin: formData.lastLogin || new Date().toISOString().slice(0, 10) }]);
        }

        setShowForm(false);
        setIsEditing(false);
        setEditId(null);
        setFormData({ name: '', email: '', role: 'Staff', status: 'Active', lastLogin: '' });
    };

    // Edit button handler
    const handleEdit = (user) => {
        setShowForm(true);
        setIsEditing(true);
        setEditId(user.id);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            lastLogin: user.lastLogin,
        });
    };

    // Delete user handler
    const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <div className="section">
            {/* Header */}
            <div className="section-header flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <h1 className="text-xl md:text-2xl font-bold">Manage Users</h1>
                <button
                    type="button"
                    className="bg-[#025E92] text-white px-6 py-2 rounded font-semibold hover:bg-[#01466E] transition-colors"
                    onClick={() => {
                        setShowForm(!showForm);
                        setIsEditing(false);
                        setEditId(null);
                        setFormData({ name: '', email: '', role: 'Staff', status: 'Active', lastLogin: '' });
                    }}
                >
                    {showForm ? 'Cancel' : 'Add User'}
                </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <form className="flex flex-wrap gap-4 mb-6" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="border px-3 py-2 rounded w-40"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border px-3 py-2 rounded w-56"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <select
                        name="role"
                        className="border px-3 py-2 rounded w-48 text-[#025E92] border-[#025E92] font-semibold"
                        value={formData.role}
                        onChange={handleInputChange}
                    >
                        <option value="Administrator">Administrator</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Inventory Manager">Inventory Manager</option>
                        <option value="Staff">Staff</option>
                    </select>
                    <select
                        name="status"
                        className="border px-3 py-2 rounded w-32 text-[#025E92] border-[#025E92] font-semibold"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-[#025E92] text-white px-6 py-2 rounded font-semibold hover:bg-[#01466E] transition-colors"
                    >
                        {isEditing ? 'Update' : 'Submit'}
                    </button>
                </form>
            )}

            {/* Users Table */}
            <div className="table-container overflow-x-auto">
                <table className="data-table w-full text-sm md:text-base">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const RoleIcon = getRoleIcon(user.role);
                            return (
                                <tr key={user.id}>
                                    <td className="user-cell font-medium">
                                        <div className="user-avatar mr-2">
                                            {user.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </div>
                                        {user.name}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className="role-cell flex items-center gap-1">
                                            <RoleIcon size={16} />
                                            <span className={`role-badge ${getRoleColor(user.role)}`}>{user.role}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.status === 'Active' ? 'success' : 'danger'}`}>
                                            {user.status}
                                        </span>
                                    </td>

                                    <td>{user.lastLogin}</td>
                                    <td>
                                        <div className="action-buttons flex gap-3">
                                            <button
                                                className="action-button edit"
                                                title="Edit"
                                                onClick={() => handleEdit(user)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="action-button delete"
                                                title="Delete"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersSection;
