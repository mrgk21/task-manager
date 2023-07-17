import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskGroup } from "../../types";

const initialState: ITaskGroup = {
	completed: [],
	pending: [],
	owner: null,
};

const taskGroupSlice = createSlice({
	name: "taskGroup",
	initialState,
	reducers: {
		createTask: (state, action: PayloadAction<{ task: ITask }>) => {
			const { task } = action.payload;
			state.pending = [...state.pending, task];
		},
		deleteTask: (state, action: PayloadAction<{ id: string; completed: boolean }>) => {
			const { id, completed } = action.payload;
			if (completed) {
				const newCompleted = state.completed.filter((item) => item.id !== id);
				state.completed = newCompleted;
			} else {
				const newPending = state.pending.filter((item) => item.id !== id);
				state.pending = newPending;
			}
		},
		updateTask: (state, action: PayloadAction<{ id: string; task: ITask }>) => {
			const { id, task } = action.payload;
			const { title, description, isCompleted } = task;
			if (task.isCompleted) {
				const index = state.completed.findIndex((item) => item.id === id);
				Object.assign(state.completed[index], { title, description, isCompleted });
			} else {
				const index = state.pending.findIndex((item) => item.id === id);
				Object.assign(state.pending[index], { title, description, isCompleted });
			}
		},
	},
});

export const taskGroupActions = taskGroupSlice.actions;
export const taskGroupReducer = taskGroupSlice.reducer;
