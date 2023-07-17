import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../feaures/auth/auth.slice";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(authActions.logoutUser());
		navigate("/login", { replace: true });
	};

	return (
		<nav className="sticky flex justify-center items-center space-x-32 h-[8vh] border border-black">
			<NavLink
				to="/tasks"
				end
				className={({ isActive, isPending }) =>
					isActive ? "bg-gray-300 p-1 rounded-md" : isPending ? "p-1 rounded-md" : ""
				}
			>
				View tasks
			</NavLink>
			<NavLink
				to="/tasks/create"
				className={({ isActive, isPending }) =>
					isActive ? "bg-gray-300 p-1 rounded-md" : isPending ? "p-1 rounded-md" : ""
				}
			>
				Create a task
			</NavLink>
			<button type="button" className="underline underline-offset-2" onClick={handleLogout}>
				Logout
			</button>
		</nav>
	);
};

export default Navbar;
