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
		createTask: (state, action: PayloadAction<{ task: ITask; owner: string }>) => {
			const { task, owner } = action.payload;
			state.pending = [...state.pending, task];
			state.owner = owner;
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
		updateTask: (
			state,
			action: PayloadAction<{
				id: string;
				isCompleted: boolean;
				task: Partial<Omit<ITask, "id" | "isCompleted">>;
			}>,
		) => {
			const { id, task, isCompleted } = action.payload;
			const { title, description } = task;
			if (isCompleted) {
				const index = state.completed.findIndex((item) => item.id === id);
				if (title) state.completed[index].title = title;
				if (description) state.completed[index].description = description;
			} else {
				const index = state.pending.findIndex((item) => item.id === id);
				if (title) state.pending[index].title = title;
				if (description) state.pending[index].description = description;
			}
		},
		completeTask: (state, action: PayloadAction<{ id: string; isCompleted: boolean }>) => {
			const { id, isCompleted } = action.payload;
			if (isCompleted) {
				// if isCompleted is true, meaning task was previously pending
				const index = state.pending.findIndex((item) => item.id === id);
				const newList = state.pending;
				const [item] = newList.splice(index, 1);
				item.isCompleted = true;
				state.pending = newList;
				state.completed = [...state.completed, item];
			} else {
				// if isCompleted is false, meaning task was previously completed
				const index = state.completed.findIndex((item) => item.id === id);
				const newList = state.completed;
				const [item] = newList.splice(index, 1);
				item.isCompleted = false;
				state.completed = newList;
				state.pending = [...state.pending, item];
			}
		},
		reorderTasks: (
			state,
			action: PayloadAction<{ prevInd: number; nextInd: number; completed: boolean }>,
		) => {
			const { nextInd, prevInd, completed } = action.payload;
			if (completed) {
				const newList = state.completed;
				const [draggedItem] = newList.splice(prevInd, 1);
				newList.splice(nextInd, 0, draggedItem);
				state.completed = newList;
			} else {
				const newList = state.pending;
				const [draggedItem] = newList.splice(prevInd, 1);
				newList.splice(nextInd, 0, draggedItem);
				state.pending = newList;
			}
		},
	},
});

export const taskGroupActions = taskGroupSlice.actions;
export const taskGroupReducer = taskGroupSlice.reducer;
