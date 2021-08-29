import { USER, APP_USER_STATE } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const user = {
  [APP_USER_STATE]: {
    getRoute: () => `/api/v1/user/me`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        case 'patchSuccess':
          return;
        case 'deleteSuccess':
          return;
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: USER,
  },
};

export default user;
