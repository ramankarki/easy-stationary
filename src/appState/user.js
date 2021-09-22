import {
  USER,
  APP_USER_STATE,
  APP_USER_EMAIL_UPDATE_STATE,
  APP_USER_PASSWORD_UPDATE_STATE,
  APP_USER_PROFILE_UPDATE_STATE,
} from '../actions/constants';
import getErrorTag from '../utils/errorTags';
import { ADMIN_SETTINGS } from '../Routes/contants';

import LazyImg from '../components/LazyImg';

const user = {
  [APP_USER_STATE]: {
    getRoute: () => `/api/v1/user/me`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: USER,
    noGetSuccessModal: true,
  },
  [APP_USER_EMAIL_UPDATE_STATE]: {
    postRoute: () =>
      `/api/v1/user/req-update-email?user-settings-page=${window.location.origin}/%23${ADMIN_SETTINGS}`,
    noReset: true,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        case 'postSuccess':
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
                your email to update. (Do check your promotions tab if you don't
                see any email at inbox)
              </p>
            </div>
          );
        default:
          return getErrorTag(errorTag);
      }
    },
  },
  [APP_USER_PASSWORD_UPDATE_STATE]: {
    patchRoute: () => `/api/v1/user/update-password`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        case 'patchSuccess':
          return (
            <div className="modalBg__modalMsg">
              <picture>
                <img src="/assets/check.svg" alt="success icon" />
              </picture>
              <p>Password changed successfuly!</p>
            </div>
          );
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: USER,
  },

  [APP_USER_PROFILE_UPDATE_STATE]: {
    patchRoute: () => `/api/v1/user/update-profile`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        case 'patchSuccess':
          return (
            <div className="modalBg__modalMsg">
              <picture>
                <img src="/assets/check.svg" alt="success icon" />
              </picture>
              <p>Profile data updated successfully!</p>
            </div>
          );
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: USER,
    noReset: true,
  },
};

export default user;
