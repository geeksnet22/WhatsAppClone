import { LOGIN, LOGOUT, SET_NAME } from "./UserActionTypes";

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
