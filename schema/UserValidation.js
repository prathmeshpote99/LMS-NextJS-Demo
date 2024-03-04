import * as yup from "yup";

export const userSchema = yup.object().shape({
	email: yup.string().email("Please Enter a valid email").required(),
	password: yup
		.string()
		.required("Please Enter your password")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
		),
	checkbox: yup.bool(),
});
