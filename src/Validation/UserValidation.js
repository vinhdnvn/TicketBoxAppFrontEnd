import * as yup from "yup";

// login validation

const loginValidation = yup.object().shape({
	email: yup.string().email().required("Email is required").trim(),
	password: yup
		.string()
		.min(6)
		.max(20)
		.required("Password is requrired")
		.min(6, "Password must be at least 6 characters")
		.max(20, "Password must be less than 20 characters")
		.matches(/(?=.*[0-9])/, "Password must contain a number"),
});

// register validation
const registerValidation = yup.object().shape({
	email: yup.string().email().required("Email is required").trim(),
	password: yup

		.string()
		.required("Password is requrired")
		.min(6, "Password must be at least 6 characters")
		.max(20, "Password must be less than 20 characters")
		.matches(/(?=.*[0-9])/, "Password must contain a number"),
	name: yup
		.string()
		.required("Name is required")
		.max(20, "Name must be less than 20 characters")
		.matches(/^[a-zA-Z]+$/, "Name must contain only alphabets"),
});

export { loginValidation, registerValidation };
