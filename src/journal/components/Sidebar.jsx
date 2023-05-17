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
						David Fields
					</Typography>
				</Toolbar>

				<Divider />

				<List>
					{['Profileee', 'Notesss', 'Settings'].map((text) => (
						<ListItem
							key={text}
							disablePadding
						>
							<ListItemButton>
								<ListItemIcon>
									<TurnedInNot />
								</ListItemIcon>
								<Grid container>
									<ListItemText primary={text} />
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
