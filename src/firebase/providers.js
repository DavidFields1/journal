import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleAuthProvider = new GoogleAuthProvider();

export const logInWithEmailAndPassword = async (mail, password) => {
	try {
		const response = await signInWithEmailAndPassword(
			FirebaseAuth,
			mail,
			password
		);

		const { displayName, email, photoURL, uid } = response.user;

		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		const errorMessage = error.message;
		return {
			ok: false,
			errorMessage,
		};
	}
};

export const signInWithGoogle = async () => {
	try {
		const response = await signInWithPopup(
			FirebaseAuth,
			googleAuthProvider
		);

		const { displayName, email, photoURL, uid } = response.user;

		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		const errorMessage = error.message;
		return {
			ok: false,
			errorMessage,
		};
	}
};

export const signUpWithEmailAndPassword = async (mail, password, username) => {
	try {
		const response = await createUserWithEmailAndPassword(
			FirebaseAuth,
			mail,
			password
		);

		await updateProfile(FirebaseAuth.currentUser, {
			displayName: username,
		});

		const { email, displayName, photoURL, uid } = response.user;

		return {
			ok: true,
			uid,
			email,
			displayName,
			photoURL,
		};
	} catch (error) {
		const errorMessage = error.message;
		return {
			ok: false,
			errorMessage,
		};
	}
};

export const logoutFirebase = async () => {
	return await FirebaseAuth.signOut();
};
