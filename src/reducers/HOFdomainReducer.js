import { CREATE, READ, UPDATE, DELETE, RESET } from '../actions/constants';
import sortArray from '../utils/sortArray';

const HOFdomainReducer =
  (TYPE, arrayProp, createProp, sortProp) =>
  (state = {}, action) => {
    switch (action.type) {
      case TYPE + CREATE:
        state[arrayProp] = state[arrayProp] || [];
        const arr = [action.payload[createProp], ...state[arrayProp]];
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
        return {
          ...state,
          [arrayProp]: state[arrayProp].map((obj) =>
            obj === action.payload.prevObj
              ? action.payload.newObj[createProp]
              : obj
          ),
        };

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
