import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Editor } from '../components/Editor';

export const NoteView = () => {
	const [editorState, setEditorState] = useState('');
	const [title, setTitle] = useState('');

	const onTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const onEditorStateChange = (newState) => {
		setEditorState(newState);
	};
	
	const saveNote = () => {
		console.log(editorState);
	};

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
					fontSize={39}
					fontWeight='light'
				>
					23 septiembre, 2322
				</Typography>
			</Grid>
			<Grid item>
				<Button
					sx={{ padding: 2 }}
					color='primary'
					onClick={saveNote}
				>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Save
				</Button>
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
						value={title}
						onChange={onTitleChange}
					/>
				</Grid>
				<Grid container>
					<Editor editorState={editorState} onEditorStateChange={onEditorStateChange}/>
				</Grid>
			</Grid>
		</Grid>
	);
};
