import { Grid, IconButton, Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views/NothingSelectedView';
import { NoteView } from '../views/NoteView';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateEmptyNote } from '../../store/journal/thunks';

export const JournalPage = () => {

	const dispatch = useDispatch();
	const { activeNote, isSaving } = useSelector(s => s.journal);

	const onCreateNote = () => {
		dispatch(startCreateEmptyNote());
	}

	return (
		<JournalLayout>
			{
				activeNote 
				?
					<NoteView />
				:
					<>
						<NothingSelectedView />
						<IconButton
							onClick={onCreateNote}
							sx={{
								color: 'white',
								backgroundColor: 'error.main',
								':hover': { backgroundColor: 'error.main', opacity: 0.9 },
								position: 'fixed',
								right: 50,
								bottom: 50
							}}
							disabled={isSaving}
						>
							<AddOutlined
								sx={{
									fontSize: 40
								}}
							/>
						</IconButton>
					</>
			}
		</JournalLayout>
	);
};
