import { SET_BOOKING } from "../Reducers/bookingReducer";
export const setBooking = () => async (dispatch) => {
	try {
		await new Promise((resolve, reject) => {
			resolve();
		});
		dispatch({
			type: SET_BOOKING,
		});
		console.log("Đã đổi state isBooking thành công");
	} catch (error) {
		console.log(error);
	}
};
