import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'checking', // not-authencated, authenticated
	uid: null,
	displayName: null,
	email: null,
	photoUrl: null,
	errorMessage: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		login: (state, { payload }) => {
			state.status = 'authenticated';
			state.uid = payload.uid;
			state.displayName = payload.displayName;
			state.email = payload.email;
			state.photoUrl = payload.photoUrl;
			state.errorMessage = null;
		},
		logout: (state, { payload }) => {
			state.status = 'not-authenticated';
			state.uid = null;
			state.displayName = null;
			state.email = null;
			state.photoUrl = null;
			state.errorMessage = payload?.errorMessage;
		},
		checkingCredentials: (state) => {
			state.status = 'checking';
		},
	},
});

export const { login, logout, checkingCredentials } = authSlice.actions;
