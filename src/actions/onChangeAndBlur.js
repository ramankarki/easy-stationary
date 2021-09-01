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

    if (field.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = (event) =>
        dispatch({
          type: TYPE,
          payload: {
            ...state,
            [field]: {
              ...state[field],
              value,
              validationFailed,
              base64: event.target.result,
            },
          },
        });
    }
  };

export default onChangeAndBlur;
