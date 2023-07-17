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
		<div className="border border-black space-y-4 p-2 mt-5 lg:w-fit w-[500px] rounded-lg h-fit">
			<h2 className="text-3xl font-semibold">Completed Tasks</h2>
			<div className="h-[60vh] overflow-y-scroll overflow-x-hidden">
				<Droppable droppableId="completed-tasks" type="completed">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							<div className="flex flex-col text-black p-2 pt-0 ">
								{list.map((item, index) => (
									<MemoTask task={item} key={item.id} index={index} />
								))}
							</div>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</div>
	);
};

export default TasksCompleted;
