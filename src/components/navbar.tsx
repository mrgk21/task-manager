import { NavLink } from "react-router-dom";

const Navbar = () => {
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
			<button type="button" className="underline underline-offset-2">
				Logout
			</button>
		</nav>
	);
};

export default Navbar;
