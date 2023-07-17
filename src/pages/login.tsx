import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as yup from "yup";
import { isAuthSelector } from "../feaures/auth/auth.selectors";
import { authActions } from "../feaures/auth/auth.slice";
import { taskGroupActions } from "../feaures/taskGroup/taskGroup.slice";

interface CustomElements extends HTMLFormControlsCollection {
	username: HTMLInputElement;
	pass: HTMLInputElement;
}

interface TaskForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

const loginSchema = yup.object().shape({
	username: yup.string().min(3).defined().required(),
});

const Login = () => {
	const isAuthenticated = useSelector(isAuthSelector);
	const dispatch = useDispatch();

	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});

	const handleSubmit = async (event: FormEvent<TaskForm>) => {
		event.preventDefault();
		const { username } = event.currentTarget.elements;

		try {
			const result = await loginSchema.validate(
				{ username: username.value },
				{ abortEarly: false },
			);
			dispatch(authActions.loginUser(result.username));
			dispatch(taskGroupActions.init());
		} catch (error: unknown) {
			const errs: typeof errors = {};

			if (error instanceof yup.ValidationError) {
				error.inner.forEach((item) => {
					errs[item.path as string] = item.message;
				});
				setErrors(errs);
				return;
			}
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const errs = { ...errors };
		errs[event.target.name] = null;
		setErrors(errs);
	};

	if (isAuthenticated) return <Navigate to="/tasks" />;

	return (
		<div className="mx-auto max-w-lg space-y-2 mt-5">
			<h1 className="text-2xl">Login</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-2">
				<div className="flex flex-col">
					<label htmlFor="username">Whats your username?</label>
					{errors.username && (
						<label className="text-sm text-red-500">{errors.username}</label>
					)}
					<input
						type="text"
						name="username"
						id="username"
						placeholder="Enter username"
						onChange={handleChange}
						className="p-1"
					/>
				</div>

				<button type="submit" className="border border-black p-2 rounded-md">
					Login <FontAwesomeIcon icon={faArrowRightLong} />
				</button>
			</form>
		</div>
	);
};

export default Login;
