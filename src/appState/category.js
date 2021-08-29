import { CATEGORY, APP_CATEGORY_STATE } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const category = {
  [APP_CATEGORY_STATE]: {
    getRoute: () => `/api/v1/category`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        case 'postSuccess':
          return;
        case 'patchSuccess':
          return;
        case 'deleteSuccess':
          return;
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: CATEGORY,
  },
};

export default category;
