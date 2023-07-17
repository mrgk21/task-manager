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
		<nav className="sticky flex justify-end px-10 items-center space-x-8 min-h-[8vh] bg-gradient-to-r from-slate-500 via-slate-200 to-white">
			<NavLink
				to="/tasks"
				end
				className={({ isActive }) =>
					`${isActive && "bg-slate-300"} p-1 px-2 rounded-md border border-black`
				}
			>
				View tasks
			</NavLink>
			<NavLink
				to="/tasks/create"
				className={({ isActive }) =>
					`${isActive && "bg-slate-300"} p-1 px-2 rounded-md border border-black`
				}
			>
				Create a task
			</NavLink>
			<button
				type="button"
				className="underline underline-offset-2 hover:text-red-500"
				onClick={handleLogout}
			>
				Logout
			</button>
		</nav>
	);
};

export default Navbar;
