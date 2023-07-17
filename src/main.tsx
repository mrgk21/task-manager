import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Init from "./components/init";
import { loginRoute, rootRoute, taskRoute } from "./pages/root.route";
import "./styles/index.css";

const router = createBrowserRouter([rootRoute, loginRoute, taskRoute]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Init>
		<RouterProvider router={router} />
	</Init>,
);
