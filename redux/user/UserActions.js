import { LOGIN, LOGOUT } from "./UserActionTypes";

export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
