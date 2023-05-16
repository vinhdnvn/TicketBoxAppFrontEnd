export const SET_LOGGING = "SET_LOGGING";

const initialState = {
	isLogging: false,
};

export default function actionForReducer(state = initialState, payload) {
	switch (payload.type) {
		case SET_LOGGING:
			return {
				...state,
				isLogging: true,
			};
		default:
			return state;
	}
}
