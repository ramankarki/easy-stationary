import { connect } from 'react-redux';
import { useEffect } from 'react';

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

  useEffect(() => injectReducer(USER, HOFreducer(USER, {})), []);

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

const mapStateToProps = (state) => ({
  REDUX_APP_STATE: state[APP_RESET_PASSWORD_STATE] || {},
});

export default connect(mapStateToProps, {})(ResetPassword);
