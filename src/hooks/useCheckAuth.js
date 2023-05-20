import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';
import { useEffect } from 'react';

export const useCheckAuth = () => {
	const { status } = useSelector((s) => s.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) dispatch(logout());
			else {
				const { uid, email, displayName, photoUrl } = user;
				dispatch(login({ uid, email, displayName, photoUrl }));
			}
		});
	}, []);

	return {
		status,
	};
};
