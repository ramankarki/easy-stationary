import auth from './auth';
import category from './category'

const appState = {
  ...auth,
  ...category
};

const getAppState = (TYPE) => ({
  ...appState[TYPE],
  requestStatus: null,
  requestEnum: { pending: 'pending', success: 'success', failed: 'failed' },
});

export default getAppState;
