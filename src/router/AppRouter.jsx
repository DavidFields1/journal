import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { useCheckAuth } from '../hooks/useCheckAuth';

export const AppRouter = () => {
	const { status } = useCheckAuth();
	return (
		<Routes>
			<Route path='/*' element={status === 'not-authenticated' ? <Navigate to='/auth/login' /> : <JournalRoutes />} />
			<Route path='/auth/*' element={status === 'authenticated' ? <Navigate to='/' /> : <AuthRoutes />} />
			<Route path='/*' element={ <Navigate to='auth/login' />} />
		</Routes>
	);
};
