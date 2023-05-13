export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

const initialState = {
	email: "",
	name: "",
	isAdmin: false,
	image: "",
	token: "",
};

export default function actionForReducer(state = initialState, payload) {
	switch (payload.type) {
		case SET_USER:
			return {
				...state,
				email: payload.email,
			};
		case LOGOUT:
			return {
				...state,
				email: "",
				name: "",
				isAdmin: false,
				image: null,
			};
		case LOGIN:
			return {
				...state,
				email: payload.email,
				name: payload.name,
				isAdmin: payload.isAdmin,
				image: payload.image,
				token: payload.token,
			};
		default:
			return state;
	}
}
