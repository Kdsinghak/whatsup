export const requestConfirmUid = (uid, otp, sucess, error) => {
  return {type: 'CONFIRM_UID', uid, otp, sucess, error};
};

export const saveData = uid => {
  return {type: 'ADD_DETAILS', payload: {userId: uid}};
};
