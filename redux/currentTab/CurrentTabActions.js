import { RESET_CURRENT_TAB, SET_CURRENT_TAB } from "./CurrentTabActionTypes";

export const setCurrentTab = (currentTabName) => ({
  type: SET_CURRENT_TAB,
  payload: currentTabName,
});

export const resetCurrentTab = () => ({
  type: RESET_CURRENT_TAB,
});
