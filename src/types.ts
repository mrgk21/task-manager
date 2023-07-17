export interface ITaskGroup {
	[k: string]: {
		completed: ITask[];
		pending: ITask[];
		owner: string | null;
	};
}

export interface ITask {
	id: string;
	isCompleted: boolean;
	title: string;
	description: string;
}

export interface IAuth {
	users: string[];
	isAuthenticated: boolean;
	currentUser: string | null;
}
