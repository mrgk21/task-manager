import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../types";

const initialState: IAuth = {
	users: [],
	isAuthenticated: false,
	currentUser: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginUser: (state, action: PayloadAction<string>) => {
			if (!state.users.includes(action.payload)) {
				state.users = [...state.users, action.payload];
			}
			state.currentUser = action.payload;
			localStorage.setItem("currentUser", action.payload);
			state.isAuthenticated = true;
		},
		logoutUser: (state) => {
			state.currentUser = null;
			localStorage.removeItem("currentUser");
			state.isAuthenticated = false;
		},
	},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
