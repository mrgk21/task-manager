import { RootState } from "../store";

export const pendingTasksSelector = (state: RootState) => state.taskGroup.pending;
export const completedTasksSelector = (state: RootState) => state.taskGroup.completed;
export const getTaskSelector = (id: string, isCompleted: boolean) => {
	if (isCompleted) {
		return (state: RootState) => {
			const index = state.taskGroup.completed.findIndex((item) => item.id === id);
			return state.taskGroup.completed[index];
		};
	} else {
		return (state: RootState) => {
			const index = state.taskGroup.pending.findIndex((item) => item.id === id);
			return state.taskGroup.pending[index];
		};
	}
};
