// src/components/Navbar.jsx
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const activeItemStyle = {
    backgroundColor: '#FBC400',
    color: '#000',
    fontWeight: 'bold',
  };

  const inactiveItemStyle = {
    backgroundColor: '#191a19',
    color: '#fff',
    fontWeight: 'normal',
  };

  return (
    <div style={{ width: '250px', backgroundColor: '#1a1a1a', height: '200vh', padding: '20px' }}>
      <div style={{ backgroundColor: '#333', color: '#fff', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Pramudi Lakshika</div>
        <div style={{ fontSize: '14px', color: '#ccc' }}>Inventory Manager</div>
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ ...location.pathname === "/" ? activeItemStyle : inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <i className="fas fa-chart-bar" style={{ marginRight: '10px' }}></i> 
          <span style={{ fontWeight: location.pathname === "/" ? 'bold' : 'normal' }}>Dashboard</span>
        </div>
      </Link>

      <Link to="/inventory" style={{ textDecoration: 'none' }}>
        <div style={{ ...location.pathname === "/inventory" ? activeItemStyle : inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <i className="fas fa-box" style={{ marginRight: '10px' }}></i> 
          <span style={{ fontWeight: location.pathname === "/inventory" ? 'bold' : 'normal' }}>Inventory</span>
        </div>
      </Link>

      <Link to="/reports" style={{ textDecoration: 'none' }}>
        <div style={{ ...location.pathname === "/reports" ? activeItemStyle : inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <i className="fas fa-book" style={{ marginRight: '10px' }}></i> 
          <span style={{ fontWeight: location.pathname === "/reports" ? 'bold' : 'normal' }}>Reports</span>
        </div>
      </Link>

      <Link to="/login" style={{ textDecoration: 'none' }}>
        <div style={{ ...location.pathname === "/login" ? activeItemStyle : inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <i className="fas fa-lock" style={{ marginRight: '10px' }}></i> 
          <span style={{ fontWeight: location.pathname === "/login" ? 'bold' : 'normal' }}>Login</span>
        </div>
      </Link>

      <Link to="/orders" style={{ textDecoration: 'none' }}>
        <div style={{ ...location.pathname === "/orders" ? activeItemStyle : inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <i className="fas fa-shopping-cart" style={{ marginRight: '10px' }}></i> 
          <span style={{ fontWeight: location.pathname === "/orders" ? 'bold' : 'normal' }}>Orders</span>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
