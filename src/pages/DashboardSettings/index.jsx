import { useEffect } from 'react';
import { connect } from 'react-redux';

import fields from '../../utils/fields';
import {
  APP_USER_EMAIL_UPDATE_STATE,
  APP_USER_PASSWORD_UPDATE_STATE,
  APP_USER_PROFILE_UPDATE_STATE,
  UI_USER_EMAIL_UPDATE_STATE,
  UI_USER_PASSWORD_UPDATE_STATE,
  UI_USER_PROFILE_UPDATE_STATE,
} from '../../actions/constants';
import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';
import appState from '../../appState';
import onPost from '../../actions/onPost';
import onPatch from '../../actions/onPatch';

import Button from '../../components/Button';
import UpdateForm from '../../templates/UpdateForm';
import ClientDashboard from '../../templates/ClientDashboard';

import './dashboardSettings.scss';

function DashboardSettings(props) {
  useEffect(() => {
    injectReducer(
      APP_USER_PROFILE_UPDATE_STATE,
      HOFreducer(
        APP_USER_PROFILE_UPDATE_STATE,
        appState(APP_USER_PROFILE_UPDATE_STATE)
      )
    );
    injectReducer(
      APP_USER_EMAIL_UPDATE_STATE,
      HOFreducer(
        APP_USER_EMAIL_UPDATE_STATE,
        appState(APP_USER_EMAIL_UPDATE_STATE)
      )
    );
    injectReducer(
      APP_USER_PASSWORD_UPDATE_STATE,
      HOFreducer(
        APP_USER_PASSWORD_UPDATE_STATE,
        appState(APP_USER_PASSWORD_UPDATE_STATE)
      )
    );

    return () => {
      ejectReducer(APP_USER_PROFILE_UPDATE_STATE);
      ejectReducer(APP_USER_EMAIL_UPDATE_STATE);
      ejectReducer(APP_USER_PASSWORD_UPDATE_STATE);
    };
  }, []);

  const updateFields = fields(
    'First name',
    'Last name',
    'Phone number',
    'Full address'
  );

  const emailField = fields('Email');
  const passwordField = fields(
    'Current password',
    'New password',
    'Re-type password'
  );

  const onProfileSubmit = (event) => {
    event.preventDefault();
    props.onPatch(APP_USER_PROFILE_UPDATE_STATE, UI_USER_PROFILE_UPDATE_STATE);
  };

  const onEmailSubmit = (event) => {
    event.preventDefault();
    props.onPost(APP_USER_EMAIL_UPDATE_STATE, UI_USER_EMAIL_UPDATE_STATE);
  };

  const onPasswordSubmit = (event) => {
    event.preventDefault();
    props.onPatch(
      APP_USER_PASSWORD_UPDATE_STATE,
      UI_USER_PASSWORD_UPDATE_STATE
    );
  };

  return (
    <ClientDashboard heading="Settings">
      <div className="dashboardSettings">
        <UpdateForm
          UI_STATE={UI_USER_PROFILE_UPDATE_STATE}
          APP_STATE={APP_USER_PROFILE_UPDATE_STATE}
          fields={updateFields}
          appState={props.APP_USER_PROFILE_UPDATE_STATE || {}}
          user={props.USER.user}
          onSubmitHandler={onProfileSubmit}
          buttonvalue="Update profile"
        />
        <hr />
        <UpdateForm
          UI_STATE={UI_USER_EMAIL_UPDATE_STATE}
          APP_STATE={APP_USER_EMAIL_UPDATE_STATE}
          fields={emailField}
          appState={props.APP_USER_EMAIL_UPDATE_STATE || {}}
          user={props.USER.user}
          onSubmitHandler={onEmailSubmit}
          flex="true"
          buttonvalue="Update email"
        />
        <hr />
        <UpdateForm
          UI_STATE={UI_USER_PASSWORD_UPDATE_STATE}
          APP_STATE={APP_USER_PASSWORD_UPDATE_STATE}
          fields={passwordField}
          appState={props.APP_USER_PASSWORD_UPDATE_STATE || {}}
          user={props.USER.user}
          onSubmitHandler={onPasswordSubmit}
          flex="true"
          buttonvalue="Update password"
        />
      </div>
    </ClientDashboard>
  );
}

const mapStateToProps = ({
  APP_USER_PROFILE_UPDATE_STATE,
  USER,
  APP_USER_EMAIL_UPDATE_STATE,
  APP_USER_PASSWORD_UPDATE_STATE,
}) => ({
  APP_USER_PROFILE_UPDATE_STATE,
  USER,
  APP_USER_EMAIL_UPDATE_STATE,
  APP_USER_PASSWORD_UPDATE_STATE,
});

export default connect(mapStateToProps, { onPost, onPatch })(DashboardSettings);
