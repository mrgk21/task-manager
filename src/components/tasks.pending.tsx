import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { ITask } from "../types";
import Task from "./task";

interface Props {
	list: ITask[];
}

const MemoTask = memo(Task);

const TasksPending = ({ list }: Props) => {
	return (
		<div className="border border-black space-y-4 p-2 mt-5 lg:w-fit rounded-lg h-fit w-[500px] ">
			<div className="text-3xl flex space-x-3 items-center w-full">
				<h2 className="font-semibold">Pending Tasks</h2>
				<Link to="/tasks/create">
					<FontAwesomeIcon
						icon={faSquarePlus}
						className="hover:cursor-pointer hover:text-blue-500"
					/>
				</Link>
			</div>
			<div className="h-[60vh] overflow-y-scroll overflow-x-hidden">
				<Droppable droppableId="pending-tasks" type="pending">
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

export default TasksPending;
