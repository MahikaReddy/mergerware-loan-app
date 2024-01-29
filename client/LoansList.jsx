import React from 'react';

const LoansList = ({ loans }) => {
  return (
    <ul>
      {loans.map((loan) => (
        <li key={loan._id}>
          Amount: ${loan.amount}, Requested At: {loan.requestedAt.toLocaleString()}
        </li>
      ))}
    </ul>
  );
};

export default LoansList;
