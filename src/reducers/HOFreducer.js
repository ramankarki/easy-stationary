const HOFreducer =
  (TYPE, initialState) =>
  (state = initialState, action) => {
    switch (action.type) {
      case TYPE:
        return action.payload;
      default:
        return state;
    }
  };

export default HOFreducer;
