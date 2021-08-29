import auth from './auth';
import category from './category';

const appState = {
  ...auth,
  ...category,
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
