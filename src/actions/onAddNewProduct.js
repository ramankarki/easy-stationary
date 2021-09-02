import { batch } from 'react-redux';

import API from '../utils/API';
import { UI_SINGLE_PRODUCT_STATE, APP_SINGLE_PRODUCT_STATE } from './constants';

// directly pass this func to onSubmit
const unCommonFields = [
  'First image',
  'Second image',
  'Third image',
  'Product specification key',
  'Product specification value',
];

const addNewProduct = () => (dispatch, getState) => {
  const uiState = getState()[UI_SINGLE_PRODUCT_STATE];
  const appState = getState()[APP_SINGLE_PRODUCT_STATE];
  const data = {};

  for (let field in uiState) {
    // imageUrl
    if (field.includes('image')) {
      data['imageUrl'] = data['imageUrl'] || [];
      if (uiState[field].src) {
        data['imageUrl'].push(...data['imageUrl'], uiState[field].src);
      }
    }

    // other fields
    if (!unCommonFields.includes(field)) {
      data[uiState[field].dbProp] = uiState[field].value;
    }
  }

  data['productSpecification'] = {};
  uiState['Product specification key'].value.forEach((key, index) => {
    data['productSpecification'] = {
      ...data['productSpecification'],
      [key]: uiState['Product specification value'].value[index],
    };
  });

  dispatch({
    type: APP_SINGLE_PRODUCT_STATE,
    payload: { ...appState, requestStatus: appState.requestEnum.pending },
  });

  API.post(appState.postRoute(data.categoryName), data)
    .then(({ data }) => {
      batch(() => {
        // dispatch USER domain data
        dispatch({
          type: 'SINGLE_PRODUCT',
          payload: data,
        });

        dispatch({
          type: APP_SINGLE_PRODUCT_STATE,
          payload: {
            ...appState,
            requestStatus: appState.requestEnum.postSuccess,
          },
        });
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: APP_SINGLE_PRODUCT_STATE,
        payload: {
          ...appState,
          errorTag: response.data.message.split(':')[0],
          requestStatus: appState.requestEnum.failed,
        },
      });
    });
};

export default addNewProduct;
