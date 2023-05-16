import { tr } from "date-fns/locale";
import { SET_START } from "../Reducers/inforReducer";
import { LOGIN } from "../Reducers/inforReducer";
import { LOGOUT } from "../Reducers/inforReducer";
import { SET_ISLOADING_BACK } from "../Reducers/inforReducer";

export const updateSetUser = (email) => async (dispatch) => {
	try {
		// side-effect : goi len server hoac lam gi day bất đòng bộ ( middleware redux-thunk giúp bạn làm việc này)
		console.log("STIL LOADING.....");
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 5000);
		});
		console.log("DA CAP NHAT USER");
		// 2, cập nhật thông tin của inforReducer trong store
		dispatch({
			type: SET_USER,
			email: email,
		});
	} catch (error) {
		console.log(error);
	}
};

export const loginUser = (_id, email, name, isAdmin, image, token) => async (dispatch) => {
	try {
		console.log("Đang đăng nhập.....");
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 200);
		});
		console.log("Đăng nhập thành công");
		// 2. cập nhật thông tin của inforReducer trong store
		dispatch({
			type: LOGIN,
			_id: _id,
			email: email,
			name: name,
			isAdmin: isAdmin,
			image: image,
			token: token,
			isLoading: false,
		});
	} catch (error) {
		console.log(error);
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		console.log("Đang đăng xuất.....");
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 200);
		});
		console.log("Đăng xuất thành công");
		// 2. cập nhật thông tin của inforReducer trong store
		dispatch({
			type: LOGOUT,
			isLoading: true,
		});
	} catch (error) {
		console.log(error);
	}
};

export const setStart = () => async (dispatch) => {
	try {
		console.log("Welcomeeeeeee");
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 1500);
		});
		console.log("Đã load xong");
		// 2. cập nhật thông tin của inforReducer trong store
		dispatch({
			type: SET_START,
			isLoading: false,
		});
	} catch (error) {
		console.log(error);
	}
};

export const setIsLoadingBack = () => async (dispatch) => {
	try {
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 500);
		});
		dispatch({
			type: SET_ISLOADING_BACK,
			isLoading: true,
		});
	} catch (error) {}
};
