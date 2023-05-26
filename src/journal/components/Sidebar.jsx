import { useSelector } from 'react-redux';
import {
	Box,
	Divider,
	Drawer,
	List,
	Toolbar,
	Typography,
} from '@mui/material';
import { FetchingNotes } from '../../ui/components/FetchingNotes';
import { NoteItem } from './NoteItem';
import { NoteItemSkeletonList } from './NoteItemSkeletonList';

export default function Sidebar({ drawerWidth }) {
	
	const { displayName = '', status } = useSelector(s => s.auth);
	const { fetchingNotes } = useSelector(s => s.journal);
	const { notes } = useSelector(s => s.journal);

	return (
		<Box
			component='nav'
			sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
		>
			<FetchingNotes />
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
					{
						status === 'checking'
						? (
							<>
								<NoteItemSkeletonList />
							</>
						) : (
							notes.map((note) => (
								<NoteItem note={note} key={note.id} />
							))
						)
					}
				</List>
			</Drawer>
		</Box>
	);
}
