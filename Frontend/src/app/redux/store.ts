import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { ratingsReducer } from "./ratings-state";
import { recipesReducer } from "./recipes-state";

const reducers = combineReducers({
    recipesState: recipesReducer,
    authState: authReducer,
    ratingsState: ratingsReducer,
});

const store = createStore(reducers);

export default store;
