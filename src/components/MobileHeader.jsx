import React from 'react';
import { Menu, User } from 'lucide-react';
import './MobileHeader.css'

const MobileHeader = ({ toggleSidebar }) => {
  return (
    <header className="mobile-header">
      <button className="hamburger-button" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      <h1 className="mobile-title">MedLogix</h1>
      <button className="profile-button">
        <User size={24} />
      </button>
    </header>
  );
};

export default MobileHeader;
