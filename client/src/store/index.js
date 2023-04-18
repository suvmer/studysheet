import { createStore, combineReducers } from "redux";
import { tableReducer } from "./tableReducer";
import { profileReducer } from "./profileReducer";

const rootReducer = combineReducers({
  table: tableReducer,
  profile: profileReducer,
});

export const store = createStore(rootReducer);
