// client/main.jsx
import $ from 'jquery';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RegistrationFormContainer from '../imports/ui/container/RegistrationFormContainer';
import LenderDashboardContainer from '../imports/ui/LenderDashboardContainer';
import BorrowerDashboardContainer from '../imports/ui/BorrowerDashboardContainer';
import RegistrationForm from '../components/RegistrationForm';


Meteor.startup(() => {
  // Subscribe to the 'loans' publication
  const loansSubscription = Meteor.subscribe('loans');

  // Wait for the subscription to be ready before rendering the app
  loansSubscription.ready(() => {
    render(
      <Router>
        <Switch>
          <Route path="/register" component={RegistrationFormContainer} />
          <Route path="/lender" component={LenderDashboardContainer} />
          <Route path="/borrower" component={BorrowerDashboardContainer} />
          {/* Add more routes if needed */}
        </Switch>
      </Router>,
      document.getElementById('app')
    );
  });
});
