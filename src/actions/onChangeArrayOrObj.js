const onChangeArrayOrObj =
  (UI_TYPE_CONSTANT, fieldName, key, value) => (dispatch, getState) => {
    const uiState = getState()[UI_TYPE_CONSTANT];
    let dupValueObj = [...uiState[fieldName].value];

    dupValueObj[key] = value;

    dispatch({
      type: UI_TYPE_CONSTANT,
      payload: {
        ...uiState,
        [fieldName]: { ...uiState[fieldName], value: dupValueObj },
      },
    });
  };

export default onChangeArrayOrObj;
