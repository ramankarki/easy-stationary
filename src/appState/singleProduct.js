import { APP_SINGLE_PRODUCT_STATE, SINGLE_PRODUCT } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

import LazyImg from '../components/LazyImg';

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
        case 'postSuccess':
          return (
            <div className="modalBg__modalMsg">
              <picture>
                <LazyImg src="/assets/check.svg" alt="success icon" />
              </picture>
              <p>New product added successfully.</p>
            </div>
          );
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: SINGLE_PRODUCT,
  },
};

export default singleProduct;
