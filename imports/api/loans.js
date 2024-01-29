// imports/api/loans.js

import { Mongo } from 'meteor/mongo';

// Define the Loans collection
const Loans = new Mongo.Collection('loans');

// Export the Loans collection
export default Loans;
