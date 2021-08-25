import { connect } from 'react-redux';

import {
  UI_RESET_PASSWORD_STATE,
  APP_RESET_PASSWORD_STATE,
  USER,
} from '../../actions/constants';
import fields from '../../utils/fields';
import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';

import FormGenerator from '../../templates/FormGenerator';

function ResetPassword(props) {
  const { REDUX_APP_STATE } = props;
  const loginFields = fields('Password', 'Re-type password');

  injectReducer(USER, HOFreducer(USER, {}));

  if (props[USER].token)
    localStorage.setItem(USER, JSON.stringify(props[USER]));

  return (
    <FormGenerator
      formHeading="Reset Password"
      buttonValue="Reset Password"
      fieldsObj={loginFields}
      UI_STATE={UI_RESET_PASSWORD_STATE}
      APP_STATE={APP_RESET_PASSWORD_STATE}
      REDUX_APP_STATE={REDUX_APP_STATE}
      topLogo
    />
  );
}

const mapStateToProps = (state) => {
  return {
    REDUX_APP_STATE: state[APP_RESET_PASSWORD_STATE] || {},
    [USER]: state[USER] || {},
  };
};

export default connect(mapStateToProps, {})(ResetPassword);
