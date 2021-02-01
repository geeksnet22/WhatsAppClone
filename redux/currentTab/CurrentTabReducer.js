import { RESET_CURRENT_TAB, SET_CURRENT_TAB } from './CurrentTabActionTypes';

const INITIAL_STATE = {
    currentTabName: "CHATS"
}

const currentTabReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_TAB:
            return { ...state, currentTabName: action.payload };
        case RESET_CURRENT_TAB:
            return { ...state, currentTabName: 'CHATS' };
        default:
            return state;
    }
}

export default currentTabReducer;