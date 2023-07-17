import {
	faBars,
	faCircleCheck,
	faExclamation,
	faPen,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { taskGroupActions } from "../feaures/taskGroup/taskGroup.slice";
import { ITask } from "../types";

interface Props {
	task: ITask;
	index: number;
}

const Task = ({ task: { id, description, title, isCompleted }, index }: Props) => {
	const dispatch = useDispatch();

	const handleComplete = (val: boolean) => {
		dispatch(taskGroupActions.completeTask({ id, isCompleted: val }));
	};

	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<div className="flex items-center p-2 px-5 space-x-3 dark:border-black border w-[500px] rounded-md shadow-lg ">
						<span {...provided.dragHandleProps} className="mt-2.5 self-start w-[5%]">
							<FontAwesomeIcon icon={faBars} size="lg" />
						</span>
						<div className="flex flex-col w-[95%]">
							<div className="flex items-center mt-2">
								<span className="text-xl">{title}</span>
								<div className="space-x-2 ml-auto">
									<Link to={`edit/${id}`} relative="path">
										<FontAwesomeIcon
											icon={faPen}
											className="hover:text-lime-300 hover:cursor-pointer"
										/>
									</Link>
									{isCompleted ? (
										<FontAwesomeIcon
											icon={faCircleCheck}
											className="text-green-500 hover:cursor-pointer w-[20px] text-center"
											onClick={() => handleComplete(false)}
										/>
									) : (
										<FontAwesomeIcon
											icon={faExclamation}
											className="text-yellow-500 hover:cursor-pointer w-[20px] text-center"
											onClick={() => handleComplete(true)}
										/>
									)}

									<FontAwesomeIcon
										icon={faTrash}
										className="hover:text-red-500 hover:cursor-pointer"
									/>
								</div>
							</div>
							<p className="text-sm line-clamp-3">{description} </p>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Task;
