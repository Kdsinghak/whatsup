const initialState = {
  userId: '',
  alluserData: [],
  profileDetails: {},
};

export const userDetailsReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'ADD_DETAILS':
      return {...state, ...payload};
    case 'DELETE_DETAILS':
      return {...state, ...payload};
    case 'SAVE_ALL_USER_DATA':
      return {...state, ...payload};
    case 'SAVE_PROFILE':
      return {...state, ...payload};
    default:
      return state;
  }
};
