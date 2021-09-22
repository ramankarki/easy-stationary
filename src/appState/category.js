import { CATEGORY, APP_CATEGORY_STATE } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const category = {
  [APP_CATEGORY_STATE]: {
    getRoute: () => `/api/v1/category`,
    postRoute: () => `/api/v1/category`,
    deleteRoute: (categoryName) => `/api/v1/category/${categoryName}`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: CATEGORY,
    dynamicState: true,
    noGetSuccessModal: true,
    noPostSuccessModal: true,
    noDeleteSuccessModal: true,
  },
};

export default category;
