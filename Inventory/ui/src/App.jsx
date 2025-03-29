import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust the path as necessary
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import Itemlist from './components/Itemlist'; // Import Itemlist component
import ItemDetails from './components/ItemDetails'; // Import ItemDetails component
import EditItem from './components/EditItem'; // Import the EditItem component
import AddItemForm from './components/AddItemForm'; // Import the AddItemForm component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demonstration purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the loading duration as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Navbar />
        <div style={{ marginLeft: '25px', padding: '20px', flexGrow: 1 }}>
          {loading ? (
            <div style={loadingStyle}>Loading...</div>
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Itemlist />} />
              <Route path="/items/:itemId" element={<ItemDetails />} />
              <Route path="/edit-item/:itemId" element={<EditItem />} />
              <Route path="/add-item" element={<AddItemForm />} />
              <Route path="/reports" element={<h1>Reports</h1>} />
              <Route path="/login" element={<h1>Login</h1>} />
              <Route path="/orders" element={<h1>Orders</h1>} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

// Styles
const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  fontSize: '24px',
  fontWeight: 'bold',
};

export default App;
