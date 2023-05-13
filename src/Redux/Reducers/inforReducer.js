export const SET_START = "SET_START";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const SET_ISLOADING_BACK = "SET_ISLOADING";

const initialState = {
	email: "",
	name: "",
	isAdmin: false,
	image: "",
	token: "",
	isLoading: true,
};

export default function actionForReducer(state = initialState, payload) {
	switch (payload.type) {
		case SET_START:
			return {
				...state,
				isLoading: false,
			};
		case LOGOUT:
			return {
				...state,
				email: "",
				name: "",
				isAdmin: false,
				image: null,
				token: null,
				isLoading: false,
			};
		case LOGIN:
			return {
				...state,
				email: payload.email,
				name: payload.name,
				isAdmin: payload.isAdmin,
				image: payload.image,
				token: payload.token,
				isLoading: false,
			};
		case SET_ISLOADING_BACK:
			return {
				...state,
				isLoading: true,
			};
		default:
			return state;
	}
}
