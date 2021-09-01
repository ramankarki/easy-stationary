const onArrayValueAdd =
  (UI_TYPE_CONSTANT, fieldName) => (dispatch, getState) => {
    const uiState = getState()[UI_TYPE_CONSTANT];
    const array = [...uiState[fieldName].value];
    const lastValue = array.pop().trim();

    if (lastValue) {
      dispatch({
        type: UI_TYPE_CONSTANT,
        payload: {
          ...uiState,
          [fieldName]: {
            ...uiState[fieldName],
            value: [...array, lastValue, ''],
          },
        },
      });
    }
  };

export default onArrayValueAdd;
