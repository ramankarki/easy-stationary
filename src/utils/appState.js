import { Redirect } from 'react-router-dom';

import {
  APP_SIGNUP_STATE,
  APP_LOGIN_STATE,
  USER,
  APP_ACTIVATE_ACCOUNT_STATE,
} from '../actions/constants';
import { ALL_PRODUCTS } from '../Routes/contants';
import getErrorTag from './errorTags';

import LazyImg from '../components/LazyImg';

const appState = {
  [APP_SIGNUP_STATE]: {
    apiPath: (path = ALL_PRODUCTS) =>
      `/api/v1/auth/signup?redirect=${window.location.origin}/%23${path}`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return (
        <div className="Form__modalMsg">
          <picture>
            <LazyImg src="/assets/check.svg" alt="success icon" />
          </picture>
          <p>
            Email has been sent! Please{' '}
            <a href="https://gmail.com" target="_blank" rel="noreferrer">
              activate
            </a>{' '}
            your account before you login. (Do check your promotions tab if you
            don't see any email at inbox)
          </p>
        </div>
      );
    },
  },
  [APP_LOGIN_STATE]: {
    apiPath: () => `/api/v1/auth/login`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return <Redirect to={ALL_PRODUCTS} />;
    },
    domainState: USER,
  },
  [APP_ACTIVATE_ACCOUNT_STATE]: {
    apiPath: (path = ALL_PRODUCTS) =>
      `/api/v1/auth/resend-activation-link?redirect=${window.location.origin}/%23${path}`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return (
        <div className="Form__modalMsg">
          <picture>
            <LazyImg src="/assets/check.svg" alt="success icon" />
          </picture>
          <p>
            Email has been sent! Please{' '}
            <a href="https://gmail.com" target="_blank" rel="noreferrer">
              activate
            </a>{' '}
            your account before you login. (Do check your promotions tab if you
            don't see any email at inbox)
          </p>
        </div>
      );
    },
  },
};

const getAppState = (TYPE) => ({
  ...appState[TYPE],
  requestStatus: null,
  requestEnum: { pending: 'pending', success: 'success', failed: 'failed' },
});

export default getAppState;
