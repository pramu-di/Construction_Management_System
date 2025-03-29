import React, { useState } from 'react';

const EmployeeDetails = ({ employee, onDelete, onBack }) => {
    const [deleteSuccess, setDeleteSuccess] = useState(false); // State for delete success message

    const handleDelete = () => {
        onDelete(employee._id);
        setDeleteSuccess(true); // Show success message
        setTimeout(() => {
            onBack(); // Go back after a delay
        }, 1500); // Delay before going back
    };

    return (
        <div>
            <main style={{ padding: '20px', flex: 1 }}>
                <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Employee Details</h1>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={headerStyle}>Payment ID</th>
                            <th style={headerStyle}>Employee Name</th>
                            <th style={headerStyle}>Employee Phone</th>
                            <th style={headerStyle}>Salary Amount</th>
                            <th style={headerStyle}>Payment Date</th>
                            <th style={headerStyle}>Status</th>
                            <th style={headerStyle}>Report Status</th>
                            <th style={headerStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={cellStyle}>{employee.payment_id}</td>
                            <td style={cellStyle}>{employee.employee_name}</td>
                            <td style={cellStyle}>{employee.employee_phone}</td>
                            <td style={cellStyle}>{employee.salary_amount}</td>
                            <td style={cellStyle}>{new Date(employee.payment_date).toLocaleDateString()}</td>
                            <td style={cellStyle}>{employee.status}</td>
                            <td style={cellStyle}>{employee.report_status}</td>
                            <td style={cellStyle}>
                                <button
                                    style={buttonStyle('#191a19')}
                                    onClick={handleDelete} // Call the delete function
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#333'; // Darken on hover
                                        e.currentTarget.style.transform = 'scale(1.05)'; // Scale up
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#191a19'; // Revert on mouse leave
                                        e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    style={buttonStyle('#FBC400')}
                                    onClick={onBack} // Call the back function
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#e0a800'; // Darken on hover
                                        e.currentTarget.style.transform = 'scale(1.05)'; // Scale up
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FBC400'; // Revert on mouse leave
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

export default EmployeeDetails;
