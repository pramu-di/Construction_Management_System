import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const inventoryData = [
    { name: 'Cement', quantity: 120 },
    { name: 'Bricks', quantity: 80 },
    { name: 'Steel', quantity: 50 },
    { name: 'Wood', quantity: 30 },
  ];

  const transactionData = [
    { name: 'Added', value: 60 },
    { name: 'Removed', value: 40 },
  ];

  const totalItems = inventoryData.reduce((total, item) => total + item.quantity, 0);
  const lowStockItems = inventoryData.filter(item => item.quantity < 10).length;
  const lowStockPercentage = ((lowStockItems / inventoryData.length) * 100).toFixed(2);

  const recentTransactions = [
    { id: 1, item: 'Cement', action: 'Added', date: '2024-10-01' },
    { id: 2, item: 'Bricks', action: 'Removed', date: '2024-09-30' },
    { id: 3, item: 'Steel', action: 'Added', date: '2024-09-29' },
  ];

  return (
    <div style={dashboardStyle}>
      <h1 style={headerStyle}>Inventory Management Dashboard</h1>

      <div style={summaryStyle}>
        <div style={updatedMetricStyle}>
          <h3 style={metricHeaderStyle}>Total Items in Inventory</h3>
          <p style={metricValueStyle}>{totalItems}</p>
        </div>
        <div style={updatedMetricStyle}>
          <h3 style={metricHeaderStyle}>Low Stock Items</h3>
          <p style={metricValueStyle}>{lowStockItems} ({lowStockPercentage}%)</p>
        </div>
      </div>

      <div style={chartsContainerStyle}>
        <div style={{ ...chartStyle, width: '130%' }}>
          <h2 style={chartHeaderStyle}>Inventory Summary</h2>
          <ResponsiveContainer width="102%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...chartStyle, width: '150%', marginLeft: '20px' }}>
          <h2 style={chartHeaderStyle}>Recent Transactions</h2>
          <ResponsiveContainer width="102%" height={300}>
            <PieChart>
              <Pie data={transactionData} dataKey="value" nameKey="name" outerRadius={140} fill="#007bff" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={alertsStyle}>
        <h2 style={sectionHeaderStyle}>Low Stock Alerts</h2>
        <ul style={alertListStyle}>
          <li style={alertItemStyle}>
            <span style={itemNameStyle}>Cement</span> - 5 units remaining
          </li>
          <li style={alertItemStyle}>
            <span style={itemNameStyle}>Bricks</span> - 2 units remaining
          </li>
          <li style={alertItemStyle}>
            <span style={itemNameStyle}>Steel</span> - 1 unit remaining
          </li>
        </ul>
      </div>

      <div style={transactionHistoryStyle}>
        <h2 style={sectionHeaderStyle}>Recent Transaction History</h2>
        <ul style={transactionListStyle}>
          {recentTransactions.map(transaction => (
            <li key={transaction.id} style={transactionItemStyle}>
              <span style={transactionItemNameStyle}>{transaction.item}</span> - {transaction.action} on {transaction.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Styles
const dashboardStyle = {
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
};

const headerStyle = {
  fontSize: '28px',
  color: '#333',
  marginBottom: '20px',
  textAlign: 'center',
};

const summaryStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '20px',
};

const metricStyle = {
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '5px',
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
  width: '45%',
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
};

const metricHeaderStyle = {
  fontSize: '18px',
  color: '#555',
};

const metricValueStyle = {
  fontSize: '24px',
  color: '#333',
  fontWeight: 'bold',
};

const chartsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  flex: 1,
  gap: '20px',
};

const chartStyle = {
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '5px',
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s',
};

const chartHeaderStyle = {
  fontSize: '20px',
  color: '#555',
  marginBottom: '10px',
};

const alertsStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
  marginTop: '20px',
  position: 'relative',
};

const sectionHeaderStyle = {
  fontSize: '22px',
  color: '#d9534f',
  fontWeight: 'bold',
  marginBottom: '15px',
  textAlign: 'center',
};

const alertListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const alertItemStyle = {
  fontSize: '18px',
  color: '#ff4444',
  padding: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #eee',
  marginBottom: '10px',
  transition: 'background-color 0.3s, color 0.3s',
};

const itemNameStyle = {
  fontWeight: 'bold',
  color: '#333',
};

const transactionHistoryStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
  marginTop: '20px',
};

const transactionListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const transactionItemStyle = {
  fontSize: '18px',
  color: '#333',
  padding: '10px 0',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #eee',
  marginBottom: '10px',
  transition: 'background-color 0.3s',
};

const transactionItemNameStyle = {
  fontWeight: 'bold',
  color: '#007bff',
};

// Advanced Styles for Metrics with Hover Effect
const updatedMetricStyle = {
  ...metricStyle,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#e6f7ff', // Light blue background on hover
  },
  border: '2px solid #007bff',
  padding: '20px',
  color: '#333',
};

export default Dashboard;
