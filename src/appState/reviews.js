import { APP_REVIEWS_STATE, REVIEWS } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const reviews = {
  [APP_REVIEWS_STATE]: {
    postRoute: () => `/api/v1/reviews`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        case 'postSuccess':
          return;
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: REVIEWS,
    dynamicState: true,
  },
};

export default reviews;
