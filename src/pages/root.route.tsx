import { Navigate, RouteObject } from "react-router-dom";
import RootLayout from "../layouts/root.layout";
import Error404 from "./404";
import Login from "./login";
import Tasks from "./tasks";
import CreateTask from "./tasks/create";
import EditTask from "./tasks/edit";

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
