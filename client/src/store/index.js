import { createStore, combineReducers, applyMiddleware } from "redux";
import { tableReducer } from "./tableReducer";
import { profileReducer } from "./profileReducer";
import { uiReducer } from "./uiReducer";
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  table: tableReducer,
  profile: profileReducer,
  ui: uiReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
