import { CATEGORY, APP_GET_CATEGORY_STATE } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const category = {
  [APP_GET_CATEGORY_STATE]: {
    apiPath: () => `/api/v1/category`,
    modalMsg: (requestStatus, errorTag) => {
      if (requestStatus === 'failed') return getErrorTag(errorTag);
    },
    domainState: CATEGORY,
  },
};

export default category;
