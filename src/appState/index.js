import auth from './auth';
import user from './user';
import category from './category';
import singleProduct from './singleProduct';
import singleCategoryProducts from './singleCategoryProducts';
import reviews from './reviews';

const appState = {
  ...auth,
  ...category,
  ...user,
  ...singleProduct,
  ...singleCategoryProducts,
  ...reviews,
};

const getAppState = (TYPE) => ({
  ...appState[TYPE],
  requestStatus: null,
  requestEnum: {
    pending: 'pending',
    failed: 'failed',
    postSuccess: 'postSuccess',
    patchSuccess: 'patchSuccess',
    deleteSuccess: 'deleteSuccess',
  },
});

export default getAppState;
