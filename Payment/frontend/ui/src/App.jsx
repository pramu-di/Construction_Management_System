import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clients from './components/Clientlist'; // Import your Clientlist component
import Supplierlist from './components/Supplierlist'; // Import your Supplierlist component
import Employeelist from './components/Employeelist'; // Import your Employeelist component
import NewPaymentForm from './components/NewPaymentForm'; // Import your NewPaymentForm component
import ClientDetails from './components/ClientDetails'; // Import the ClientDetails component
import EditClient from './components/EditClient'; // Import your EditClient component
import Dashboard from './components/Dashboard'; // Import the new Dashboard component

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Set the default route to Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* Add route for Dashboard */}
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<ClientDetailsWrapper />} /> {/* Dynamic route for ClientDetails */}
            <Route path="/edit-client/:clientId" element={<EditClient />} /> {/* Add this line for EditClient */}
            <Route path="/suppliers" element={<Supplierlist />} />
            <Route path="/employees" element={<Employeelist />} />
            <Route path="/new-payment" element={<NewPaymentForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Wrapper component to handle route parameters
const ClientDetailsWrapper = () => {
  const { id } = useParams(); // Get the client ID from the URL
  return <ClientDetails clientId={id} />; // Pass the client ID as a prop to ClientDetails
};

export default App;
