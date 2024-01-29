import React from 'react';

const PaymentsList = ({ payments }) => {
  return (
    <ul>
      {payments.map((payment) => (
        <li key={payment._id}>
          Loan ID: {payment.loanId}, Paid At: {payment.paidAt.toLocaleString()}
        </li>
      ))}
    </ul>
  );
};

export default PaymentsList;
