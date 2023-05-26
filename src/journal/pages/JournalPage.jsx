import { Alert, Collapse, Grid, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views/NothingSelectedView';
import { NoteView } from '../views/NoteView';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateEmptyNote } from '../../store/journal/thunks';
import { useEffect, useState } from 'react';

export const JournalPage = () => {

	const [alertOpen, setAlertOpen] = useState(true)

	const dispatch = useDispatch();
	const { activeNote, isSaving, alertData } = useSelector(s => s.journal);

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
			{
				alertData[0] &&
					<Collapse in={alertOpen} >	
						<Alert 
							severity={alertData[0]} 
							sx={{ position: 'absolute', right: 30, bottom: 50}}
						>
							{ alertData[1] }
						</Alert>
					</Collapse>
			}
		</JournalLayout>
	);
};
