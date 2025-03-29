import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPaymentForm = () => {
    const [formData, setFormData] = useState({
        payment_id: '',
        client_name: '',
        email: '',
        client_phone: '',
        amount: '',
        payment_method: 'cash',
        payment_type: 'monthly',
        transaction_date: '',
        status: 'Pending' // Default value for status
    });

    const [isHovered, setIsHovered] = useState(false);
    const [status, setStatus] = useState(''); // Status message state
    const navigate = useNavigate();

    // Function to generate payment ID
    const generatePaymentId = () => {
        const now = new Date();
        const datePart = `P${now.getFullYear().toString().slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const timePart = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
        return datePart + timePart;
    };

    // Set the payment ID when the component mounts
    useEffect(() => {
        const paymentId = generatePaymentId();
        setFormData(prevData => ({ ...prevData, payment_id: paymentId }));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));

        // Validate on change
        if (name === 'client_phone') {
            validatePhone(value);
        } else if (name === 'amount') {
            validateAmount(value);
        } else if (name === 'transaction_date') {
            validateTransactionDate(value);
        } else if (name === 'email') {
            validateEmail(value);
        }
    };

    // Phone number validation
    const validatePhone = (phone) => {
        const phoneRegex = /^07\d{8}$/;
        if (!phoneRegex.test(phone)) {
            setStatus('Phone number must be 10 digits and start with "07".');
        } else {
            setStatus(''); // Clear status if valid
        }
    };

    // Amount validation
    const validateAmount = (amount) => {
        const amountRegex = /^\d+(\.\d{1,2})?$/;
        if (!amountRegex.test(amount)) {
            setStatus('Amount must be a decimal (e.g., 123.00).');
        } else {
            setStatus(''); // Clear status if valid
        }
    };

    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('Please enter a valid email address (e.g., example@gmail.com).');
        } else {
            setStatus(''); // Clear status if valid
        }
    };

    // Transaction date validation
    const validateTransactionDate = (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours to 0 for accurate comparison
        if (selectedDate < today) {
            setStatus('Transaction date cannot be in the past.');
        } else {
            setStatus(''); // Clear status if valid
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.client_name || !formData.email || !formData.amount || !formData.transaction_date) {
            setStatus('Please fill all the required fields');
            return;
        }

        // Convert amount to a number (with 2 decimal points)
        const payload = {
            ...formData,
            amount: parseFloat(formData.amount).toFixed(2) // Ensure amount is a decimal with 2 points
        };

        try {
            // Post data to the backend
            const response = await axios.post('http://localhost:3000/api/client', payload);
            console.log('Payment created successfully:', response.data);
            setStatus('Payment created successfully!'); // Set success status
            navigate('/clients'); // Navigate to clients page after success
        } catch (error) {
            console.error('Error creating payment:', error);
            setStatus('Error creating payment: ' + (error.response?.data?.msg || error.message)); // Set error status
        }
    };

    // Button hover styles using state
    const buttonStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        backgroundColor: isHovered ? '#FFB700' : '#FCB400',
        border: 'none',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        outline: 'none'
    };

    return (
        <div style={formContainerStyle}>
            <h2 style={headingStyle}>Create New Payment</h2>
            {status && <div style={statusStyle}>{status}</div>} {/* Display status message */}
            <form onSubmit={handleSubmit}>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Payment ID</label>
                    <input
                        type="text"
                        name="payment_id"
                        value={formData.payment_id}
                        readOnly
                        style={{ ...inputStyle, backgroundColor: '#f0f0f0' }} // Make read-only input visually distinct
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Client Name</label>
                    <input
                        type="text"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Client Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Client Phone</label>
                    <input
                        type="tel"
                        name="client_phone"
                        value={formData.client_phone}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Amount</label>
                    <input
                        type="text" // Changed to text to allow decimal input with validations
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Transaction Date</label>
                    <input
                        type="date"
                        name="transaction_date"
                        value={formData.transaction_date}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Payment Method</label>
                    <select
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    >
                        <option value="cash">Cash</option>
                        <option value="credit">Credit Card</option>
                        <option value="debit">Debit Card</option>
                        <option value="bank_transfer">Bank Transfer</option>
                    </select>
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Payment Type</label>
                    <select
                        name="payment_type"
                        value={formData.payment_type}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    >
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="annually">Annually</option>
                    </select>
                </div>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Submit Payment
                </button>
            </form>
        </div>
    );
};

// Inline styles for form and input
const formContainerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const inputContainerStyle = {
    marginBottom: '15px',
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const statusStyle = {
    color: 'red',
    textAlign: 'center',
    marginBottom: '15px',
};

export default NewPaymentForm;
