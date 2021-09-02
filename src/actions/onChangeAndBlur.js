const reader = new FileReader();

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
      let base64;
      if (value) {
        // read and dispatch in client side
        reader.readAsDataURL(value);
        reader.onload = (event) => {
          base64 = event.target.result;
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
        };

        // upload image in cloudinary
        const formData = new FormData();
        formData.append('file', value);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESIST);
        fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )
          .then((res) => res.json())
          .then(({ secure_url }) => {
            dispatch({
              type: TYPE,
              payload: {
                ...state,
                [field]: {
                  ...state[field],
                  value,
                  validationFailed,
                  base64,
                  src: secure_url,
                },
              },
            });
          });
      } else {
        dispatch({
          type: TYPE,
          payload: {
            ...state,
            [field]: {
              ...state[field],
              value: '',
              validationFailed,
              base64: undefined,
            },
          },
        });
      }
    }
  };

export default onChangeAndBlur;
