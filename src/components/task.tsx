import { faBars, faCircleCheck, faExclamation, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../types";

interface Props {
	task: ITask;
	index: number;
}

const Task = ({ task: { _id, description, title }, index }: Props) => {
	const [isCompleted, setIsCompleted] = useState(false);
	return (
		<Draggable draggableId={_id} index={index}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<div className="flex items-center p-2 px-5 space-x-3 dark:border-black border w-[500px] h-[50px] rounded-md shadow-lg ">
						<span {...provided.dragHandleProps}>
							<FontAwesomeIcon icon={faBars} />
						</span>
						<div className="flex flex-grow  items-center">
							<span className="text-xl">{title}</span>
							<div className="space-x-2 ml-auto">
								{isCompleted ? (
									<FontAwesomeIcon
										icon={faCircleCheck}
										className="text-green-500 hover:cursor-pointer w-[20px] text-center"
										onClick={() => setIsCompleted(false)}
									/>
								) : (
									<FontAwesomeIcon
										icon={faExclamation}
										className="text-yellow-500 hover:cursor-pointer w-[20px] text-center"
										onClick={() => setIsCompleted(true)}
									/>
								)}
								<span className="hover:text-red-500 hover:cursor-pointer">
									<FontAwesomeIcon icon={faTrash} />
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Task;
