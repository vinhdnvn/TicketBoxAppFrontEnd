export const SET_CINEMA = "SET_CINEMA";

const initialState = {
	name: "",
	cinemaImage: "",
	address: "",
	movies: [],
	seats: [],
	_id: "",
};

export default function actionForCinemaReducer(state = initialState, payload) {
	switch (payload.type) {
		case SET_CINEMA:
			return {
				...state,
				_id: payload._id,
			};
		default:
			return state;
	}
}
