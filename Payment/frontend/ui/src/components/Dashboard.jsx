import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

// Register chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

const Dashboard = () => {
  // Sample data for the chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Payments',
        data: [30000, 20000, 50000, 40000, 70000, 60000, 90000],
        backgroundColor: 'rgba(251, 196, 0, 0.6)',
        borderColor: '#FBC400',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 136, 0, 0.9)', // Background color on hover
        hoverBorderColor: '#FF8800', // Border color on hover
        hoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(0,0,0,0.1)', // Y-axis gridline color
        },
      },
      x: {
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(0,0,0,0.1)', // X-axis gridline color
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)', // Tooltip background color
        titleColor: '#fff', // Tooltip title text color
        bodyColor: '#fff', // Tooltip body text color
        borderColor: '#FBC400', // Tooltip border color
        borderWidth: 1,
        padding: 10,
        cornerRadius: 5,
        displayColors: false, // Hide the box color next to the label in the tooltip
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      animationDuration: 400, // Animate on hover
    },
    animation: {
      duration: 2000, // Animation duration for the chart rendering
      easing: 'easeOutBounce', // Easing function for a smooth animation
    },
  };

  return (
    <div style={dashboardContainerStyle}>
      <h1 style={headerStyle}>Dashboard</h1>
      <div style={cardsContainerStyle}>
        <div style={cardStyle} className="card total-clients">
          <h2 style={cardTitleStyle}>Total Clients</h2>
          <p style={cardValueStyle}>50</p>
        </div>
        <div style={cardStyle} className="card pending-payments">
          <h2 style={cardTitleStyle}>Pending Payments</h2>
          <p style={cardValueStyle}>10</p>
        </div>
        <div style={cardStyle} className="card total-payments">
          <h2 style={cardTitleStyle}>Total Payments</h2>
          <p style={cardValueStyle}>$150,000</p>
        </div>
        <div style={cardStyle} className="card completed-transactions">
          <h2 style={cardTitleStyle}>Completed Transactions</h2>
          <p style={cardValueStyle}>40</p>
        </div>
        <div style={cardStyle} className="card overdue-payments">
          <h2 style={cardTitleStyle}>Overdue Payments</h2>
          <p style={cardValueStyle}>5</p>
        </div>
        <div style={cardStyle} className="card total-revenue">
          <h2 style={cardTitleStyle}>Total Revenue</h2>
          <p style={cardValueStyle}>$200,000</p>
        </div>
      </div>

      <div style={chartContainerStyle}>
        <h2 style={chartTitleStyle}>Payment Trends</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

// Styling constants for the dashboard
const dashboardContainerStyle = {
  padding: '20px',
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  height: '100%',
  overflowY: 'auto',
};

const headerStyle = {
  fontSize: '28px',
  marginBottom: '20px',
  color: '#333',
};

const cardsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '20px',
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease, border 0.4s ease, background-color 0.4s ease',
  cursor: 'pointer',
  border: '2px solid transparent',
  background: 'linear-gradient(135deg, rgba(251, 196, 0, 0.8), rgba(255, 136, 0, 0.8))',
  color: '#fff',
};

const cardTitleStyle = {
  fontSize: '20px',
  marginBottom: '10px',
  color: '#fff',
};

const cardValueStyle = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#fff',
  textShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)',
};

const chartContainerStyle = {
  marginTop: '30px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const chartTitleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  color: '#333',
};

export default Dashboard;
