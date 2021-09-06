import {
  APP_SINGLE_CATEGORY_PRODUCTS_STATE,
  MULTIPLE_PRODUCTS,
} from '../actions/constants';

const singleCategoryProducts = {
  [APP_SINGLE_CATEGORY_PRODUCTS_STATE]: {
    getRoute: () => {
      const [categoryName] = window.location.hash.split('/').slice(1);
      return `/api/v1/category/${categoryName}`;
    },
    domainState: MULTIPLE_PRODUCTS,
    dynamicState: true,
  },
};

export default singleCategoryProducts;
