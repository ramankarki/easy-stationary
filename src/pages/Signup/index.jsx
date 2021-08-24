import { connect } from 'react-redux';

import { LOGIN } from '../../Routes/contants';
import { UI_SIGNUP_STATE, APP_SIGNUP_STATE } from '../../actions/constants';
import fields from '../../utils/fields';

import FormGenerator from '../../templates/FormGenerator';

function Signup(props) {
  const { REDUX_APP_STATE } = props;
  const signupFields = fields(
    'First name',
    'Last name',
    'Phone number',
    'Full address',
    'Email',
    'Password',
    'Re-type password'
  );

  return (
    <FormGenerator
      formHeading="Create Account"
      buttonValue="Create Account"
      fieldsObj={signupFields}
      UI_STATE={UI_SIGNUP_STATE}
      APP_STATE={APP_SIGNUP_STATE}
      REDUX_APP_STATE={REDUX_APP_STATE}
      redirect={LOGIN}
      redirectMsg="Already have an account? Login"
      topLogo
    />
  );
}

const mapStateToProps = (state) => {
  return { REDUX_APP_STATE: state[APP_SIGNUP_STATE] || {} };
};

export default connect(mapStateToProps, {})(Signup);
