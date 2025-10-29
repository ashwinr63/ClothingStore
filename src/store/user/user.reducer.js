import { createSlice } from '@reduxjs/toolkit';

export const USER_INITIAL_STATE = {
  currentUser: null,
};

// Helper to extract serializable user data
const extractUserData = (user) => {
  if (!user) return null;
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
};


const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = extractUserData(action.payload);
    },
  },
});


export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;