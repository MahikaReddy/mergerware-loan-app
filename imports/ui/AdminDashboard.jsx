import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './AdminDashboard.css'; // Import your styles

const AdminDashboard = ({ allTransactions }) => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>All Transactions:</h3>
      <div className="transaction-list">
        {allTransactions.map((transaction) => (
          <div key={transaction._id} className="transaction-item">
            <p>User: {transaction.borrowerId}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Requested At: {transaction.requestedAt.toLocaleString()}</p>
            <p>Paid At: {transaction.paidAt ? transaction.paidAt.toLocaleString() : 'Not Paid'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboardContainer = withTracker(() => ({
  allTransactions: [], // You need to fetch and pass all transactions data here
}))(AdminDashboard);

export default AdminDashboardContainer;
