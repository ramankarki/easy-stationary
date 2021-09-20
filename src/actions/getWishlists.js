import { batch } from 'react-redux';

import { APP_WISHLISTS_STATE, WISHLISTS } from './constants';
import appState from '../appState';
import API from '../utils/API';

const getWishlists = () => async (dispatch, getState) => {
  const wishlistsAppState = getState()[APP_WISHLISTS_STATE];
  const wishlists = JSON.parse(localStorage.getItem('WISHLISTS')) || {};
  const wishlistsKeys = Object.keys(wishlists);

  if (!wishlistsKeys.length) return;

  const productPromises = wishlistsKeys.map((productId) => {
    return API().get(
      wishlistsAppState.getRoute(wishlists[productId], productId)
    );
  });

  dispatch({
    type: APP_WISHLISTS_STATE,
    payload: { ...appState(APP_WISHLISTS_STATE), requestStatus: 'pending' },
  });

  try {
    const res = await Promise.all(productPromises);
    const products = res.map(({ data }) => ({
      ...data.product,
      quantity: undefined,
    }));

    batch(() => {
      dispatch({
        type: APP_WISHLISTS_STATE,
        payload: { ...appState(APP_WISHLISTS_STATE), requestStatus: null },
      });
      dispatch({
        type: WISHLISTS,
        payload: products,
      });
    });
  } catch ({ response }) {
    dispatch({
      type: APP_WISHLISTS_STATE,
      errorTag: response.data.message.split(':')[0],
      payload: { ...appState(APP_WISHLISTS_STATE), requestStatus: 'failed' },
    });
  }
};

export default getWishlists;
