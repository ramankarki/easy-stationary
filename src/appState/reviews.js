import { APP_REVIEWS_STATE, REVIEWS } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const reviews = {
  [APP_REVIEWS_STATE]: {
    postRoute: () => `/api/v1/reviews`,
    getRoute: (productId, page, sort, userReview) =>
      userReview
        ? `/api/v1/reviews/user?page=${page}&limit=9&sort=${sort}`
        : `/api/v1/reviews/product/${productId}?page=${page}&limit=9&sort=${sort}`,
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
    noGetSuccessModal: true,
    noPostSuccessModal: true,
    noPatchSuccessModal: true,
    noReset: true,
  },
};

export default reviews;
