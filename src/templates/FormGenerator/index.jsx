import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { injectReducer, ejectReducer } from '../../utils/dynamicReducers';
import onSubmit from '../../actions/onSubmit';
import resetAppState from '../../actions/resetAppState';
import HOFreducer from '../../reducers/HOFreducer';
import appState from '../../utils/appState';

import InputField from '../../components/InputField';
import LazyImg from '../../components/LazyImg';
import Button from '../../components/Button';
import RequestStatusModalBg from '../../templates/RequestStatusModalBg';
import SpinnerLoading from '../../components/SpinnerLoading';
import './formGenerator.scss';

function FormGenerator(props) {
  const {
    fieldsObj,
    UI_STATE,
    APP_STATE,
    REDUX_APP_STATE,
    redirect,
    redirectMsg,
    topLogo,
    formHeading,
    buttonValue,
  } = props;
  const { modalMsg, requestStatus, errorTag } = REDUX_APP_STATE;

  injectReducer(UI_STATE, HOFreducer(UI_STATE, fieldsObj));
  injectReducer(APP_STATE, HOFreducer(APP_STATE, appState(APP_STATE)));
  useEffect(
    () => () => {
      ejectReducer(UI_STATE);
      ejectReducer(APP_STATE);
    },
    [UI_STATE, APP_STATE]
  );

  const formElements = (fieldsObj, TYPE) =>
    Object.keys(fieldsObj).map((fieldName) => (
      <InputField
        key={fieldName}
        TYPE={TYPE}
        labelName={fieldName}
        dbProp={fieldsObj[fieldName].dbProp}
      />
    ));

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(APP_STATE, UI_STATE);
  };

  const onModalExit = () => props.resetAppState(APP_STATE, appState(APP_STATE));

  const LinkStyle = {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#2b4775',
  };

  return (
    <div className="Form">
      {topLogo && (
        <picture className="Form__logo">
          <LazyImg
            src="/assets/Easy Stationary Logo.webp"
            alt="Easy Stationary Logo"
          />
        </picture>
      )}
      <section className="Form__section">
        <h1 className="Form__heading">{formHeading}</h1>
        <form onSubmit={onSubmitHandler} className="Form__form">
          {formElements(fieldsObj, UI_STATE)}
          <Button value={buttonValue} />
        </form>
        {redirect && (
          <Link to={redirect} style={LinkStyle}>
            {redirectMsg}
          </Link>
        )}
      </section>
      {requestStatus && (
        <RequestStatusModalBg
          requestStatus={requestStatus}
          onExit={onModalExit}
        >
          {requestStatus === 'pending' ? (
            <SpinnerLoading />
          ) : (
            modalMsg(requestStatus, errorTag)
          )}
        </RequestStatusModalBg>
      )}
    </div>
  );
}

export default connect(null, { onSubmit, resetAppState })(FormGenerator);
