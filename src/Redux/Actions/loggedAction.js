import { SET_LOGGING } from "../Reducers/loggedReducer";
export const setLogging = () => async (dispatch) => {
	try {
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 100);
		});
		dispatch({
			type: SET_LOGGING,
		});
		console.log("Đã đổi state isLogging thành công");
	} catch (error) {
		console.log(error);
	}
};
