import React, { useState } from 'react';

const SupplierDetails = ({ supplier, onDelete, onBack }) => {
  const [deleteSuccess, setDeleteSuccess] = useState(false); // State for delete success message

  const handleDelete = async () => {
    try {
      await onDelete(supplier._id); // Call the delete function with supplier ID
      setDeleteSuccess(true); // Show success message
      setTimeout(() => {
        onBack(); // Go back after a delay
      }, 1500); // Delay before going back
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <main style={{ padding: '20px', flex: 1 }}>
        <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Supplier Details</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>Supplier Name</th>
              <th style={headerStyle}>Supplier Email</th>
              <th style={headerStyle}>Supplier Phone</th>
              <th style={headerStyle}>Supplier Amount</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={cellStyle}>{supplier.supplier_name}</td>
              <td style={cellStyle}>{supplier.supplier_email}</td>
              <td style={cellStyle}>{supplier.supplier_phone}</td>
              <td style={cellStyle}>{supplier.supplier_amount}</td> {/* Corrected property name */}
              <td style={cellStyle}>{supplier.status}</td>
              <td style={cellStyle}>
                <button
                  style={buttonStyle('#191a19')}
                  onClick={handleDelete} // Call the delete function
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333'; // Change color on hover
                    e.currentTarget.style.transform = 'scale(1.05)'; // Scale up on hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#191a19'; // Revert color on mouse leave
                    e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  }}
                >
                  Delete
                </button>
                <button
                  style={{
                    ...buttonStyle('#FBC400'),
                    marginLeft: '10px',
                  }}
                  onClick={onBack} // Call the back function
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e0a800'; // Change color on hover
                    e.currentTarget.style.transform = 'scale(1.05)'; // Scale up on hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FBC400'; // Revert color on mouse leave
                    e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                  }}
                >
                  Back
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {deleteSuccess && <div style={{ marginTop: '20px', color: 'green' }}>Delete successful!</div>} {/* Success message */}
      </main>
    </div>
  );
};

// Reusable styles similar to Supplierstable.jsx
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
  padding: '12px',
  border: '1px solid #ddd',
  fontWeight: 'bold',
};

const cellStyle = {
  padding: '12px',
  border: '1px solid #ddd',
};

const buttonStyle = (bgColor) => ({
  padding: '8px 12px',
  backgroundColor: bgColor,
  color: bgColor === '#191a19' ? 'white' : '#191A19',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
});

export default SupplierDetails;
