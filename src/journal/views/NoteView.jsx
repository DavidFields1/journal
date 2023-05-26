import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { SaveOutlined, CloseOutlined } from '@mui/icons-material';
import { Editor } from '../components/Editor';
import { startLoadingUserNotes, startSavingNote } from '../../store/journal/thunks';
import { setActiveNote, setActiveNoteEmpty } from '../../store/journal/journalSlice';
import 'react-quill/dist/quill.snow.css';

export const NoteView = () => {
	const { activeNote, isSaving } = useSelector(s => s.journal);
	const { title, body, date } = activeNote;
	
	const [editorState, setEditorState] = useState(body)
	const [titleState, setTitleState] = useState(title)
	const [noteChanged, setNoteChanged] = useState(false)

	const dispatch = useDispatch();

	useEffect(() => {
		setEditorState(body)
		setTitleState(title)
	}, [activeNote])

	useEffect(() => {
		dispatch(setActiveNote({
			title: titleState,
			body: editorState,
			id: activeNote.id,
			filesUrls: activeNote.filesUrls,
			date: activeNote.date
		}))
	}, [titleState, editorState])

	const onTitleChange = (event) => {
		setTitleState(event.target.value)
		setNoteChanged(true);
	}

	const onEditorStateChange = (newState) => {
		setEditorState(newState);
		setNoteChanged(true);
	};
	
	const saveNote = () => {
		dispatch(startSavingNote())
		dispatch(startLoadingUserNotes());
		setNoteChanged(false)
	};

	const closeNote = () => {
		dispatch(setActiveNoteEmpty())
	}

	return (
		<Grid
			className='animate__animated animate__fadeIn animate__faster'
			container
			direction='row'
			justifyContent='space-between'
			alignItems='center'
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography
					fontSize={18}
					fontWeight='light'
				>
					<strong>
					Created at:
					</strong>
					{ " " + new Date(date).toLocaleString('en-GB', {
						hour12: false
					}) }
				</Typography>
			</Grid>
			<Grid display={'flex'}>
				<Grid item>
					<Button
							sx={{ padding: 2 }}
							color={noteChanged ? 'error' : 'primary'}
							onClick={saveNote}
							disabled={isSaving}
						>
							<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
							Save
					</Button>
				</Grid>
				<Grid item>
					<Button
							sx={{ padding: 2 }}
							color={'primary'}
							onClick={closeNote}
							disabled={isSaving}
						>
							<CloseOutlined sx={{ fontSize: 30, mr: 1 }} />
							Close 
					</Button>
				</Grid>
			</Grid>
			<Grid
				container
				justifyContent='center'
				alignItems='center'
				sx={{ mt: 2 }}
				flexDirection='column'
			>
				<Grid container>
					<TextField
						multiline
						label="Title"
						fullWidth
						color='primary'
						sx={{ mb: 2 }}
						value={titleState}
						onChange={onTitleChange}
						error={titleState ? false : true}
						helperText={titleState ? null : 'Title cannot be empty'}
					/>
				</Grid>
				<Grid container>
					<Editor editorState={editorState} onEditorStateChange={onEditorStateChange}/>
				</Grid>
			</Grid>
		</Grid>
	);
};
