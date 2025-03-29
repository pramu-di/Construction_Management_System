import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Supplierstable from './Supplierstable'; // Ensure the correct import of Supplierstable

const Supplierlist = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null); // Manage selected supplier state
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error message
  const [search, setSearch] = useState(""); // State for search input

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/supplier"); // Adjust the API endpoint as needed
        setSuppliers(res.data);  // Store fetched supplier data in the state
      } catch (err) {
        setError("Error while getting supplier data"); // Set error message
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchSuppliers();
  }, []);

  const handleDeleteSupplier = async (supplierId) => {
    try {
      await axios.delete(`http://localhost:3000/api/supplier/${supplierId}`); // Delete supplier
      setSuppliers(suppliers.filter(supplier => supplier._id !== supplierId)); // Update suppliers state
    } catch (err) {
      console.error("Error while deleting supplier", err); // Log the error for debugging
    }
  };

  // Filter suppliers based on search input
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.supplier_name.toLowerCase().includes(search.toLowerCase()) // Adjust to your supplier name field
  );

  return (
    <div style={{ padding: '20px' }}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search state
        style={{
          margin: '20px 0',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '250px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
          transition: 'border 0.2s ease', // Smooth transition on border color change
        }}
        onFocus={(e) => e.target.style.border = '1px solid #FCB400'} // Change border color on focus
        onBlur={(e) => e.target.style.border = '1px solid #ccc'} // Revert border color on blur
      />

      {loading ? (
        <p>Loading suppliers...</p> // Loading message
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p> // Error message
      ) : filteredSuppliers.length === 0 ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh', // Adjust height as needed
          fontSize: '20px',
          color: '#555'
        }}>
          No suppliers found!
        </div>
      ) : (
        <Supplierstable 
          suppliers={filteredSuppliers} // Use filtered suppliers
          selectedSupplier={selectedSupplier} 
          setSelectedSupplier={setSelectedSupplier} 
          onDeleteSupplier={handleDeleteSupplier} 
        />
      )}
    </div>
  );
};

export default Supplierlist;  
