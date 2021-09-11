import { APP_SHOPPING_CART_STATE, SHOPPING_CART } from '../actions/constants';
import getErrorTag from '../utils/errorTags';
import LazyImg from '../components/LazyImg';

const shoppingCart = {
  [APP_SHOPPING_CART_STATE]: {
    postRoute: () => '/api/v1/shopping-cart',
    getRoute: () => '/api/v1/shopping-cart',
    deleteRoute: (productId) => `/api/v1/shopping-cart/${productId}`,
    modalMsg: (requestStatus, errorTag) => {
      switch (requestStatus) {
        case 'postSuccess':
          return (
            <div className="modalBg__modalMsg">
              <picture>
                <LazyImg src="/assets/check.svg" alt="success icon" />
              </picture>
              <p>Product added to cart.</p>
            </div>
          );
        case 'deleteSuccess':
          return (
            <div className="modalBg__modalMsg">
              <picture>
                <LazyImg src="/assets/check.svg" alt="success icon" />
              </picture>
              <p>Product removed from cart.</p>
            </div>
          );
        default:
          return getErrorTag(errorTag);
      }
    },
    domainState: SHOPPING_CART,
    noReset: true,
  },
};

export default shoppingCart;
