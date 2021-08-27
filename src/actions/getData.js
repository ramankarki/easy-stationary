import { batch } from 'react-redux';

import API from '../utils/API';

const getData = (APP_STATE) => (dispatch, getState) => {
  const appState = getState()[APP_STATE];

  dispatch({
    type: APP_STATE,
    payload: { ...appState, requestStatus: 'pending' },
  });

  API.get(appState.apiPath())
    .then(({ data }) =>
      batch(() => {
        dispatch({ type: appState.domainState, payload: data });
        dispatch({
          type: APP_STATE,
          payload: { ...appState, requestStatus: null },
        });
      })
    )
    .catch(({ response }) =>
      dispatch({
        type: APP_STATE,
        payload: {
          ...appState,
          errorTag: response.data.message.split(':')[0],
          requestStatus: 'failed',
        },
      })
    );
};

export default getData;
