import { APP_SEARCH_STATE, MULTIPLE_PRODUCTS } from '../actions/constants';

const search = {
  [APP_SEARCH_STATE]: {
    getRoute: (page, sort = '', q) =>
      `/api/v1/all-products/search?q=${q}&page=${page}&limit=9&sort=${sort}`,
    domainState: MULTIPLE_PRODUCTS,
    dynamicState: true,
    noGetSuccessModal: true,
  },
};

export default search;
