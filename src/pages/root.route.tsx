import { Suspense, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import RootLayout from "../layouts/root.layout";
import Error404 from "./404";
import Login from "./login";
import CreateTask from "./tasks/create";
import EditTask from "./tasks/edit";

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
		{
			index: true,
			element: (
				<Suspense fallback={<div>loading...</div>}>
					<Tasks />
				</Suspense>
			),
		},
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
