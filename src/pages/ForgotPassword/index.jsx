import { connect } from 'react-redux';

import {
  UI_FORGOT_PASSWORD_STATE,
  APP_FORGOT_PASSWORD_STATE,
  USER,
} from '../../actions/constants';
import fields from '../../utils/fields';
import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';

import FormGenerator from '../../templates/FormGenerator';

function ForgotPassword(props) {
  const { REDUX_APP_STATE } = props;
  const loginFields = fields('Email');

  injectReducer(USER, HOFreducer(USER, {}));

  return (
    <FormGenerator
      formHeading="Forgot Password"
      buttonValue="Send Email"
      fieldsObj={loginFields}
      UI_STATE={UI_FORGOT_PASSWORD_STATE}
      APP_STATE={APP_FORGOT_PASSWORD_STATE}
      REDUX_APP_STATE={REDUX_APP_STATE}
      topLogo
    />
  );
}

const mapStateToProps = (state) => {
  return { REDUX_APP_STATE: state[APP_FORGOT_PASSWORD_STATE] || {} };
};

export default connect(mapStateToProps, {})(ForgotPassword);
