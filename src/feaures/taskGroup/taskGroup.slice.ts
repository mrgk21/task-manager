import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskGroup } from "../../types";

const initialState: ITaskGroup = {};

const initState: ITaskGroup[""] = {
	completed: [],
	pending: [],
	owner: "",
};

const taskGroupSlice = createSlice({
	name: "taskGroup",
	initialState,
	reducers: {
		init: (state) => {
			const owner = localStorage.getItem("currentUser") ?? "";
			if (!state[owner]) state[owner] = initState;
		},
		createTask: (state, action: PayloadAction<{ task: ITask }>) => {
			const { task } = action.payload;
			const owner = localStorage.getItem("currentUser") ?? "";
			state[owner].pending = [...(state[owner].pending ?? []), task];
		},
		deleteTask: (state, action: PayloadAction<{ id: string; isCompleted: boolean }>) => {
			const { id, isCompleted } = action.payload;
			const owner = localStorage.getItem("currentUser") ?? "";
			if (isCompleted) {
				const newCompleted = state[owner].completed.filter((item) => item.id !== id);
				state[owner].completed = newCompleted;
			} else {
				const newPending = state[owner].pending.filter((item) => item.id !== id);
				state[owner].pending = newPending;
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
			const owner = localStorage.getItem("currentUser") ?? "";

			if (isCompleted) {
				const index = state[owner].completed.findIndex((item) => item.id === id);
				if (title) state[owner].completed[index].title = title;
				if (description) state[owner].completed[index].description = description;
			} else {
				const index = state[owner].pending.findIndex((item) => item.id === id);
				if (title) state[owner].pending[index].title = title;
				if (description) state[owner].pending[index].description = description;
			}
		},
		completeTask: (state, action: PayloadAction<{ id: string; isCompleted: boolean }>) => {
			const { id, isCompleted } = action.payload;
			const owner = localStorage.getItem("currentUser") ?? "";
			if (isCompleted) {
				// if isCompleted is true, meaning task was previously pending
				const index = state[owner].pending.findIndex((item) => item.id === id);
				const newList = state[owner].pending;
				const [item] = newList.splice(index, 1);
				item.isCompleted = true;
				state[owner].pending = newList;
				state[owner].completed = [...state[owner].completed, item];
			} else {
				// if isCompleted is false, meaning task was previously completed
				const index = state[owner].completed.findIndex((item) => item.id === id);
				const newList = state[owner].completed;
				const [item] = newList.splice(index, 1);
				item.isCompleted = false;
				state[owner].completed = newList;
				state[owner].pending = [...state[owner].pending, item];
			}
		},
		reorderTasks: (
			state,
			action: PayloadAction<{ prevInd: number; nextInd: number; completed: boolean }>,
		) => {
			const { nextInd, prevInd, completed } = action.payload;
			const owner = localStorage.getItem("currentUser") ?? "";
			if (completed) {
				const newList = state[owner].completed;
				const [draggedItem] = newList.splice(prevInd, 1);
				newList.splice(nextInd, 0, draggedItem);
				state[owner].completed = newList;
			} else {
				const newList = state[owner].pending;
				const [draggedItem] = newList.splice(prevInd, 1);
				newList.splice(nextInd, 0, draggedItem);
				state[owner].pending = newList;
			}
		},
	},
});

export const taskGroupActions = taskGroupSlice.actions;
export const taskGroupReducer = taskGroupSlice.reducer;
