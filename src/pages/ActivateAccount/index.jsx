import { connect } from 'react-redux';

import {
  UI_ACTIVATE_ACCOUNT_STATE,
  APP_ACTIVATE_ACCOUNT_STATE,
  USER,
} from '../../actions/constants';
import fields from '../../utils/fields';
import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';

import FormGenerator from '../../templates/FormGenerator';

function Login(props) {
  const { REDUX_APP_STATE } = props;
  const loginFields = fields('Email');

  injectReducer(USER, HOFreducer(USER, {}));

  return (
    <FormGenerator
      formHeading="Activate Account"
      buttonValue="Send Email"
      fieldsObj={loginFields}
      UI_STATE={UI_ACTIVATE_ACCOUNT_STATE}
      APP_STATE={APP_ACTIVATE_ACCOUNT_STATE}
      REDUX_APP_STATE={REDUX_APP_STATE}
      topLogo
    />
  );
}

const mapStateToProps = (state) => {
  return { REDUX_APP_STATE: state[APP_ACTIVATE_ACCOUNT_STATE] || {} };
};

export default connect(mapStateToProps, {})(Login);
