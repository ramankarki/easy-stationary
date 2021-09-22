import {
  APP_SINGLE_CATEGORY_PRODUCTS_STATE,
  MULTIPLE_PRODUCTS,
} from '../actions/constants';

const singleCategoryProducts = {
  [APP_SINGLE_CATEGORY_PRODUCTS_STATE]: {
    getRoute: (page, sort) => {
      const [categoryName] = window.location.hash.split('/').slice(1);
      return `/api/v1/category/${categoryName}?page=${page}&limit=9&sort=${sort}`;
    },
    domainState: MULTIPLE_PRODUCTS,
    dynamicState: true,
    noGetSuccessModal: true,
  },
};

export default singleCategoryProducts;
