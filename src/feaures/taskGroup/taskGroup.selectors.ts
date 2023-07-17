import { RootState } from "../store";

export const pendingTasksSelector = (state: RootState) => state.taskGroup.pending;
export const completedTasksSelector = (state: RootState) => state.taskGroup.completed;
