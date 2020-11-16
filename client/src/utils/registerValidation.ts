const registerValidation = {
	email(email: string) {
		const emailRegex = new RegExp(
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
		);
		if (!emailRegex.test(email)) throw new Error('Invalid email');
	},

	username(username: string) {
		const usernameRegex = new RegExp(/^[a-z0-9_-]{3,24}$/i);
		if (username.length < 3 || username.length > 24)
			throw new Error('Username length must be between 3 and 24 characters');
		if (!usernameRegex.test(username)) throw new Error('Username contains invalid characters');
	},

	password(password: string) {
		const passwordRegex = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,48}$/);
		if (password.length < 6 || password.length > 48)
			throw new Error('Password length must be between 6 and 48 characters');
		if (!passwordRegex.test(password))
			throw new Error('Your password must contain at least one capital, letter and one number');
	},
};

export default registerValidation;
