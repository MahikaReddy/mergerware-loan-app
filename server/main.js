// server/main.js

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Loans from '../imports/api/loans';

Meteor.startup(() => {
  // Your existing server-side startup logic...

  // Create an admin user if it doesn't exist
  const adminEmail = 'admin@example.com';
  const adminPassword = 'adminPassword';

  if (!Meteor.users.findOne({ 'emails.address': adminEmail })) {
    const adminUserId = Accounts.createUser({ email: adminEmail, password: adminPassword, role: 'admin' });

    // Optionally, you can assign additional roles or perform other actions for the admin user.
    // Example: Roles.addUsersToRoles(adminUserId, ['admin', 'otherRole']);

    console.log('Admin user created');
  }

  // Example: Publish the loans data
  Meteor.publish('loans', function () {
    return Loans.find();
  });

  // Example: Publish all transactions data
  Meteor.publish('allTransactions', function () {
    return Loans.find();
  });

  // Your other methods and logic...
});

Meteor.methods({
  'registerUser'({ email, password, role }) {
    if (Meteor.users.findOne({ 'emails.address': email })) {
      throw new Meteor.Error('user-exists', 'User with this email already exists');
    }

    const userId = Accounts.createUser({ email, password });

    // Set user role
    Meteor.users.update(userId, { $set: { role } });

    return userId;
  },

  'requestLoan'(amount) {
    // Ensure the user is logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to request a loan');
    }

    // Perform additional validation
    const validAmountRange = isValidAmountRange(parseFloat(amount));
    if (!validAmountRange) {
      throw new Meteor.Error('invalid-amount', 'The loan amount is not within a valid range');
    }

    // Create a new loan record
    const loanId = Loans.insert({
      borrowerId: Meteor.userId(),
      amount: parseFloat(amount),
      requestedAt: new Date(),
    });

    return loanId;
  },

  'confirmPayment'(loanId) {
    // Ensure the user is logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to confirm a payment');
    }

    // Additional validation, e.g., check if the user has the lender role
    const user = Meteor.user();
    if (!user || !user.role || user.role !== 'lender') {
      throw new Meteor.Error('not-authorized', 'Only lenders can confirm payments');
    }

    // Update the loan record to mark it as paid
    const paymentTime = new Date();
    Loans.update({ _id: loanId, lenderId: Meteor.userId(), paidAt: null }, { $set: { paidAt: paymentTime } });

    return paymentTime;
  },
});

// Validate if the loan amount is within a valid range
function isValidAmountRange(amount) {
  // Add your custom validation logic here
  // For example, check if the amount is greater than 0 and less than a maximum value
  return amount > 0 && amount <= 10000;
}

export { Loans };
