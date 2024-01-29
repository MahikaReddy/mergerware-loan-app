import { withTracker } from 'meteor/react-meteor-data';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationFormContainer = withTracker(() => ({
  currentUser: Meteor.user(),
}))(RegistrationForm);

export default RegistrationFormContainer;
