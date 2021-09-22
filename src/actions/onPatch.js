import { batch } from 'react-redux';

import API from '../utils/API';
import { UPDATE } from './constants';

const onPatch =
  (APP_STATE_TYPE, UI_STATE_TYPE, prevObj, callback, ...args) =>
  (dispatch, getState) => {
    const uiState = getState()[UI_STATE_TYPE];
    const appState = getState()[APP_STATE_TYPE];
    const { domainState, dynamicState, noPatchSuccessModal, noReset } =
      appState;

    const newPassword = getState()[UI_STATE_TYPE]['New password']?.value;

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
      const checkValidation = !uiState[fieldName].validate(value, newPassword);

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
        .patch(appState.patchRoute(...args), apiData)
        .then(({ data }) => {
          // save user data in localStorage
          if (appState.domainState === 'USER') {
            // add 90 days
            if (data.token) {
              data.expiryDate = Date.now() + 7776000000 + '';
              localStorage.setItem('USER', JSON.stringify(data));
            } else {
              const user = JSON.parse(localStorage.getItem('USER'));
              user.user = data.user;
              localStorage.setItem('USER', JSON.stringify(user));
            }
          }

          batch(() => {
            // dispatch USER domain data
            dispatch({
              type: dynamicState ? domainState + UPDATE : domainState || '',
              payload: dynamicState ? { prevObj, newObj: data } : data,
            });

            dispatch({
              type: APP_STATE_TYPE,
              payload: {
                ...appState,
                requestStatus: noPatchSuccessModal
                  ? null
                  : appState.requestEnum.patchSuccess,
              },
            });

            // reset UI state
            if (!noReset)
              dispatch({
                type: UI_STATE_TYPE,
                payload: resetUIState,
              });

            // optional callback func
            callback && callback();
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

export default onPatch;
