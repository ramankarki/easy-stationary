import errorHandler from '../actions/errorHandler';

const asyncWrapper = (fn) => (dispatch, getState) =>
  fn(dispatch, getState).catch((err) => errorHandler(dispatch, err));

export default asyncWrapper;
