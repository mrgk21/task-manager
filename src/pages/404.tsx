import { useRouteError } from "react-router-dom";

const Error404 = () => {
	const error = useRouteError() as Error;
	console.error(typeof error);

	return <div>{error.message}</div>;
};

export default Error404;
