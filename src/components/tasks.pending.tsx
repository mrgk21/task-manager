import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ITask } from "../types";
import Task from "./task";

interface Props {
	list: ITask[];
}

const MemoTask = memo(Task);

const TasksPending = ({ list }: Props) => {
	return (
		<Droppable droppableId="pending-tasks" type="pending">
			{(provided) => (
				<div
					{...provided.droppableProps}
					ref={provided.innerRef}
					className="border border-black space-y-4"
				>
					<div className="flex text-2xl items-center w-full">
						<h2>Pending Tasks</h2>
						<FontAwesomeIcon
							icon={faSquarePlus}
							className="ml-auto hover:cursor-pointer hover:text-blue-500"
						/>
					</div>
					<div className="flex flex-col text-black p-2">
						{list.map((item, index) => (
							<MemoTask task={item} key={item._id} index={index} />
						))}
					</div>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default TasksPending;
