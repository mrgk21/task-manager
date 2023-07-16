import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loginRoute, taskRoute } from "./pages/root.route";
import "./styles/index.css";

const router = createBrowserRouter([loginRoute, taskRoute]);

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
