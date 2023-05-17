export const SET_BOOKING = "SET_BOOKING";

const initialState = {
	isBooking: false,
};

export default function actionForBookingReducer(state = initialState, payload) {
	switch (payload.type) {
		case SET_BOOKING:
			return {
				...state,
				isBooking: true,
			};
		default:
			return state;
	}
}
