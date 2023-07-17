import { faBars, faCircleCheck, faExclamation, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../types";

interface Props {
	task: ITask;
	index: number;
}

const Task = ({ task: { id, description, title }, index }: Props) => {
	const [isCompleted, setIsCompleted] = useState(false);
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
							<p className="text-sm line-clamp-3">
								{description}
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industrys standard dummy text
								ever since the 1500s, when an unknown printer took a galley of type
								and scrambled it to make a type specimen book. It has survived not
								only five centuries, but also the leap into electronic typesetting,
								remaining essentially unchanged. It was popularised in the 1960s
								with the release of Letraset sheets containing Lorem Ipsum passages,
								and more recently with desktop publishing software like Aldus
								PageMaker including versions of Lorem Ipsum.
							</p>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Task;
