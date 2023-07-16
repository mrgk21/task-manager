import { useCallback, useState } from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import TasksCompleted from "../../components/tasks.completed";
import TasksPending from "../../components/tasks.pending";
import { ITask } from "../../types";

const data: ITask[] = [
	{ _id: "i1", title: "hello guys", description: "abcd", isCompleted: false },
	{ _id: "i2", title: "hello again", description: "abcd123", isCompleted: true },
	{ _id: "i3", title: "hello random text", description: "abcd4545", isCompleted: false },
	{ _id: "i4", title: "end of list", description: "2fjaslkfj", isCompleted: false },
	{ _id: "i5", title: "hello again bro", description: "abcd123", isCompleted: true },
];

const Tasks = () => {
	const [pending, setPending] = useState(data.filter((item) => item.isCompleted));
	const [completed, setCompleted] = useState(data.filter((item) => !item.isCompleted));

	const onDragEnd: OnDragEndResponder = useCallback(
		({ source, destination, type }) => {
			if (!destination) return;
			console.log({ destination, source });

			if (
				destination.droppableId !== source.droppableId &&
				destination.index === source.index
			)
				return;

			switch (type) {
				case "pending": {
					const newList = structuredClone(pending) as ITask[];
					const [draggedItem] = newList.splice(source.index, 1);
					newList.splice(destination.index, 0, draggedItem);
					setPending(newList);
					break;
				}
				case "completed": {
					const newList = structuredClone(completed) as ITask[];
					const [draggedItem] = newList.splice(source.index, 1);
					newList.splice(destination.index, 0, draggedItem);
					setCompleted(newList);
					break;
				}
				default:
					return;
			}
		},
		[pending, completed],
	);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="flex justify-around">
				<TasksPending list={pending} />
				<TasksCompleted list={completed} />
			</div>
		</DragDropContext>
	);
};

export default Tasks;
