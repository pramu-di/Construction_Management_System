import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import jsPDF from 'jspdf'; // Correct import for jsPDF
import 'jspdf-autotable'; // Import jsPDF autotable

const ClientDetails = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false); // State for delete success message
  const [isDeleteHovered, setIsDeleteHovered] = useState(false); // Hover state for Delete button
  const [isBackHovered, setIsBackHovered] = useState(false); // Hover state for Back button
  const [isEditHovered, setIsEditHovered] = useState(false); // Hover state for Edit button
  const [isDownloadHovered, setIsDownloadHovered] = useState(false); // Hover state for Download button

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch client data when component mounts or clientId changes
  const fetchClient = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/client/${clientId}`); // Correct API endpoint
      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setClient(data); // Set the fetched client data
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }
    } catch (error) {
      console.error(error);
      setError(error.message); // Set error message if there's an error
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add address to the top left
    const address = "Ranaweera Pranandu Construction\nKuruduwatta,\nGinnaliya,\nUrubokka.";
    doc.setFontSize(12);
    doc.text(address, 10, 10); // Adjust the position as needed

    // Add title
    doc.setFontSize(14);
    doc.text("Client Details", 85, 45); // Adjust the position for the title

    // Set up table data
    const tableData = [
      { label: "Client Name", value: client.client_name },
      { label: "Email", value: client.email },
      { label: "Phone", value: client.client_phone },
      { label: "Amount", value: client.amount },
      { label: "Transaction Date", value: client.transaction_date },
      { label: "Status", value: client.status },
    ];

    // Create the table
    doc.autoTable({
      head: [['Label', 'Value']],
      body: tableData.map(item => [item.label, item.value]),
      startY: 50, // Start the table below the title
      styles: { fontSize: 12 }, // Table font size
      headStyles: { fillColor: '#007BFF', textColor: '#FFFFFF' }, // Header styles
      alternateRowStyles: { fillColor: '#f2f2f2' }, // Alternate row styles
      margin: { top: 10 }, // Add margin at the top of the table
    });

    // Save the PDF
    doc.save(`client_${clientId}.pdf`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/client/${clientId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error deleting client: ${response.status}`);
      }
      setDeleteSuccess(true); // Show success message
      setTimeout(() => {
        window.history.back(); // Go back after a delay
      }, 1500); // Delay before going back
    } catch (error) {
      console.error(error);
      setError(error.message); // Set error message if there's an error
    }
  };

  const handleEdit = () => {
    navigate(`/edit-client/${clientId}`); // Navigate to Edit Client form
  };

  useEffect(() => {
    if (clientId) {
      fetchClient(); // Fetch client data when clientId changes
    }
  }, [clientId]);

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>; // Display error message if any
  }

  return (
    <div style={outerContainerStyle}>
      <main style={mainStyle}>
        <h1 style={headingStyle}>Client Details</h1>
        {deleteSuccess && <div style={successMessageStyle}>Client deleted successfully!</div>} {/* Show success message */}
        {client ? (
          <div>
            <h2>{client.client_name}</h2>
            <p>Email: {client.email}</p>
            <p>Phone: {client.client_phone}</p>
            <p>Amount: {client.amount}</p>
            <p>Transaction Date: {client.transaction_date}</p>
            <p>Status: {client.status}</p>
            <div style={buttonContainerStyle}>
              <button
                onClick={handleEdit}
                style={buttonStyle('#007BFF', isEditHovered)} // Edit button
                onMouseEnter={() => setIsEditHovered(true)} // Set hover state
                onMouseLeave={() => setIsEditHovered(false)} // Unset hover state
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                style={buttonStyle('#DC3545', isDeleteHovered)} // Delete button
                onMouseEnter={() => setIsDeleteHovered(true)} // Set hover state
                onMouseLeave={() => setIsDeleteHovered(false)} // Unset hover state
              >
                Delete
              </button>
              <button
                onClick={generatePDF} // Call generatePDF function
                style={buttonStyle('#28A745', isDownloadHovered)} // Download PDF button
                onMouseEnter={() => setIsDownloadHovered(true)} // Set hover state
                onMouseLeave={() => setIsDownloadHovered(false)} // Unset hover state
              >
                Download PDF
              </button>
              <button
                onClick={() => window.history.back()}
                style={buttonStyle('#6C757D', isBackHovered)} // Back button
                onMouseEnter={() => setIsBackHovered(true)} // Set hover state
                onMouseLeave={() => setIsBackHovered(false)} // Unset hover state
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

// Styles
const outerContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Full viewport height
  backgroundColor: '#eaeaea', // Light background for contrast
};

const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh', // Adjust height as needed
  width: '60vw', // Set width to 60% of viewport width
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  border: '2px solid #ccc', // Frame border
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

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '20px',
};

const buttonStyle = (bgColor, isHovered) => ({
  padding: '10px 15px',
  backgroundColor: isHovered ? '#333' : bgColor, // Apply hover color
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
  transform: isHovered ? 'scale(1.05)' : 'none', // Scale on hover
  fontSize: '16px',
});

export default ClientDetails;
