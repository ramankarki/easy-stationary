import { Redirect } from 'react-router-dom';

import {
  APP_SIGNUP_STATE,
  APP_LOGIN_STATE,
  USER,
  APP_ACTIVATE_ACCOUNT_STATE,
  APP_FORGOT_PASSWORD_STATE,
  APP_RESET_PASSWORD_STATE,
  APP_RESEND_ACTIVATION_ACCOUNT_STATE,
} from '../actions/constants';
import { ROOT, RESET_PASSWORD } from '../Routes/contants';
import getErrorTag from '../utils/errorTags';
import queryString from '../utils/getQueryString';

import LazyImg from '../components/LazyImg';

const auth = {
  [APP_SIGNUP_STATE]: {
    postRoute: (redirectPath = ROOT) =>
      `/api/v1/auth/signup?redirect=${window.location.origin}/%23${redirectPath}`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return (
        <div className="modalBg__modalMsg">
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
    postRoute: () => `/api/v1/auth/login`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return <Redirect to={ROOT} />;
    },
    domainState: USER,
  },
  [APP_RESEND_ACTIVATION_ACCOUNT_STATE]: {
    postRoute: (redirectPath = ROOT) =>
      `/api/v1/auth/resend-activation-link?redirect=${window.location.origin}/%23${redirectPath}`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return (
        <div className="modalBg__modalMsg">
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
    postRoute: (redirectPath = ROOT) =>
      `/api/v1/auth/forgot-password?reset-password-page=${window.location.origin}/%23${RESET_PASSWORD}&redirect=${window.location.origin}/%23${redirectPath}`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return (
        <div className="modalBg__modalMsg">
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
    postRoute: () => `/api/v1/auth/reset-password/${queryString().token}`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return <Redirect to={queryString().redirect.split('#')[1]} />;
    },
    domainState: USER,
  },
};

export default auth;
