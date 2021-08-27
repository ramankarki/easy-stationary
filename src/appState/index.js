import auth from './auth';

const appState = {
  ...auth,
};

const getAppState = (TYPE) => ({
  ...appState[TYPE],
  requestStatus: null,
  requestEnum: { pending: 'pending', success: 'success', failed: 'failed' },
});

export default getAppState;
