import { batch } from 'react-redux';

import API from '../utils/API';
import { CREATE } from './constants';

const onPost =
  (APP_STATE_TYPE, UI_STATE_TYPE, callback = () => {}, ...args) =>
  (dispatch, getState) => {
    const uiState = getState()[UI_STATE_TYPE];
    const appState = getState()[APP_STATE_TYPE];
    const { domainState, dynamicState, noSuccessModal, noReset } = appState;

    const password = getState()[UI_STATE_TYPE]['Password']?.value;

    let isSubmitable = true;

    // to check if validation fails onSubmit
    const newUIState = {};

    // to reset UI state onSubmit success
    const resetUIState = {};

    // to submit on API if form isSubmitable
    const apiData = {};

    // validate before submitting & collect data in new obj for API call
    for (let fieldName in uiState) {
      resetUIState[fieldName] = { ...uiState[fieldName], value: '' };

      let { value, dbProp } = uiState[fieldName];
      value = value.trim ? value.trim() : value;
      const checkValidation = !uiState[fieldName].validate(value, password);

      newUIState[fieldName] = {
        ...uiState[fieldName],
        validationFailed: checkValidation,
      };
      apiData[dbProp] = value;

      if (isSubmitable && checkValidation) isSubmitable = false;
    }

    if (isSubmitable) {
      // start ajax req
      dispatch({
        type: APP_STATE_TYPE,
        payload: { ...appState, requestStatus: appState.requestEnum.pending },
      });

      API()
        .post(appState.postRoute(...args), apiData)
        .then(({ data }) => {
          // save user data in localStorage
          if (appState.domainState === 'USER') {
            // add 90 days
            data.expiryDate = Date.now() + 7776000000 + '';
            localStorage.setItem('USER', JSON.stringify(data));
          }

          batch(() => {
            // dispatch USER domain data
            dispatch({
              type: dynamicState ? domainState + CREATE : domainState || '',
              payload: data,
            });

            dispatch({
              type: APP_STATE_TYPE,
              payload: {
                ...appState,
                requestStatus: noSuccessModal
                  ? null
                  : appState.requestEnum.postSuccess,
              },
            });

            // reset UI state
            if (!noReset)
              dispatch({
                type: UI_STATE_TYPE,
                payload: resetUIState,
              });

            // optional callback
            callback();
          });
        })
        .catch(({ response }) => {
          dispatch({
            type: APP_STATE_TYPE,
            payload: {
              ...appState,
              errorTag: response.data.message.split(':')[0],
              requestStatus: appState.requestEnum.failed,
            },
          });
        });
    } else {
      dispatch({ type: UI_STATE_TYPE, payload: newUIState });
    }
  };

export default onPost;
