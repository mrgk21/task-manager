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

const Tasks = () => {
	const pending = useSelector(pendingTasksSelector);
	const completed = useSelector(completedTasksSelector);
	const dispatch = useDispatch();

	const onDragEnd: OnDragEndResponder = useCallback(
		({ source, destination, type }) => {
			if (!destination) return;
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
