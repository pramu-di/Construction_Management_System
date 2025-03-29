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
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Shanuka Induran</div>
        <div style={{ fontSize: '14px', color: '#ccc' }}>Payment Manager</div>
      </div>

      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <div style={{ ...location.pathname === "/dashboard" ? activeItemStyle : inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <i className="fas fa-chart-bar" style={{ marginRight: '10px' }}></i> 
          <span style={{ fontWeight: location.pathname === "/dashboard" ? 'bold' : 'normal' }}>Dashboard</span>
        </div>
      </Link>

      <Link to="/clients" style={{ textDecoration: 'none' }}>
        <div style={{ ...location.pathname === "/clients" ? activeItemStyle : inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <i className="fas fa-users" style={{ marginRight: '10px' }}></i> 
          <span style={{ fontWeight: location.pathname === "/clients" ? 'bold' : 'normal' }}>Clients</span>
        </div>
      </Link>

      <Link to="/suppliers" style={{ textDecoration: 'none' }}>
        <div style={{ ...location.pathname === "/suppliers" ? activeItemStyle : inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <i className="fas fa-truck" style={{ marginRight: '10px' }}></i> 
          <span style={{ fontWeight: location.pathname === "/suppliers" ? 'bold' : 'normal' }}>Suppliers</span>
        </div>
      </Link>

      {/* Add Link for Employees */}
      <Link to="/employees" style={{ textDecoration: 'none' }}>
        <div style={{ ...location.pathname === "/employees" ? activeItemStyle : inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <i className="fas fa-user-friends" style={{ marginRight: '10px' }}></i> 
          <span style={{ fontWeight: location.pathname === "/employees" ? 'bold' : 'normal' }}>Employees</span>
        </div>
      </Link>

      <div style={{ ...inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <i className="fas fa-book" style={{ marginRight: '10px' }}></i> 
        <span>Reports</span>
      </div>

      <div style={{ ...inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <i className="fas fa-user-circle" style={{ marginRight: '10px' }}></i> 
        <span>Account</span>
      </div>

      <div style={{ ...inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <i className="fas fa-history" style={{ marginRight: '10px' }}></i> 
        <span>Payment History</span>
      </div>

      <div style={{ ...inactiveItemStyle, padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <i className="fas fa-lock" style={{ marginRight: '10px' }}></i> 
        <span>Login</span>
      </div>
    </div>
  );
};

export default Navbar;  
