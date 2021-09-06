import {
  APP_MULTIPLE_PRODUCTS_STATE,
  MULTIPLE_PRODUCTS,
} from '../actions/constants';

const singleProducts = {
  [APP_MULTIPLE_PRODUCTS_STATE]: {
    getRoute: (categoryName) => `/api/v1/category/${categoryName}`,
    domainState: MULTIPLE_PRODUCTS,
    dynamicState: true,
  },
};

export default singleProducts;
