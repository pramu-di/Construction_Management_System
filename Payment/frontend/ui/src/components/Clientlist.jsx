import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Clientstable from './Clientstable';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState(""); // State for search input
  const navigate = useNavigate(); // Initialize the navigate hook

  // Fetch clients data from the API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/client");
        setClients(res.data); // Store fetched client data in the state
      } catch (error) {
        console.error("Error while getting data: ", error);
      }
    };

    fetchClients(); // Call the fetch function
  }, []);

  // Handle delete client logic
  const handleDeleteClient = async (clientId) => {
    try {
      await axios.delete(`http://localhost:3000/api/client/${clientId}`);
      setClients(clients.filter(client => client._id !== clientId)); // Update clients state after deletion
    } catch (error) {
      console.error("Error while deleting client: ", error);
    }
  };

  // Navigate to the new payment form page
  const handleNewPayment = () => {
    navigate("/new-payment");
  };

  // Filter clients based on search input
  const filteredClients = clients.filter(client =>
    client.client_name.toLowerCase().includes(search.toLowerCase())
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
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'border 0.2s ease',
        }}
        onFocus={(e) => e.target.style.border = '1px solid #FCB400'}
        onBlur={(e) => e.target.style.border = '1px solid #ccc'}
      />

      {/* New Payment Button */}
      <button 
        onClick={handleNewPayment} 
        style={{ 
          margin: '20px 0', 
          float: 'right',  
          marginRight: '40px', 
          backgroundColor: '#FCB400', 
          color: '#191A19', 
          border: 'none', 
          padding: '10px 15px', 
          borderRadius: '5px', 
          cursor: 'pointer'
        }}
      >
        New Payment
      </button>

      {/* Clients Table */}
      {filteredClients.length === 0 ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          fontSize: '20px',
          color: '#555'
        }}>
          No clients found!
        </div>
      ) : (
        <Clientstable 
          clients={filteredClients} // Pass only filtered clients to Clientstable
          onDeleteClient={handleDeleteClient} 
        />
      )}
    </div>
  );
};

export default Clients;
