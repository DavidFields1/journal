import {
	logInWithEmailAndPassword,
	logoutFirebase,
	signInWithGoogle,
	signUpWithEmailAndPassword,
} from '../../firebase/providers';
import { cleanOnLogout } from '../journal/journalSlice';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuth = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
	};
};

export const startSignInWithEmailAndPassword = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const response = await logInWithEmailAndPassword(email, password);

		if (!response.ok)
			return dispatch(logout({ errorMessage: response.errorMessage }));

		dispatch(login(response));
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const response = await signInWithGoogle();

		if (!response.ok)
			return dispatch(logout({ errorMessage: response.errorMessage }));

		dispatch(login(response));
	};
};

export const startSignUpWithEmailAndPassword = (email, password, username) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const response = await signUpWithEmailAndPassword(
			email,
			password,
			username
		);

		if (!response.ok)
			return dispatch(logout({ errorMessage: response.errorMessage }));

		dispatch(login(response));
	};
};

export const startLogoutFirebase = () => {
	return async (dispatch) => {
		await logoutFirebase();
		dispatch(logout());
		dispatch(cleanOnLogout());
	};
};
