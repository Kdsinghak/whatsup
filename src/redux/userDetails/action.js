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
