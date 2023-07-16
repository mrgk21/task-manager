import { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ITask } from "../types";
import Task from "./task";

interface Props {
	list: ITask[];
}

const MemoTask = memo(Task);

const TasksCompleted = ({ list }: Props) => {
	return (
		<Droppable droppableId="completed-tasks" type="completed">
			{(provided) => (
				<div
					{...provided.droppableProps}
					ref={provided.innerRef}
					className="border border-black space-y-4"
				>
					<h2 className="text-2xl">Completed Tasks</h2>
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

export default TasksCompleted;
