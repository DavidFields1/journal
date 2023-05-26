import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startSignUpWithEmailAndPassword } from '../../store/auth/thunks';
import { CheckingAuth } from '../../ui/components/CheckingAuth';

const initialForm = {
	username: '',
	email: '',
	password: ''
}

const formValidations = {
	username: [(username) => username.length > 3, 'Username must have at least 4 charactes'],
	email: [(email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) , 'Invalid email address.'],
	password: [(password) => password.length >= 6, 'Password must have at least 6 characters'],
}

export const SignupPage = () => {

	const dispatch = useDispatch();
	const { 
		username, email, password, onInputChange, 
		onResetForm, isFormValid, usernameValid, emailValid, passwordValid
	} = useForm(initialForm, formValidations)
	const { status, errorMessage } = useSelector(s => s.auth);

	const [formTouched, setFormTouched] = useState(false)
	const isCheckingAuth = useMemo(() => status === 'checking', [status])


	const onSubmit = (e) => {
		e.preventDefault();
		if(!formTouched && (!username || !email || !password)) {
			return setFormTouched(true)
		}
			
		dispatch(startSignUpWithEmailAndPassword(email, password, username))
		setFormTouched(false);
		onResetForm();
	}

	return (
		<AuthLayout title='Sign Up'>
			<CheckingAuth />
			<form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
				<Grid container> 
					<Grid
						item
						xs={12}
					>
						<TextField
							id='username'
							label='Username'
							type='text'
							name='username'
							fullWidth
							value={username}
							onChange={onInputChange}
							error={usernameValid && formTouched}
							helperText={formTouched ? usernameValid : null}
							
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sx={{ mt: 2 }}
					>
						<TextField
							label='Email'
							type='email'
							name='email'
							fullWidth
							value={email}
							onChange={onInputChange}
							error={emailValid && formTouched}
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
							fullWidth
							value={password}
							onChange={onInputChange}
							error={passwordValid && formTouched}
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
						>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								disabled={(!isFormValid && formTouched) || isCheckingAuth}
							>
								Sign Up
								
							</Button>
						</Grid>
					</Grid>

					<Grid
						container
						direction='row'
						justifyContent='end'
					>
						<Typography>Already have an account?</Typography>
						<Link
							to='/auth/login'
							component={RouterLink}
							sx={{ ml: 1 }}
							color='inherit'
						>
							Sign In
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
