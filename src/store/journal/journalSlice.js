import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSaving: false,
	fetchingNotes: false,
	alertData: [],
	notes: [],
	activeNote: null,
};

export const journalSlice = createSlice({
	name: 'journal',
	initialState: initialState,
	reducers: {
		startNoteIsSaving: (state) => {
			state.isSaving = true;
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
		setNoteData: (state, { payload }) => {
			state.alertData = [payload[0], payload[1]];
		},
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
	setNoteData,
	cleanOnLogout,
} = journalSlice.actions;
