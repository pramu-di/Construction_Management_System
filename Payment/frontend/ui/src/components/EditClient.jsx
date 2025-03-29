import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditClient = () => {
  const { clientId } = useParams(); // Get clientId from URL parameters
  const [client, setClient] = useState({ client_name: '', email: '', client_phone: '', amount: 0, transaction_date: '', status: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isSubmitHovered, setIsSubmitHovered] = useState(false); // Hover state for Submit button
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch client data when component mounts
  const fetchClient = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/client/${clientId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClient(data); // Set the fetched client data
    } catch (error) {
      console.error(error);
      setError(error.message); // Set error message if there's an error
    }
  };

  // Update client data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(`http://localhost:3000/api/client/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client), // Send updated client data
      });
      if (!response.ok) {
        throw new Error(`Error updating client: ${response.status}`);
      }
      setSuccessMessage('Client updated successfully!'); // Set success message
      setTimeout(() => {
        navigate(`/client-details/${clientId}`); // Navigate back to Client Details page after a delay
      }, 1500); // Delay before navigation
    } catch (error) {
      console.error(error);
      setError(error.message); // Set error message if there's an error
    }
  };

  useEffect(() => {
    fetchClient(); // Fetch client data when component mounts
  }, [clientId]);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>; // Display error message if any
  }

  return (
    <div>
      <main style={mainStyle}>
        <h1 style={headingStyle}>Edit Client</h1>
        {successMessage && <div style={successMessageStyle}>{successMessage}</div>} {/* Display success message */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>
            Client Name:
            <input
              type="text"
              name="client_name"
              value={client.client_name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Client Email:
            <input
              type="email"
              name="email"
              value={client.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Client Phone:
            <input
              type="text"
              name="client_phone"
              value={client.client_phone}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Amount:
            <input
              type="number"
              name="amount"
              value={client.amount}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Transaction Date:
            <input
              type="date"
              name="transaction_date"
              value={client.transaction_date.split('T')[0]} // Format for date input
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Status:
            <input
              type="text"
              name="status"
              value={client.status}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <button
            type="submit"
            style={buttonStyle('#4CAF50', isSubmitHovered)} // Submit button
            onMouseEnter={() => setIsSubmitHovered(true)} // Set hover state
            onMouseLeave={() => setIsSubmitHovered(false)} // Unset hover state
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

// Styles
const mainStyle = {
  padding: '20px',
  flex: 1,
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  border: '2px solid #ccc', // Add border/frame
  maxWidth: '600px', // Optional: limit width for better presentation
  margin: 'auto', // Center the main content
};

const headingStyle = {
  marginBottom: '20px',
  fontSize: '24px',
  color: '#333',
};

const successMessageStyle = {
  color: 'green',
  marginBottom: '15px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  color: '#555',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
  marginTop: '5px',
  outline: 'none',
  transition: 'border-color 0.3s',
};

const buttonStyle = (bgColor, isHovered) => ({
  padding: '10px',
  backgroundColor: isHovered ? '#333' : bgColor, // Apply hover color
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
  transform: isHovered ? 'scale(1.05)' : 'none', // Scale on hover
  fontSize: '16px',
});

export default EditClient;
