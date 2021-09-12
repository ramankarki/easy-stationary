import { ORDERS, APP_ORDER_STATE } from '../actions/constants';
import getErrorTag from '../utils/errorTags';

const orders = {
  [APP_ORDER_STATE]: {
    getRoute: () => `/api/v1/orders`,
    postRoute: () => `/api/v1/orders`,
    patchRoute: (orderId) => `/api/v1/orders/${orderId}`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: ORDERS,
    dynamicState: true,
    noSuccessModal: true,
    noReset: true,
  },
};

export default orders;
