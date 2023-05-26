import {
	collection,
	doc,
	getDocs,
	setDoc,
	updateDoc,
} from 'firebase/firestore/lite';
import { FirebaseFirestore } from '../../firebase/config';
import {
	createEmptyNote,
	endFetchingNotes,
	endNoteIsSaving,
	loadNotes,
	setActiveNote,
	startFetchingNotes,
	startNoteIsSaving,
} from './journalSlice';

export const startCreateEmptyNote = () => {
	return async (dispatch, getState) => {
		dispatch(startNoteIsSaving());

		const { uid } = getState().auth;
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
			filesUrls: [],
		};

		const newDoc = doc(
			collection(FirebaseFirestore, `${uid}/journal/notes`)
		);
		await setDoc(newDoc, newNote);
		newNote.id = newDoc.id;
		console.log(newNote);

		dispatch(createEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
		dispatch(endNoteIsSaving());
	};
};

export const startLoadingUserNotes = () => {
	return async (dispatch, getState) => {
		dispatch(startFetchingNotes());

		const { uid } = getState().auth;
		const rawDocuments = await getDocs(
			collection(FirebaseFirestore, `${uid}/journal/notes`)
		);

		const documents = [];
		rawDocuments.forEach((doc) => {
			documents.push({
				id: doc.id,
				...doc.data(),
			});
		});

		dispatch(loadNotes(documents));
		dispatch(endFetchingNotes());
	};
};

export const startSavingNote = () => {
	return async (dispatch, getState) => {
		dispatch(startNoteIsSaving());

		const { uid } = getState().auth;
		const { activeNote } = getState().journal;
		const { id: noteId } = activeNote;

		const documentRef = doc(
			FirebaseFirestore,
			`${uid}/journal/notes/${noteId}`
		);

		await updateDoc(documentRef, {
			body: activeNote.body,
			title: activeNote.title,
			date: activeNote.date,
			filesUrls: activeNote.filesUrls,
		});

		dispatch(endNoteIsSaving());
		dispatch(startLoadingUserNotes());
	};
};
