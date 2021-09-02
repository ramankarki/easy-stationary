import { UI_SINGLE_PRODUCT_STATE } from './constants';

const onArrElementDel = (fieldName, index) => (dispatch, getState) => {
  const uiState = getState()[UI_SINGLE_PRODUCT_STATE];
  const array = uiState[fieldName].value;
  const value = [...array.slice(0, index), ...array.slice(index + 1)];
  console.log(array, value);

  dispatch({
    type: UI_SINGLE_PRODUCT_STATE,
    payload: {
      ...uiState,
      [fieldName]: {
        ...uiState[fieldName],
        value,
      },
    },
  });
};

export default onArrElementDel;
