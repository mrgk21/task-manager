import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./api";
import { authReducer } from "./auth/auth.slice";
import { taskGroupReducer } from "./taskGroup/taskGroup.slice";

const reducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	auth: authReducer,
	taskGroup: taskGroupReducer,
});

const store = configureStore({
	reducer,
	middleware: (gDM) => gDM().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
