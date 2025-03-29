import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Employeestable from './Employeestable';

const Employees = () => {
  const [employees, setEmployees] = useState([]); // Rename to employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Manage selected employee state

  useEffect(() => {
    axios.get("http://localhost:3000/api/employee") // Assuming this endpoint fetches employees
      .then((res) => {
        setEmployees(res.data);  // Store fetched employee data in the state
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  const handleDeleteEmployee = (employeeId) => {
    // Implement delete employee logic here
    axios.delete(`http://localhost:3000/api/employee/${employeeId}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee._id !== employeeId)); // Update employees state
      })
      .catch(() => {
        console.log("Error while deleting employee");
      });
  };

  return (
    <div>
      {/* Pass the fetched employee data and selected employee state to Employeestable */}
      {employees.length === 0 ? "No employees found!" : 
        <Employeestable 
          employees={employees} // Update prop to employees
          selectedEmployee={selectedEmployee} 
          setSelectedEmployee={setSelectedEmployee} 
          onDeleteEmployee={handleDeleteEmployee} // Update function name
        />
      }
    </div>
  );
};

export default Employees;
