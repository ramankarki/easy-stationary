import { APP_WISHLISTS_STATE, WISHLISTS } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const wishlists = {
  [APP_WISHLISTS_STATE]: {
    getRoute: (categoryName, productId) =>
      `/api/v1/single-product/${categoryName}/${productId}`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: WISHLISTS,
    noGetSuccessModal: true,
  },
};

export default wishlists;
