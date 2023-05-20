import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startSignInWithEmailAndPassword } from '../../store/auth/thunks';
import { useMemo, useState } from 'react';

const initialForm = {
	email: '',
	password: ''
}

const formValidations = {
	email: [(email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) , 'Invalid email address.'],
	password: [(password) => password.length > 0, 'Password cannot be empty'],
}

export const LoginPage = () => {

	const { email, password, onInputChange, onResetForm, isFormValid, emailValid, passwordValid} = useForm(initialForm, formValidations)
	const { status, errorMessage } = useSelector(state => state.auth)
	const isCheckingAuth = useMemo(() => status === 'checking', [status])
	
	const [formTouched, setFormTouched] = useState(false)

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();
		if(!formTouched && (!email || !password)) {
			return setFormTouched(true)
		}

		dispatch(startSignInWithEmailAndPassword(email, password));
		setFormTouched(false);
		onResetForm();
	}

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	}

	return (
		<AuthLayout title='Log In'>
			<form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
				<Grid container>
					<Grid
						item
						xs={12}
					>
						<TextField
							label='Email'
							type='email'
							name='email'
							value={email}
							onChange={onInputChange}
							fullWidth
							error={ !!emailValid && formTouched}
							helperText={formTouched ? emailValid : null}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sx={{ mt: 2 }}
					>
						<TextField
							label='Password'
							type='password'
							name='password'
							value={password}
							onChange={onInputChange}
							fullWidth
							error={ !!passwordValid && formTouched}
							helperText={formTouched ? passwordValid : null}
						/>
					</Grid>
					<Grid
						container
						spacing={2}
						sx={{ my: 1 }}
					>
						<Grid
							item
							xs={12}
							sx={{ display: `${errorMessage ? 'block' : 'none'}` }}
						>
							<Alert severity='error'>
								{ errorMessage }
							</Alert>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
						>
							<Button
								variant='contained'
								fullWidth
								type='submit'
								disabled={(!isFormValid && formTouched) || isCheckingAuth}
							>
								Login
							</Button>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
						>
							<Button
								variant='contained'
								fullWidth
								onClick={onGoogleSignIn}
								disabled={ isCheckingAuth }
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid
						container
						direction='row'
						justifyContent='end'
					>
						<Link
							color='inherit'
							to='/auth/signup'
							component={RouterLink}
						>
							Create an account
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
