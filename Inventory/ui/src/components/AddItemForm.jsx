import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItemForm = () => {
    const [formData, setFormData] = useState({
        item_id: '',
        item_name: '',
        description: '',
        quantity: '',
        unit_price: '',
        supplier_name: '',
        supplier_email: '',
        supplier_phone: '',
        min_level: ''
    });

    const [errors, setErrors] = useState({
        supplier_email: '',
        supplier_phone: '',
    });

    // Function to generate item ID
    const generateItemId = () => {
        const now = new Date();
        const datePart = now.toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD
        const timePart = now.toISOString().slice(11, 19).replace(/:/g, ''); // HHMMSS
        return `I${datePart}${timePart}`;
    };

    useEffect(() => {
        // Set initial item_id
        setFormData(prevData => ({ ...prevData, item_id: generateItemId() }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate inputs on change
        if (name === 'supplier_phone') {
            if (!validatePhoneNumber(value)) {
                setErrors(prev => ({ ...prev, supplier_phone: 'Phone number must be 10 digits and start with 07.' }));
            } else {
                setErrors(prev => ({ ...prev, supplier_phone: '' }));
            }
        }

        if (name === 'supplier_email') {
            if (!validateEmail(value)) {
                setErrors(prev => ({ ...prev, supplier_email: 'Email must be in the format: example@gmail.com' }));
            } else {
                setErrors(prev => ({ ...prev, supplier_email: '' }));
            }
        }
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^07\d{8}$/; // Matches a 10-digit phone number starting with 07
        return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Matches specific email format
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate phone number and email before submitting
        if (!validatePhoneNumber(formData.supplier_phone)) {
            alert('Phone number must be 10 digits and start with 07.');
            return;
        }
        
        if (!validateEmail(formData.supplier_email)) {
            alert('Email must be in the format: example@gmail.com');
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/item', formData);
            alert('Item added successfully');
            // Reset form data
            setFormData({
                item_id: generateItemId(), // Generate a new ID for the next item
                item_name: '',
                description: '',
                quantity: '',
                unit_price: '',
                supplier_name: '',
                supplier_email: '',
                supplier_phone: '',
                min_level: ''
            });
            // Clear error messages
            setErrors({
                supplier_email: '',
                supplier_phone: '',
            });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div style={formContainerStyle}>
            <h2 style={headingStyle}>Add New Item</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input 
                    type="text" 
                    name="item_id" 
                    placeholder="Item ID" 
                    value={formData.item_id} 
                    readOnly 
                    style={inputStyle} 
                />
                <input 
                    type="text" 
                    name="item_name" 
                    placeholder="Item Name" 
                    value={formData.item_name} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle} 
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                    style={textareaStyle} 
                />
                <input 
                    type="number" 
                    name="quantity" 
                    placeholder="Quantity" 
                    value={formData.quantity} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle} 
                />
                <input 
                    type="number" 
                    name="unit_price" 
                    placeholder="Unit Price" 
                    value={formData.unit_price} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle} 
                />
                <input 
                    type="text" 
                    name="supplier_name" 
                    placeholder="Supplier Name" 
                    value={formData.supplier_name} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle} 
                />
                <input 
                    type="email" 
                    name="supplier_email" 
                    placeholder="Supplier Email" 
                    value={formData.supplier_email} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle} 
                />
                {errors.supplier_email && <span style={{ color: 'red' }}>{errors.supplier_email}</span>}
                <input 
                    type="text" 
                    name="supplier_phone" 
                    placeholder="Supplier Phone" 
                    value={formData.supplier_phone} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle} 
                />
                {errors.supplier_phone && <span style={{ color: 'red' }}>{errors.supplier_phone}</span>}
                <input 
                    type="number" 
                    name="min_level" 
                    placeholder="Minimum Level" 
                    value={formData.min_level} 
                    onChange={handleChange} 
                    required 
                    style={inputStyle} 
                />
                <button type="submit" style={buttonStyle}>Add Item</button>
            </form>
        </div>
    );
};

// Styles for the form
const formContainerStyle = {
    maxWidth: '600px',
    margin: '10px 300px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
};

const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const formStyle = {
    display: 'flex',
    width: '500px',
    flexDirection: 'column',
};

const inputStyle = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const textareaStyle = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '100px', // Minimum height for the text area
};

const buttonStyle = {
    padding: '12px',
    backgroundColor: '#FCB400',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
};

export default AddItemForm;
