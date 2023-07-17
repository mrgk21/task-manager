import { RootState } from "../store";

export const pendingTasksSelector = (state: RootState) => {
	const owner = localStorage.getItem("currentUser") ?? "";
	return state.taskGroup[owner]?.pending;
};
export const completedTasksSelector = (state: RootState) => {
	const owner = localStorage.getItem("currentUser") ?? "";
	return state.taskGroup[owner]?.completed;
};
export const getTaskSelector = (id: string, isCompleted: boolean) => {
	const owner = localStorage.getItem("currentUser") ?? "";
	if (isCompleted) {
		return (state: RootState) => {
			const index = state.taskGroup[owner].completed.findIndex((item) => item.id === id);
			return state.taskGroup[owner]?.completed[index];
		};
	} else {
		return (state: RootState) => {
			const index = state.taskGroup[owner].pending.findIndex((item) => item.id === id);
			return state.taskGroup[owner]?.pending[index];
		};
	}
};
