import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { RootState } from "../feaures/store";

const RootLayout = () => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	if (!isAuthenticated) {
		window.location.href = "/login";
		return;
	}

	return (
		<div>
			<Navbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;
