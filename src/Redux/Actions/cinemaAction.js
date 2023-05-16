import { SET_CINEMA } from "../Reducers/cinemaReducer";

export const setCinema = (_id) => async (dispatch) => {
	try {
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 200);
		});
		dispatch({
			type: SET_CINEMA,
			_id: _id,
		});
		console.log("Đã lấy data rạp thành công");
	} catch (error) {
		console.log(error);
	}
};
