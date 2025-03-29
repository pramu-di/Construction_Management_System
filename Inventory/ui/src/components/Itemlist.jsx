import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import axios from 'axios';
import Itemstable from './Itemstable'; // Assuming you have an Itemstable component for listing items

const Itemlist = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/item");
                setItems(res.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:3000/api/item/${itemId}`);
            setItems(items.filter(item => item._id !== itemId));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    // Filter items based on the search query
    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <div style={headerContainerStyle}>
                <input
                    type="text"
                    placeholder="Search items"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={search ? { ...inputStyle, ...inputFocusStyle } : inputStyle} // Apply focus styles if there's text in the input
                />
                <button
                    style={addItemButtonStyle}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#e09b00'} // Hover color
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#007BFF'} // Reset to original color
                    onClick={() => navigate('/add-item')} // Navigate to add item page
                >
                    Add Item
                </button>
            </div>
            <Itemstable items={filteredItems} onDelete={handleDeleteItem} />
        </div>
    );
};

// Styles
const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
};

const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '200px',
    transition: 'border-color 0.3s, box-shadow 0.3s', // Add transition for box-shadow
    outline: 'none', // Remove outline on focus
};

const inputFocusStyle = {
    borderColor: '#007BFF', // Change border color on focus
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)', // Add box shadow on focus
};

const addItemButtonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007BFF', // New background color
    color: 'white', // Text color
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default Itemlist;
