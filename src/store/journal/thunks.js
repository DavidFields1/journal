import {
	collection,
	deleteDoc,
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
	setNoteData,
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

		dispatch(createEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
		dispatch(endNoteIsSaving());
	};
};

export const startLoadingUserNotes = () => {
	return async (dispatch, getState) => {
		try {
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
		} catch (error) {
			dispatch(setNoteData(['error', "Notes couldn't be loaded"]));
			setTimeout(() => {
				dispatch(setNoteData([null, null]));
			}, 3000);
		}
	};
};

export const startSavingNote = () => {
	return async (dispatch, getState) => {
		try {
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

			dispatch(setNoteData(['success', 'Note saved correctly']));
			setTimeout(() => {
				dispatch(setNoteData([null, null]));
			}, 3000);
		} catch (error) {
			dispatch(setNoteData(['success', "Note couldn't get saved"]));
			setTimeout(() => {
				dispatch(setNoteData([null, null]));
			}, 3000);
		}
	};
};

export const startDeletingNote = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(startNoteIsSaving());

			const { uid } = getState().auth;
			const { activeNote } = getState().journal;

			await deleteDoc(
				doc(FirebaseFirestore, `${uid}/journal/notes/${activeNote.id}`)
			);

			dispatch(startLoadingUserNotes());
			dispatch(endNoteIsSaving());

			dispatch(setNoteData(['success', 'Note deleted correctly']));
			setTimeout(() => {
				dispatch(setNoteData([null, null]));
			}, 3000);
		} catch (error) {
			dispatch(setNoteData(['success', "Note couldn't be deleted"]));
			setTimeout(() => {
				dispatch(setNoteData([null, null]));
			}, 3000);
		}
	};
};
