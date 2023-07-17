import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import RootLayout from "../layouts/root.layout";
import Login from "./login";

const Error404 = lazy(() => import("./404"));
const CreateTask = lazy(() => import("./tasks/create"));
const EditTask = lazy(() => import("./tasks/edit"));
const Tasks = lazy(() => import("./tasks"));

export const rootRoute: RouteObject = {
	path: "/",
	element: <Navigate to="/login" />,
	errorElement: <Error404 />,
};

export const loginRoute: RouteObject = {
	path: "login",
	element: <Login />,
	errorElement: <Error404 />,
};

export const taskRoute: RouteObject = {
	path: "tasks",
	element: <RootLayout />,
	errorElement: <Error404 />,
	children: [
		{ index: true, element: <Tasks /> },
		{
			path: "create",
			element: <CreateTask />,
			errorElement: <Error404 />,
		},
		{
			path: "edit/:id",
			element: <EditTask />,
			errorElement: <Error404 />,
		},
	],
};
