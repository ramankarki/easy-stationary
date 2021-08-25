import { Redirect } from 'react-router-dom';

import {
  APP_SIGNUP_STATE,
  APP_LOGIN_STATE,
  USER,
  APP_ACTIVATE_ACCOUNT_STATE,
  APP_FORGOT_PASSWORD_STATE,
  APP_RESET_PASSWORD_STATE,
} from '../actions/constants';
import { ALL_PRODUCTS, RESET_PASSWORD } from '../Routes/contants';
import getErrorTag from './errorTags';
import queryString from './getQueryString';

import LazyImg from '../components/LazyImg';

const appState = {
  [APP_SIGNUP_STATE]: {
    apiPath: (redirectPath = ALL_PRODUCTS) =>
      `/api/v1/auth/signup?redirect=${window.location.origin}/%23${redirectPath}`,
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
    apiPath: (redirectPath = ALL_PRODUCTS) =>
      `/api/v1/auth/resend-activation-link?redirect=${window.location.origin}/%23${redirectPath}`,
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
  [APP_FORGOT_PASSWORD_STATE]: {
    apiPath: (redirectPath = ALL_PRODUCTS) =>
      `/api/v1/auth/forgot-password?reset-password-page=${window.location.origin}/%23${RESET_PASSWORD}&redirect=${window.location.origin}/%23${redirectPath}`,
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
              confirm
            </a>{' '}
            your account before you reset your password. (Do check your
            promotions tab if you don't see any email at inbox)
          </p>
        </div>
      );
    },
  },
  [APP_RESET_PASSWORD_STATE]: {
    apiPath: () => `/api/v1/auth/reset-password/${queryString().token}`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return <Redirect to={queryString().redirect.split('#')[1]} />;
    },
  },
};

const getAppState = (TYPE) => ({
  ...appState[TYPE],
  requestStatus: null,
  requestEnum: { pending: 'pending', success: 'success', failed: 'failed' },
});

export default getAppState;
