import { SET_USER } from "../Reducers/inforReducer";
import { LOGIN } from "../Reducers/inforReducer";
import { LOGOUT } from "../Reducers/inforReducer";

export const updateSetUser = (email) => async (dispatch) => {
	try {
		// side-effect : goi len server hoac lam gi day bất đòng bộ ( middleware redux-thunk giúp bạn làm việc này)
		console.log("STIL LOADING.....");
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 2000);
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

export const loginUser = (email, name, isAdmin, image, token) => async (dispatch) => {
	try {
		console.log("Đang đăng nhập.....");
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 2000);
		});
		console.log("Đăng nhập thành công");
		// 2. cập nhật thông tin của inforReducer trong store
		dispatch({
			type: LOGIN,
			email: email,
			name: name,
			isAdmin: isAdmin,
			image: image,
			token: token,
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
			}, 2000);
		});
		console.log("Đăng xuất thành công");
		// 2. cập nhật thông tin của inforReducer trong store
		dispatch({
			type: LOGOUT,
		});
	} catch (error) {
		console.log(error);
	}
};
