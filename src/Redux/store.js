import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	// Add youre reducers here
});

// initialState
const initialState = {};

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
});
