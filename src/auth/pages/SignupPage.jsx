import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';

export const SignupPage = () => {
	return (
		<AuthLayout title='Sign Up'>
			<form>
				<Grid container>
					<Grid
						item
						xs={12}
					>
						<TextField
							label='Username'
							type='text'
							fullWidth
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
							fullWidth
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
							fullWidth
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
						>
							<Button
								variant='contained'
								fullWidth
							>
								Login
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
							sx={{ ml: 1 }}
							color='inherit'
							to='/auth/login'
							component={RouterLink}
						>
							Sign In
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
