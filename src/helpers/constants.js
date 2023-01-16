export const TASK_LIST_PRIORITY = {
	0: 'High',
	1: 'Mid',
	2: 'Low',
};

export const TASK_LIST_PRIORITY_NUMBERS = {
	High: 0,
	Mid: 1,
	Low: 2,
};

export const TASK_NUMBER_COLORS = {
	0: 'red',
	1: 'orange',
	2: 'blue',
};

export const MENU_PRIORITY_BUTTONS = [
	{ label: 'High', color: 'danger' },
	{ label: 'Mid', color: 'warning' },
	{ label: 'Low', color: 'primary' },
];

export const SIDEBAR_PROGRESS_LABELS = ['To Do', 'In Progress', 'Complete'];

export const USERS_TABLE_HEADERS = [
	{ label: '', field: 'profile' },
	{ label: 'FIRST NAME', field: 'firstName', filterable: true },
	{ label: 'LAST NAME', field: 'lastName', filterable: true },
	{ label: 'EMAIL', field: 'email', filterable: true },
	{ label: 'PHONE', field: 'phoneNumber', filterable: true },
	{ label: 'Action', field: 'action', filterable: false },
];

export const NUMBER_REGEX = new RegExp(/[^\d]/g);

// export const SERVER_BASE_URL = 'http://localhost:8080';

export const SERVER_BASE_URL = 'https://task-dashboard-server-moods-1.vercel.app';

export const SERVER_ROUTES = {
	USERS: {
		BASE: '/users',
	},
	COLUMNS: {
		BASE: '/columns',
		MOVE_TASK_INTERNAL: '/columns/move-internal',
		MOVE_TASK_EXTERNAL: '/columns/move-external',
	},
	TASKS: {
		BASE: '/tasks',
	},
};
