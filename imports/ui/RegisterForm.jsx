import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

import './RegistrationForm.css'; // Import your styles

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('borrower');

  const handleRegistration = (event) => {
    event.preventDefault();

    Meteor.call('registerUser', { email, password, role }, (error, userId) => {
      if (error) {
        alert(error.reason);
      } else {
        console.log('Registration successful');
      }
    });
  };

  const currentUser = Meteor.user();

  return (
    <div className="registration-form">
      <h2>Register</h2>
      {currentUser ? (
        <p>Welcome, {currentUser.emails[0].address}!</p>
      ) : (
        <form onSubmit={handleRegistration}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="borrower">Borrower</option>
            <option value="lender">Lender</option>
            <option value="admin">Admin</option>
          </select>
          <br />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
