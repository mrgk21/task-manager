import { useCallback } from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import TasksCompleted from "../../components/tasks.completed";
import TasksPending from "../../components/tasks.pending";
import {
	completedTasksSelector,
	pendingTasksSelector,
} from "../../feaures/taskGroup/taskGroup.selectors";
import { taskGroupActions } from "../../feaures/taskGroup/taskGroup.slice";
import { ITask } from "../../types";

const data: ITask[] = [
	{ id: "i1", title: "hello guys", description: "abcd", isCompleted: false },
	{ id: "i2", title: "hello again", description: "abcd123", isCompleted: true },
	{ id: "i3", title: "hello random text", description: "abcd4545", isCompleted: false },
	{ id: "i4", title: "end of list", description: "2fjaslkfj", isCompleted: false },
	{ id: "i5", title: "hello again bro", description: "abcd123", isCompleted: true },
];

const Tasks = () => {
	const pending = useSelector(pendingTasksSelector);
	const completed = useSelector(completedTasksSelector);
	const dispatch = useDispatch();

	console.log({ pending, completed });

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
					dispatch(
						taskGroupActions.reorderTasks({
							prevInd: source.index,
							nextInd: destination.index,
							completed: false,
						}),
					);
					break;
				}
				case "completed": {
					dispatch(
						taskGroupActions.reorderTasks({
							prevInd: source.index,
							nextInd: destination.index,
							completed: true,
						}),
					);
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
				<TasksPending list={pending ?? []} />
				<TasksCompleted list={completed ?? []} />
			</div>
		</DragDropContext>
	);
};

export default Tasks;
