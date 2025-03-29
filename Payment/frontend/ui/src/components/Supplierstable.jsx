import React from 'react';
import SupplierDetails from './SupplierDetails'; // Make sure to import SupplierDetails

const Supplierstable = ({ suppliers, selectedSupplier, setSelectedSupplier, onDeleteSupplier }) => {
    const handleDetailsClick = (supplier) => {
        setSelectedSupplier(supplier);
    };

    return (
        <main style={{ padding: '20px', flex: 1 }}>
            <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>All Suppliers</h1>
            {selectedSupplier ? (
                <SupplierDetails supplier={selectedSupplier} onDelete={onDeleteSupplier} onBack={() => setSelectedSupplier(null)} />
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={headerStyle}>Payment ID</th>
                            <th style={headerStyle}>Supplier Name</th>
                            <th style={headerStyle}>Supplier Amount</th>
                            <th style={headerStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier) => (
                            <tr key={supplier._id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={cellStyle}>{supplier.payment_id}</td>
                                <td style={cellStyle}>{supplier.supplier_name}</td>
                                <td style={cellStyle}>{supplier.supplier_amount}</td>
                                <td style={cellStyle}>
                                    <button
                                        style={buttonStyle('#FBC400')}
                                        onClick={() => handleDetailsClick(supplier)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#e0a800'; // Change color on hover
                                            e.currentTarget.style.transform = 'scale(1.05)'; // Scale up on hover
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#FBC400'; // Revert color on mouse leave
                                            e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                                        }}
                                    >
                                        Details
                                    </button>
                                    <button
                                        style={{
                                            ...buttonStyle('#191a19'),
                                            marginLeft: '30px', // Increased space between buttons
                                        }}
                                        onClick={() => onDeleteSupplier(supplier._id)} // Directly delete supplier
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
};

// Styling constants for better readability
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
    marginLeft: '10px',
    transition: 'background-color 0.3s, transform 0.3s',
});

export default Supplierstable;
