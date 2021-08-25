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

function Login(props) {
  const { REDUX_APP_STATE } = props;
  const loginFields = fields('Password', 'Re-type password');

  injectReducer(USER, HOFreducer(USER, {}));

  return (
    <FormGenerator
      formHeading="Login"
      buttonValue="Login"
      fieldsObj={loginFields}
      UI_STATE={UI_RESET_PASSWORD_STATE}
      APP_STATE={APP_RESET_PASSWORD_STATE}
      REDUX_APP_STATE={REDUX_APP_STATE}
      topLogo
    />
  );
}

const mapStateToProps = (state) => {
  return { REDUX_APP_STATE: state[APP_RESET_PASSWORD_STATE] || {} };
};

export default connect(mapStateToProps, {})(Login);
