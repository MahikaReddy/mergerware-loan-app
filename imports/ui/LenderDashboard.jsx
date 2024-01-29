// imports/ui/LenderDashboard.jsx

// imports/ui/LenderDashboard.jsx

import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { useTracker } from 'meteor/react-meteor-data';
import PaymentsList from './PaymentsList';
import Loans from '../api/loans'; // Import the Loans collection

// The rest of your component code...


const LenderDashboard = ({ currentUser }) => {
  const [confirmedLoanId, setConfirmedLoanId] = useState('');

  // Use useTracker to create a reactive data source
  const pastPayments = useTracker(() => {
    // Fetch past payments based on the reactive data source (e.g., loans collection)
    const loans = Loans.find({ lenderId: currentUser._id }).fetch();
    // Process loans to extract payment information
    const payments = loans.map((loan) => ({
      loanId: loan._id,
      amount: loan.amount,
      paidAt: loan.paidAt,
    }));
    return payments;
  });

  const handleConfirmPayment = () => {
    Meteor.call('confirmPayment', confirmedLoanId, (error, result) => {
      if (error) {
        alert(error.reason);
      } else {
        console.log('Payment confirmed successfully');
      }
    });
  };

  return (
    <div>
      <h2>Lender Dashboard</h2>

      <h3>Confirm Payment:</h3>
      <label htmlFor="confirmedLoanId">Loan ID:</label>
      <input
        type="text"
        name="confirmedLoanId"
        value={confirmedLoanId}
        onChange={(e) => setConfirmedLoanId(e.target.value)}
        required
      />
      <button onClick={handleConfirmPayment}>Confirm Payment</button>

      <h3>Past Payments:</h3>
      <PaymentsList payments={pastPayments} />
    </div>
  );
};

const LenderDashboardContainer = withTracker(() => ({
  currentUser: Meteor.user(),
}))(LenderDashboard);

export default LenderDashboardContainer;
