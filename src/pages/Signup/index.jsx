import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { LOGIN } from '../../Routes/contants';
import { injectReducer, ejectReducer } from '../../utils/dynamicReducers';
import { UI_SIGNUP_STATE, APP_SIGNUP_STATE } from '../../actions/constants';
import onSubmit from '../../actions/onSubmit';
import HOFreducer from '../../reducers/HOFreducer';
import fields from '../../utils/fields';
import appState from '../../utils/appState';

import LazyImg from '../../components/LazyImg';
import AuthFormElements from '../../templates/AuthFormElements';
import Button from '../../components/Button';
import './signup.scss';

function Signup(props) {
  const signupFields = fields(
    'First name',
    'Last name',
    'Phone number',
    'Full address',
    'Email',
    'Password',
    'Re-type password'
  );

  useEffect(() => {
    injectReducer(UI_SIGNUP_STATE, HOFreducer(UI_SIGNUP_STATE, signupFields));
    injectReducer(
      APP_SIGNUP_STATE,
      HOFreducer(APP_SIGNUP_STATE, appState(APP_SIGNUP_STATE))
    );
    return () => {
      ejectReducer(UI_SIGNUP_STATE);
      ejectReducer(APP_SIGNUP_STATE);
    };
  }, [signupFields]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    props.onSubmit(APP_SIGNUP_STATE, UI_SIGNUP_STATE);
  };

  const LinkStyle = {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#2b4775',
  };

  return (
    <div className="signup">
      <picture className="signup__logo">
        <LazyImg
          src="/assets/Easy Stationary Logo.webp"
          alt="Easy Stationary Logo"
        />
      </picture>
      <section className="signup__section">
        <h1 className="signup__heading">Create account</h1>
        <form onSubmit={onSubmitHandler} className="signup__form">
          <AuthFormElements fields={signupFields} TYPE={UI_SIGNUP_STATE} />
          <Button value="Create account" />
        </form>
        <Link to={LOGIN} style={LinkStyle}>
          Already have an account? Login
        </Link>
      </section>
    </div>
  );
}

export default connect(null, { onSubmit })(Signup);
