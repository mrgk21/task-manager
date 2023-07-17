import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api";
import { authReducer } from "./auth/auth.slice";
import { taskGroupReducer } from "./taskGroup/taskGroup.slice";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["auth"],
};

const reducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	auth: authReducer,
	taskGroup: taskGroupReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (gDM) =>
		gDM({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
