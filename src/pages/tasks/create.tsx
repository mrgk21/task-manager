import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import * as yup from "yup";
import { taskGroupActions } from "../../feaures/taskGroup/taskGroup.slice";

interface CustomElements extends HTMLFormControlsCollection {
	title: HTMLInputElement;
	description: HTMLInputElement;
}

interface TaskForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

const taskSchema = yup.object().shape({
	title: yup.string().min(3).defined().required(),
	description: yup.string().min(3).defined().required(),
});

const CreateTask = () => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
	const ref = useRef<HTMLFormElement>(null);

	const handleSubmit = async (event: FormEvent<TaskForm>) => {
		event.preventDefault();
		const { title, description } = event.currentTarget.elements;

		try {
			const result = await taskSchema.validate(
				{
					title: title.value,
					description: description.value,
				},
				{ abortEarly: false },
			);
			dispatch(
				taskGroupActions.createTask({
					task: { id: uuid(), isCompleted: false, ...result },
				}),
			);
			ref.current?.reset();
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

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const errs = { ...errors };
		errs[event.target.name] = null;
		setErrors(errs);
	};

	return (
		<div className="mx-auto max-w-lg space-y-2 mt-5">
			<h1 className="text-3xl font-semibold">Create a new task</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-2" ref={ref}>
				<div className="flex flex-col shadow-lg">
					<label htmlFor="task_title" className="underline underline-offset-1">
						Enter a title
					</label>
					{errors.title && (
						<label htmlFor="task_title" className="text-red-500 text-xs">
							{errors.title}
						</label>
					)}
					<input
						type="text"
						name="title"
						id="task_title"
						className="p-1 border border-black rounded-sm focus:border-slate-300"
						onChange={handleChange}
					/>
				</div>

				<div className="flex flex-col shadow-lg">
					<label htmlFor="task_description" className="underline underline-offset-1">
						Enter a description
					</label>
					{errors.description && (
						<label htmlFor="task_description" className="text-red-500 text-xs">
							{errors.description}
						</label>
					)}
					<textarea
						name="description"
						id="task_description"
						className="p-1 border border-black rounded-sm focus:border-slate-300"
						rows={4}
						onChange={handleChange}
					/>
				</div>
				<button
					type="submit"
					className="border border-black p-2 rounded-md hover:bg-slate-300 focus:bg-slate-300"
				>
					Create a task
				</button>
			</form>
			<Link to="/tasks" tabIndex={0} className="underline">
				<FontAwesomeIcon icon={faArrowLeftLong} /> Go back to tasks
			</Link>
		</div>
	);
};

export default CreateTask;
