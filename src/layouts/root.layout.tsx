import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { currUserSelector, isAuthSelector } from "../feaures/auth/auth.selectors";

const RootLayout = () => {
	const isAuthenticated = useSelector(isAuthSelector);
	const currUser = useSelector(currUserSelector);

	if (!isAuthenticated) {
		window.location.href = "/login";
		return null;
	}

	useEffect(() => {
		if (isAuthenticated) document.title = `${currUser}'s tasks`;
	}, []);

	return (
		<div className="h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow">
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;
