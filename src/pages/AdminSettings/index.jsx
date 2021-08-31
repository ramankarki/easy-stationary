import { connect } from 'react-redux';

import onPost from '../../actions/onPost';
import onPatch from '../../actions/onPatch';
import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';
import appState from '../../appState';
import fields from '../../utils/fields';

import AdminPageTemplate from '../../templates/AdminPageTemplate';
import UpdateForm from '../../templates/UpdateForm';
import Button from '../../components/Button';

import {
  UI_USER_EMAIL_UPDATE_STATE,
  APP_USER_EMAIL_UPDATE_STATE,
  UI_USER_PASSWORD_UPDATE_STATE,
  APP_USER_PASSWORD_UPDATE_STATE,
} from '../../actions/constants';

import './adminSettings.scss';

function AdminSettings(props) {
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

  const emailField = fields('Email');
  const passwordField = fields(
    'Current password',
    'New password',
    'Re-type password'
  );

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
    <AdminPageTemplate heading="Settings">
      <div className="updateForms">
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
        <hr />
        <Button
          style={{ width: 'max-content' }}
          value="Delete account"
          danger="true"
        />
      </div>
    </AdminPageTemplate>
  );
}

const mapStateToProps = ({
  APP_USER_EMAIL_UPDATE_STATE,
  APP_USER_PASSWORD_UPDATE_STATE,
  USER,
}) => ({ APP_USER_EMAIL_UPDATE_STATE, APP_USER_PASSWORD_UPDATE_STATE, USER });

export default connect(mapStateToProps, { onPost, onPatch })(AdminSettings);
