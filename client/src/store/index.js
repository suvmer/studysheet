import { createStore, combineReducers } from "redux";
import { tableReducer } from "./tableReducer";
import { profileReducer } from "./profileReducer";
import { uiReducer } from "./uiReducer";

const rootReducer = combineReducers({
  table: tableReducer,
  profile: profileReducer,
  ui: uiReducer
});

export const store = createStore(rootReducer);
