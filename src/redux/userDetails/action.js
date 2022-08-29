export const requestConfirmUid = (uid, otp, sucess, error) => {
  return {type: 'CONFIRM_UID', uid, otp, sucess, error};
};

export const saveData = uid => {
  return {type: 'ADD_DETAILS', payload: {userId: uid}};
};

export const deleteData = () => {
  return {type: 'DELETE_DETAILS', payload: {userId: ''}};
};

export const requestDeleteUid = () => {
  return {type: 'REQUEST_DELETE_UID'};
};

export const requestDataAllUsers = (uid, success, error) => {
  return {type: 'REQUEST_ALL_USER', uid, success, error};
};

export const saveAllUserData = data => {
  return {type: 'SAVE_ALL_USER_DATA', payload: {alluserData: data}};
};
