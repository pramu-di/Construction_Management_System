import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditItem = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState({
        item_name: '',
        description: '',
        quantity: '',
        unit_price: '',
        supplier_name: '',
        supplier_email: '',
        supplier_phone: '',
        min_level: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchItem = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/item/${itemId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setItem(data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchItem();
    }, [itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/item/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                throw new Error(`Error updating item: ${response.status}`);
            }
            navigate(`/items/${itemId}`); // Navigate back to item details after successful edit
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;
    }

    return (
        <div style={outerContainerStyle}>
            <main style={mainStyle}>
                <h1 style={headingStyle}>Edit Item</h1>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>Item Name:</label>
                        <input
                            type="text"
                            name="item_name"
                            value={item.item_name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>Description:</label>
                        <textarea
                            name="description"
                            value={item.description}
                            onChange={handleChange}
                            required
                            style={textareaStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>Unit Price:</label>
                        <input
                            type="number"
                            name="unit_price"
                            value={item.unit_price}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>Supplier Name:</label>
                        <input
                            type="text"
                            name="supplier_name"
                            value={item.supplier_name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>Supplier Email:</label>
                        <input
                            type="email"
                            name="supplier_email"
                            value={item.supplier_email}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>Supplier Phone:</label>
                        <input
                            type="text"
                            name="supplier_phone"
                            value={item.supplier_phone}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>Minimum Level:</label>
                        <input
                            type="number"
                            name="min_level"
                            value={item.min_level}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <button type="submit" style={buttonStyle}>Update Item</button>
                </form>
            </main>
        </div>
    );
};

// Styles
const outerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#eaeaea',
};

const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60vw',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ccc', // Border for the form
};

const formStyle = {
    width: '100%', // Full width for the form
};

const inputContainerStyle = {
    marginBottom: '15px',
    width: '100%', // Full width for inputs
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '16px',
    color: '#333',
};

const inputStyle = {
    width: '100%', // Full width for input fields
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    transition: 'border-color 0.3s',
};

const textareaStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    transition: 'border-color 0.3s',
    minHeight: '100px', // Minimum height for textarea
};

const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#28a745', // Updated color for the button
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, transform 0.3s',
};

const headingStyle = {
    marginBottom: '20px',
    fontSize: '30px', // Increased font size for the heading
    color: '#333',
};

// Adding hover effect for the button
const buttonHoverStyle = {
    backgroundColor: '#218838', // Darker shade for hover effect
};

// Event handler for button hover
const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
};

const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = buttonStyle.backgroundColor;
};

export default EditItem;  
