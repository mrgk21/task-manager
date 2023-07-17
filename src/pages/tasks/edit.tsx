import { faArrowLeftLong, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { getTaskSelector } from "../../feaures/taskGroup/taskGroup.selectors";
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

const EditTask = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const task = useSelector(getTaskSelector(id as string, false));
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
				taskGroupActions.updateTask({
					id: id as string,
					isCompleted: false,
					task: { ...result },
				}),
			);
			navigate("/tasks");
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

	if (!task) throw new Error("task not found");

	return (
		<div className="mx-auto max-w-lg space-y-2">
			<h1 className="text-2xl">Edit your task</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-2" ref={ref}>
				<div className="flex flex-col">
					<label htmlFor="task_title">Enter a title</label>
					{errors.title && (
						<label htmlFor="task_title" className="text-red-500 text-sm">
							{errors.title}
						</label>
					)}
					<input
						type="text"
						name="title"
						id="task_title"
						className="p-1"
						defaultValue={task.title}
						onChange={handleChange}
					/>
				</div>

				<div className="flex flex-col">
					<label htmlFor="task_description">Enter a description</label>
					{errors.description && (
						<label htmlFor="task_description" className="text-red-500 text-sm">
							{errors.description}
						</label>
					)}
					<input
						type="text"
						name="description"
						id="task_description"
						className="p-1"
						defaultValue={task.description}
						onChange={handleChange}
					/>
				</div>
				<button type="submit" className="border border-black p-2 rounded-md">
					Save <FontAwesomeIcon icon={faFloppyDisk} />
				</button>
			</form>
			<Link to="/tasks" tabIndex={0} className="underline">
				<FontAwesomeIcon icon={faArrowLeftLong} /> Go back to tasks
			</Link>
		</div>
	);
};

export default EditTask;
