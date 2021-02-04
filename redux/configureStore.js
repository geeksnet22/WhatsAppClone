import { createStore, combineReducers } from "redux";
import userReducer from "./user/UserReducer";
import currentTabReducer from "./currentTab/CurrentTabReducer";

const rootReducer = combineReducers({
  user: userReducer,
  currentTabName: currentTabReducer,
});

const configureStore = createStore(rootReducer);

export default configureStore;
