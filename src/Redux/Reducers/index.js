import { combineReducers } from "redux";
// import reducers here
import infor from "./inforReducer";

const reducers = combineReducers({
	// here we will be adding reducers
	personalInfor: infor,
});

export default (state, action) => reducers(state, action);
