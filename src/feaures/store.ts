import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./api";

const reducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
});

const store = configureStore({
	reducer,
	middleware: (gDM) => gDM().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
