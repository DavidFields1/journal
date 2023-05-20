import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
	return (
		<Grid
			className='animate__animated animate__fadeIn animate__faster'
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justifyContent='center'
			sx={{
				minHeight: 'calc(100vh - 110px)',
				backgroundColor: 'primary.main',
				padding: 4,
				borderRadius: 3,
			}}
		>
			<Grid item>
				<StarOutline sx={{ fontSize: 80, color: 'white' }} />
			</Grid>
			<Grid item>
				<Typography
					color='white'
					variant='h5'
				>
					Create a new note
				</Typography>
			</Grid>
		</Grid>
	);
};
