import { LOGIN, LOGOUT, SET_NAME, SET_PHOTO_URL } from "./UserActionTypes";

export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setName = (name) => ({
  type: SET_NAME,
  payload: name,
});

export const setReduxPhotoURL = (photoURL) => ({
  type: SET_PHOTO_URL,
  payload: photoURL,
});
