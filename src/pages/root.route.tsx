import { RouteObject } from "react-router-dom";
import Error404 from "./404";
import Login from "./login";
import Tasks from "./tasks";

export const loginRoute: RouteObject = {
	path: "/login",
	element: <Login />,
	errorElement: <Error404 />,
};

export const taskRoute: RouteObject = {
	path: "/tasks",
	element: <Tasks />,
	errorElement: <Error404 />,
};
