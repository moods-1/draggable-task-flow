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

// Server
//const PORT = process.env.REACT_APP_SERVER_PORT;
//export const SERVER_BASE_URL = `http://localhost:${PORT}`;
export const SERVER_BASE_URL = 'https://task-dashboard-server.vercel.app';

export const SERVER_ROUTES = {
	USERS: {
		BASE: '/users/by/companyId',
		BY_COMPANY_ID: '/users/by/companyId',
		LOGIN: '/users/login',
		ADD_USER: '/users/add-user',
		UPDATE_USER:'/users/update-user',
	},
	COLUMNS: {
		BASE: '/columns',
		BY_COMPANY_ID: '/columns/by/companyId',
		MOVE_TASK_INTERNAL: '/columns/move-internal',
		MOVE_TASK_EXTERNAL: '/columns/move-external',
	},
	TASKS: {
		BASE: '/tasks',
		BY_COMPANY_ID:'/tasks/by/companyId',
		DUE_SOON: '/tasks/tasks-due-soon',
	},
	COMPANIES: {
		BASE: '/companies',
		BY_COMPANY_ID: '/companies/by/companyId',
	},
};

export const TASK_STATE_FILTERS = [
	{
		label: 'To Do',
		value: 'To Do',
	},
	{
		label: 'In Progress',
		value: 'In Progress',
	},
	{
		label: 'Complete',
		value: 'Complete',
	},
];

export const TASK_PRIORITY_FILTERS = [
	{
		label: 'High',
		value: 0,
	},
	{
		label: 'Mid',
		value: 1,
	},
	{
		label: 'Low',
		value: '2',
	},
];

export const MIXPANEL_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN;

export const CHART_COLORS = [
	'#777777',
	'#0275d8',
	'#aaaaaa',
	'#00ff77',
	'#0000ff',
	'#08c3f7',
	'#000000',
];

export const CHART_OPTIONS_MULTIPLE = [
	{ label: 'Bar', value: 'bar' },
	{ label: 'Bubble', value: 'bubble' },
	{ label: 'Bubble (Packed)', value: 'packedbubble' },
	{ label: 'Column', value: 'column' },
	{ label: 'Column (Stacked)', value: 'column', stacked: true },
	{ label: 'Column (Pyramid)', value: 'columnpyramid' },
	{ label: 'Line', value: 'line' },
];

export const CHART_OPTIONS_PIE = [
	{ label: 'Pie', value: 'pie' },
	{ label: 'Donut', value: 'donut' },
];
