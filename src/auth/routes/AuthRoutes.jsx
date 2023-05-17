import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

export const AuthRoutes = () => {
	return (
		<Routes>
			<Route
				path='login'
				element={<LoginPage />}
			/>
			<Route
				path='signup'
				element={<SignupPage />}
			/>
			<Route
				path='/*'
				element={<Navigate to='/auth/login' />}
			/>
		</Routes>
	);
};
