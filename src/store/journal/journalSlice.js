import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSaving: false,
	fetchingNotes: false,
	messageSaved: '',
	notes: [],
	activeNote: null,
};

export const journalSlice = createSlice({
	name: 'journal',
	initialState: initialState,
	reducers: {
		startNoteIsSaving: (state) => {
			state.isSaving = true;
			console.log('saaving');
		},
		endNoteIsSaving: (state) => {
			state.isSaving = false;
		},
		startFetchingNotes: (state) => {
			state.fetchingNotes = true;
		},
		endFetchingNotes: (state) => {
			state.fetchingNotes = false;
		},
		createEmptyNote: (state, { payload }) => {
			state.isSaving = true;
			state.notes.push(payload);
		},
		setActiveNote: (state, { payload }) => {
			state.activeNote = {
				...payload,
			};
		},
		setActiveNoteEmpty: (state) => {
			state.activeNote = null;
		},
		loadNotes: (state, { payload }) => {
			state.notes = payload;
		},
		deleteNote: (state, action) => {},
		cleanOnLogout: (state) => {
			state.isSaving = false;
			state.fetchingNotes = false;
			state.messageSaved = '';
			state.notes = [];
			state.activeNote = null;
		},
	},
});

export const {
	startNoteIsSaving,
	endNoteIsSaving,
	startFetchingNotes,
	endFetchingNotes,
	createEmptyNote,
	setActiveNote,
	setActiveNoteEmpty,
	loadNotes,
	setSaving,
	updateNote,
	deleteNote,
	cleanOnLogout,
} = journalSlice.actions;
