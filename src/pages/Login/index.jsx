import { connect } from 'react-redux';

import { SIGNUP } from '../../Routes/contants';
import { UI_LOGIN_STATE, APP_LOGIN_STATE, USER } from '../../actions/constants';
import fields from '../../utils/fields';
import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';

import FormGenerator from '../../templates/FormGenerator';

function Login(props) {
  const { REDUX_APP_STATE } = props;
  const loginFields = fields('Email', 'Password');

  injectReducer(USER, HOFreducer(USER, {}));

  return (
    <FormGenerator
      formHeading="Login"
      buttonValue="Login"
      fieldsObj={loginFields}
      UI_STATE={UI_LOGIN_STATE}
      APP_STATE={APP_LOGIN_STATE}
      REDUX_APP_STATE={REDUX_APP_STATE}
      redirect={SIGNUP}
      redirectMsg="New to Easy Stationary? Create Account"
      topLogo
    />
  );
}

const mapStateToProps = (state) => {
  return { REDUX_APP_STATE: state[APP_LOGIN_STATE] || {} };
};

export default connect(mapStateToProps, {})(Login);
