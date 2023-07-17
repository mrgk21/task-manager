import { RootState } from "../store";

export const isAuthSelector = (state: RootState) => state.auth.isAuthenticated;
export const currUserSelector = (state: RootState) => state.auth.currentUser;
