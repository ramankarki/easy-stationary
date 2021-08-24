import { APP_SIGNUP_STATE } from '../actions/constants';
import { ALL_PRODUCTS } from '../Routes/contants';
import getErrorTag from './errorTags';

import LazyImg from '../components/LazyImg';

const appState = {
  [APP_SIGNUP_STATE]: {
    apiPath: (path = ALL_PRODUCTS) =>
      `/api/v1/auth/signup?redirect=${window.location.origin}${path}`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
      return (
        <div className="signup__modalMsg">
          <picture>
            <LazyImg src="/assets/check.svg" alt="success icon" />
          </picture>
          <p>
            Email has been sent! Please{' '}
            <a href="https://gmail.com" target="_blank" rel="noreferrer">
              activate
            </a>{' '}
            your account before you login.
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
