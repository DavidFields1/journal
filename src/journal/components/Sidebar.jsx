import { useSelector } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import {
	Box,
	Divider,
	Drawer,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';

export default function Sidebar({ drawerWidth }) {
	
	const { displayName = '' } = useSelector(s => s.auth);

	return (
		<Box
			component='nav'
			sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
		>
			<Drawer
				variant='permanent'
				open
				sx={{
					display: { xs: 'block' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
			>
				<Toolbar>
					<Typography
						variant='h5'
						noWrap
						component='div'
					>
						{ displayName }
					</Typography>
				</Toolbar>

				<Divider />

				<List>
					{['Profile', 'Notes', 'Settings'].map((text) => (
						<ListItem
							key={text}
							disablePadding
						>
							<ListItemButton>
								<ListItemIcon>
									<TurnedInNot />
								</ListItemIcon>
								<Grid container>
									<ListItemText primary={text} sx={{ width: '100%'}}/>
									<ListItemText
										secondary={'item description'}
									/>
								</Grid>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
}
