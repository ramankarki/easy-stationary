import { ORDERS, APP_ORDER_STATE } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const orders = {
  [APP_ORDER_STATE]: {
    getRoute: (page, sort, filter) =>
      `/api/v1/orders?page=${page}&limit=6&sort=${sort}&filter=${filter}`,
    postRoute: () => `/api/v1/orders`,
    patchRoute: (orderId) => {
      const { user } = JSON.parse(localStorage.getItem('USER'));
      return user.role === 'client'
        ? `/api/v1/orders/${orderId}`
        : `/api/v1/orders/admin/${orderId}`;
    },
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: ORDERS,
    dynamicState: true,
    noGetSuccessModal: true,
    noPostSuccessModal: true,
    noPatchSuccessModal: true,
    noReset: true,
  },
};

export default orders;
