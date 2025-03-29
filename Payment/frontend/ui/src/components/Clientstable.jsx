import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Clientstable = ({ clients, onDeleteClient }) => {
  const navigate = useNavigate(); // Initialize navigate
  const [hoveredButton, setHoveredButton] = useState(null); // State to track hovered button

  const handleDetailsClick = (clientId) => {
    navigate(`/clients/${clientId}`); // Navigate to the client details page with the client ID
  };

  return (
    <main style={{ padding: '20px', flex: 1 }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>All Clients</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr>
            <th style={headerStyle}>Payment ID</th>
            <th style={headerStyle}>Client Name</th>
            <th style={headerStyle}>Amount</th>
            <th style={headerStyle}>Status</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id} style={rowStyle}>
              <td style={cellStyle}>{client.payment_id}</td>
              <td style={cellStyle}>{client.client_name}</td>
              <td style={cellStyle}>{client.amount}</td>
              <td style={cellStyle}>{client.status}</td>
              <td style={cellStyle}>
                <button
                  style={buttonStyle('#FBC400', hoveredButton === `details-${client._id}`)}
                  onMouseEnter={() => setHoveredButton(`details-${client._id}`)} // Set hover state
                  onMouseLeave={() => setHoveredButton(null)} // Reset hover state
                  onClick={() => handleDetailsClick(client._id)}
                >
                  Details
                </button>
                <button
                  style={buttonStyle('#191a19', hoveredButton === `delete-${client._id}`)}
                  onMouseEnter={() => setHoveredButton(`delete-${client._id}`)} // Set hover state
                  onMouseLeave={() => setHoveredButton(null)} // Reset hover state
                  onClick={() => onDeleteClient(client._id)} // Use the delete handler from props
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

// Styling constants for better readability
const headerStyle = {
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
  padding: '12px',
  border: '1px solid #ddd',
  fontWeight: 'bold',
};

const rowStyle = {
  borderBottom: '1px solid #ddd',
  backgroundColor: '#fff',
  transition: 'background-color 0.3s',
};

const cellStyle = {
  padding: '12px',
  border: '1px solid #ddd',
};

// Updated buttonStyle function to include hover effects
const buttonStyle = (bgColor, isHovered) => ({
  padding: '8px 12px',
  backgroundColor: isHovered ? darkenColor(bgColor, 20) : bgColor, // Darken color on hover
  color: bgColor === '#191a19' ? 'white' : '#191A19',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '10px',
  transition: 'background-color 0.3s, transform 0.3s',
  transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Scale on hover
});

// Function to darken a color by a percentage
const darkenColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
};

export default Clientstable;  
