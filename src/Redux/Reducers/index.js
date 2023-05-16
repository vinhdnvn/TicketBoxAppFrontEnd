import { combineReducers } from "redux";
// import reducers here
import infor from "./inforReducer";
import cinemaInfor from "./cinemaReducer";
import loggingInfor from "./loggedReducer";

const reducers = combineReducers({
	// here we will be adding reducers
	personalInfor: infor,
	cinemaInfor: cinemaInfor,
	loggingInfor: loggingInfor,
});

export default (state, action) => reducers(state, action);
