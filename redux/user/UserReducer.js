import { LOGIN, LOGOUT } from './UserActionTypes';

const INITIAL_STATE = {
    user: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            return { ...state, user: action.payload };
        case LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
}

export default userReducer;