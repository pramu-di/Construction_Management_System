import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ItemDetails = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isDownloadHovered, setIsDownloadHovered] = useState(false);

    const navigate = useNavigate();

    const fetchItem = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/item/${itemId}`);
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                setItem(data);
            } else {
                const text = await response.text();
                throw new Error(`Unexpected response: ${text}`);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const generatePDF = () => {
        if (!item) return; // Ensure item data is available before generating PDF

        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text("Item Details", 10, 10);
        doc.setDrawColor(0);
        doc.line(10, 15, 200, 15); // Horizontal line

        const tableData = [
            { label: "Item ID", value: item.item_id },
            { label: "Item Name", value: item.item_name },
            { label: "Description", value: item.description },
            { label: "Quantity", value: item.quantity },
            { label: "Unit Price", value: item.unit_price },
            { label: "Supplier Name", value: item.supplier_name },
            { label: "Supplier Email", value: item.supplier_email },
            { label: "Supplier Phone", value: item.supplier_phone },
            { label: "Minimum Level", value: item.min_level },
        ];

        doc.autoTable({
            head: [['Label', 'Value']],
            body: tableData.map(item => [item.label, item.value]),
            startY: 20,
            styles: { cellPadding: 5, fontSize: 12, overflow: 'linebreak' },
            headStyles: { fillColor: '#007BFF', textColor: '#FFFFFF' },
            alternateRowStyles: { fillColor: '#f2f2f2' },
            theme: 'grid', // Add grid theme for better visibility
        });

        doc.setFontSize(10);
        doc.text("Generated on: " + new Date().toLocaleString(), 10, doc.autoTable.previous.finalY + 10);
        doc.save(`item_${itemId}.pdf`);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/item/${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error deleting item: ${response.status}`);
            }
            setDeleteSuccess(true);
            setTimeout(() => {
                navigate('/inventory'); // Navigate to Item List after deletion
            }, 1500);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-item/${itemId}`);
    };

    useEffect(() => {
        if (itemId) {
            fetchItem();
        }
    }, [itemId]);

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;
    }

    return (
        <div style={outerContainerStyle}>
            <main style={mainStyle}>
                <h1 style={headingStyle}>Item Details</h1>
                {deleteSuccess && <div style={successMessageStyle}>Item deleted successfully!</div>}
                {item ? (
                    <div>
                        <h2>{item.item_name}</h2>
                        <p>Description: {item.description}</p>
                        <p>Price: ${item.unit_price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Supplier Name: {item.supplier_name}</p>
                        <p>Supplier Email: {item.supplier_email}</p>
                        <p>Supplier Phone: {item.supplier_phone}</p>
                        <p>Minimum Level: {item.min_level}</p>
                        <div style={buttonContainerStyle}>
                            <button
                                onClick={handleEdit}
                                style={buttonStyle('#007BFF', isEditHovered)}
                                onMouseEnter={() => setIsEditHovered(true)}
                                onMouseLeave={() => setIsEditHovered(false)}
                            >
                                Edit Item
                            </button>
                            <button
                                onClick={handleDelete}
                                style={buttonStyle('#FF0000', isDeleteHovered)}
                                onMouseEnter={() => setIsDeleteHovered(true)}
                                onMouseLeave={() => setIsDeleteHovered(false)}
                            >
                                Delete Item
                            </button>
                            <button
                                onClick={generatePDF}
                                style={buttonStyle('#28A745', isDownloadHovered)}
                                onMouseEnter={() => setIsDownloadHovered(true)}
                                onMouseLeave={() => setIsDownloadHovered(false)}
                            >
                                Download PDF
                            </button>
                            <button
                                onClick={() => navigate('/inventory')} // Navigate to Item List
                                style={buttonStyle('#6c757d', isBackHovered)}
                                onMouseEnter={() => setIsBackHovered(true)}
                                onMouseLeave={() => setIsBackHovered(false)}
                            >
                                Back to Item List
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>Loading...</div>
                )}
            </main>
        </div>
    );
};

// Styles
const outerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    backgroundColor: '#eaeaea', // Light background for contrast
};

const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh', // Adjust height as needed
    width: '60vw', // Set width to 60% of viewport width
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    border: '2px solid #ccc', // Frame border
};

const headingStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
};

const successMessageStyle = {
    color: 'green',
    marginBottom: '15px',
};

const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
};

const buttonStyle = (bgColor, isHovered) => ({
    padding: '10px 15px',
    backgroundColor: isHovered ? '#333' : bgColor, // Apply hover color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    transform: isHovered ? 'scale(1.05)' : 'none', // Scale on hover
    fontSize: '16px',
});

export default ItemDetails;
