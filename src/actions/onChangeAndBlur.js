const onChangeAndBlur =
  (
    TYPE,
    field,
    value,
    reTypeCompareValue = 'Password',
    eventType = 'onChange'
  ) =>
  (dispatch, getState) => {
    const state = getState()[TYPE];
    const password = state[reTypeCompareValue]?.value;
    const fieldState = state[field];

    if (eventType === 'onBlur') value = value.trim();

    let validationFailed = false;
    if (fieldState.validationFailed || eventType === 'onBlur') {
      validationFailed = !fieldState.validate(value, password);
    }

    dispatch({
      type: TYPE,
      payload: {
        ...state,
        [field]: { ...state[field], value, validationFailed },
      },
    });
  };

export default onChangeAndBlur;
