const initialState = {
  userId: '',
};

export const userDetailsReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'ADD_DETAILS':
      return {...state, ...payload};
    default:
      return state;
  }
};
