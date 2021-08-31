import { CREATE, READ, UPDATE, DELETE } from '../actions/constants';
import sortArray from '../utils/sortArray';

const HOFdomainReducer =
  (TYPE, arrayProp, createProp, sortProp) =>
  (state = {}, action) => {
    switch (action.type) {
      case TYPE + CREATE:
        const arr = [...state[arrayProp], action.payload[createProp]];
        if (sortProp)
          return { ...state, [arrayProp]: sortArray(arr, sortProp) };
        return { ...state, [arrayProp]: arr };

      case TYPE + READ:
        action.payload[arrayProp] = sortArray(
          action.payload[arrayProp],
          sortProp
        );
        return action.payload;

      case TYPE + UPDATE:
        return;

      case TYPE + DELETE:
        return {
          ...state,
          [arrayProp]: state[arrayProp].filter((obj) => obj !== action.payload),
        };

      default:
        return state;
    }
  };

export default HOFdomainReducer;
