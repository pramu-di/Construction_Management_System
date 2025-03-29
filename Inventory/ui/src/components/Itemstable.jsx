import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Itemstable component
const Itemstable = ({ items }) => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null); // State for tracking hovered row

    const handleDetailsClick = (itemId) => {
        navigate(`/items/${itemId}`);
    };

    return (
        <main style={{ padding: '20px', flex: 1 }}>
            <h1 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>All Items</h1>
            <table style={{
                width: '100%',
                marginLeft: '0%',
                borderCollapse: 'collapse',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Item ID</th>
                        <th style={tableHeaderStyle}>Item Name</th>
                        <th style={tableHeaderStyle}>Description</th>
                        <th style={tableHeaderStyle}>Quantity</th>
                        <th style={tableHeaderStyle}>Unit Price</th>
                        <th style={{ ...tableHeaderStyle, width: '230px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '12px', fontStyle: 'italic', color: '#777' }}>
                                No items found
                            </td>
                        </tr>
                    ) : (
                        items.map((item) => (
                            <tr
                                key={item._id}
                                style={{
                                    ...tableRowStyle,
                                    backgroundColor: hoveredRow === item._id ? '#f9f9f9' : '#fff', // Change background on hover
                                }}
                                onMouseEnter={() => setHoveredRow(item._id)} // Set hovered row
                                onMouseLeave={() => setHoveredRow(null)} // Reset hovered row
                            >
                                <td style={tableCellStyle}>{item.item_id}</td>
                                <td style={tableCellStyle}>{item.item_name}</td>
                                <td style={tableCellStyle}>{item.description}</td>
                                <td style={tableCellStyle}>{item.quantity}</td>
                                <td style={tableCellStyle}>{item.unit_price}</td>
                                <td style={{ ...tableCellStyle, width: '250px', textAlign: 'center' }}>
                                    <button
                                        style={buttonStyle('#FBC400', hoveredButton === `details-${item._id}`)}
                                        onMouseEnter={() => setHoveredButton(`details-${item._id}`)}
                                        onMouseLeave={() => setHoveredButton(null)}
                                        onClick={() => handleDetailsClick(item._id)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </main>
    );
};

// Styles for the table
const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
    padding: '12px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
    color: '#555', // Header text color
};

const tableCellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    color: '#333', // Cell text color
};

const tableRowStyle = {
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.3s', // Smooth transition for background color
};

// Button styles remain unchanged
const buttonStyle = (bgColor, isHovered) => ({
    padding: '8px 12px',
    backgroundColor: isHovered ? darkenColor(bgColor, 20) : bgColor,
    color: bgColor === '#191a19' ? 'white' : '#191A19',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered ? '0 4px 6px rgba(0, 0, 0, 0.2)' : 'none',
});

// Function to darken color
const darkenColor = (color, amount) => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export default Itemstable; 
