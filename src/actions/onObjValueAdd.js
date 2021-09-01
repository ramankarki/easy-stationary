const onObjValueAdd = (UI_TYPE_CONSTANT, fieldName) => (dispatch, getState) => {
  const uiState = getState()[UI_TYPE_CONSTANT];
  const keyArray = [...uiState[fieldName + ' key'].value];
  const valueArray = [...uiState[fieldName + ' value'].value];

  const lastKeyValue = keyArray.pop().trim();
  const lastValValue = valueArray.pop().trim();

  if (lastKeyValue && lastValValue) {
    dispatch({
      type: UI_TYPE_CONSTANT,
      payload: {
        ...uiState,
        [fieldName + ' key']: {
          ...uiState[fieldName],
          value: [...keyArray, lastKeyValue, ''],
        },
        [fieldName + ' value']: {
          ...uiState[fieldName],
          value: [...valueArray, lastValValue, ''],
        },
      },
    });
  }
};

export default onObjValueAdd;
