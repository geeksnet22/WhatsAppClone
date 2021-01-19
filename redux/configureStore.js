import { createStore, combineReducers } from 'redux';
import userReducer from './UserReducer';


const rootReducer = combineReducers(
    {
        user: userReducer
    }
);

const configureStore = createStore(rootReducer);

export default configureStore;