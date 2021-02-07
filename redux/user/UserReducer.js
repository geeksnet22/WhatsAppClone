import { LOGIN, LOGOUT, SET_NAME, SET_PHOTO_URL } from "./UserActionTypes";

const INITIAL_STATE = {
  user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case SET_NAME:
      return { ...state, user: { ...state.user, name: action.payload.name } };
    case SET_PHOTO_URL:
      return {
        ...state,
        user: { ...state.user, photoURL: action.payload.photoURL },
      };
    default:
      return state;
  }
};

export default userReducer;
