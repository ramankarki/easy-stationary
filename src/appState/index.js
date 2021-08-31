import auth from './auth';
import user from './user';
import category from './category';
import singleProduct from './singleProduct';

const appState = {
  ...auth,
  ...category,
  ...user,
  ...singleProduct,
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
