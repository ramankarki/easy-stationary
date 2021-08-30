import { useEffect } from 'react';
import { connect } from 'react-redux';

import { SIGNUP, FORGOT_PASSWORD } from '../../Routes/contants';
import { UI_LOGIN_STATE, APP_LOGIN_STATE, USER } from '../../actions/constants';
import fields from '../../utils/fields';
import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';

import FormGenerator from '../../templates/FormGenerator';

function Login(props) {
  const { REDUX_APP_STATE } = props;
  const loginFields = fields('Email', 'Password');

  useEffect(() => injectReducer(USER, HOFreducer(USER, {})), []);

  const forgotPasswordLinkStyle = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#2b4775',
    gridColumn: 'span 2',
    width: 'max-content',
    marginLeft: 'auto',
  };

  return (
    <FormGenerator
      formHeading="Login"
      buttonValue="Login"
      fieldsObj={loginFields}
      UI_STATE={UI_LOGIN_STATE}
      APP_STATE={APP_LOGIN_STATE}
      REDUX_APP_STATE={REDUX_APP_STATE}
      redirect={SIGNUP}
      forgotPassword={FORGOT_PASSWORD}
      forgotPasswordLinkStyle={forgotPasswordLinkStyle}
      redirectMsg="New to Easy Stationary? Create Account"
      topLogo
    />
  );
}

const mapStateToProps = (state) => ({
  REDUX_APP_STATE: state[APP_LOGIN_STATE] || {},
});

export default connect(mapStateToProps, {})(Login);
