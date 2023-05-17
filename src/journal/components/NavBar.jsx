import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';

export const NavBar = ({ drawerWidth = 240 }) => {
	return (
		<AppBar
			position='fixed'
			sx={{
				width: { md: `calc(100% - ${drawerWidth}px)` },
				ml: { md: `${drawerWidth}px` },
			}}
		>
			<Toolbar>
				<IconButton
					color='inherit'
					edge='start'
					sx={{
						mr: 2,
						display: {
							md: 'none',
						},
					}}
				>
					<MenuOutlined />
				</IconButton>
				<Grid
					container
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Typography
						variant='h6'
						noWrap
					>
						My Journal
					</Typography>
					<IconButton color='error'>
						<LogoutOutlined />
					</IconButton>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
