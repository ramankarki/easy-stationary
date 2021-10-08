import { APP_SINGLE_PRODUCT_STATE, SINGLE_PRODUCT } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const singleProduct = {
  [APP_SINGLE_PRODUCT_STATE]: {
    postRoute: (categoryName) => `/api/v1/single-product/${categoryName}`,
    getRoute: () => {
      const [categoryName, productId] = window.location.hash
        .split('/')
        .slice(1);
      return `/api/v1/single-product/${categoryName}/${productId}`;
    },
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: SINGLE_PRODUCT,
    noPostSuccessModal: true,
    noGetSuccessModal: true,
  },
};

export default singleProduct;
