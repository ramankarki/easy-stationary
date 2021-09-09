import { CREATE, READ, UPDATE, DELETE, RESET } from '../actions/constants';
import sortArray from '../utils/sortArray';

const HOFdomainReducer =
  (TYPE, arrayProp, createProp, sortProp) =>
  (state = {}, action) => {
    switch (action.type) {
      case TYPE + CREATE:
        const arr = [...state[arrayProp], action.payload[createProp]];
        return { ...state, [arrayProp]: sortArray(arr, sortProp) };

      case TYPE + READ:
        state[arrayProp] = state[arrayProp] || [];
        const readArr = [...state[arrayProp], ...action.payload[arrayProp]];
        return {
          ...state,
          ...action.payload,
          [arrayProp]: sortArray(readArr, sortProp),
        };

      case TYPE + UPDATE:
        return;

      case TYPE + DELETE:
        return {
          ...state,
          [arrayProp]: state[arrayProp].filter((obj) => obj !== action.payload),
        };

      case TYPE + RESET:
        return action.payload;

      default:
        return state;
    }
  };

export default HOFdomainReducer;
