import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import LoansList from './LoansList';

import './BorrowerDashboard.css'; // Import your styles

const BorrowerDashboard = ({ currentUser, pastLoans }) => {
  const [loanAmount, setLoanAmount] = useState('');

  const handleLoanRequest = (event) => {
    event.preventDefault();

    Meteor.call('requestLoan', loanAmount, (error, result) => {
      if (error) {
        alert(error.reason);
      } else {
        console.log('Loan requested successfully');
        setLoanAmount('');
      }
    });
  };

  return (
    <div className="borrower-dashboard">
      <h2>Borrower Dashboard</h2>

      <div className="loan-request-section">
        <form onSubmit={handleLoanRequest}>
          <label htmlFor="loanAmount">Loan Amount:</label>
          <input
            type="number"
            name="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
          <button type="submit">Request Loan</button>
        </form>
      </div>

      <h3>Past Loans:</h3>
      <LoansList loans={pastLoans} />
    </div>
  );
};

const BorrowerDashboardContainer = withTracker(() => ({
  currentUser: Meteor.user(),
  pastLoans: [], // You need to fetch and pass past loans data here
}))(BorrowerDashboard);

export default BorrowerDashboardContainer;
