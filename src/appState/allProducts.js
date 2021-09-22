import {
  APP_ALL_PRODUCTS_STATE,
  MULTIPLE_PRODUCTS,
} from '../actions/constants';

const singleCategoryProducts = {
  [APP_ALL_PRODUCTS_STATE]: {
    getRoute: (page, sort = '') =>
      `/api/v1/all-products?page=${page}&limit=9&sort=${sort}`,
    domainState: MULTIPLE_PRODUCTS,
    dynamicState: true,
    noGetSuccessModal: true,
  },
};

export default singleCategoryProducts;
