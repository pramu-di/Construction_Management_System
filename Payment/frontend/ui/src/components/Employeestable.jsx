import React from 'react';
import EmployeeDetails from './EmployeeDetails'; // Ensure this points to your EmployeeDetails component

const Employeestable = ({ employees, selectedEmployee, setSelectedEmployee, onDeleteEmployee }) => {
    const handleDetailsClick = (employee) => {
        setSelectedEmployee(employee);
    };

    return (
        <main style={{ padding: '20px', flex: 1 }}>
            <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>All Employees</h1>
            {selectedEmployee ? (
                <EmployeeDetails 
                    employee={selectedEmployee} 
                    onDelete={onDeleteEmployee} 
                    onBack={() => setSelectedEmployee(null)} 
                />
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={headerStyle}>Payment ID</th>
                            <th style={headerStyle}>Employee Name</th>
                            <th style={headerStyle}>Salary Amount</th>
                            <th style={headerStyle}>Status</th>
                            <th style={headerStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr 
                                key={employee._id} 
                                style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff', transition: 'background-color 0.3s' }} 
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} 
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                            >
                                <td style={cellStyle}>{employee.payment_id}</td>
                                <td style={cellStyle}>{employee.employee_name}</td>
                                <td style={cellStyle}>{employee.salary_amount}</td>
                                <td style={cellStyle}>{employee.status}</td>
                                <td style={cellStyle}>
                                    <button
                                        style={buttonStyle('#FBC400')}
                                        onClick={() => handleDetailsClick(employee)} // Use employee for details
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
                                        style={buttonStyle('#191a19')}
                                        onClick={() => onDeleteEmployee(employee._id)} // Delete employee
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
    marginRight: '15px',
    padding: '8px 12px',
    backgroundColor: bgColor,
    color: bgColor === '#191a19' ? 'white' : '#191A19',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
});

export default Employeestable;
