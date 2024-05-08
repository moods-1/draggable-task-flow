export const TASK_LIST_PRIORITY = {
	0: 'High',
	1: 'Mid',
	2: 'Low',
};

export const TASK_PRIORITY_COLORS = {
	Low: 'blue',
	Mid: 'orange',
	High: 'red',
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

export const TASK_COLORS = {
	'To Do': 'orange',
	'In Progress': 'green',
	Complete: 'red',
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
	{ label: 'LOGGEDIN', field: 'loggedIn', filterable: false },
	{ label: 'ACTION', field: 'action', filterable: false },
];

export const CUSTOMERS_TABLE_HEADERS = [
	{ label: '', field: 'profile' },
	{ label: 'CUSTOMER NAME', field: 'customerName', filterable: true },
	{ label: 'LICENSES', field: 'licensesPurchased', filterable: true },
	{ label: 'CITY', field: 'city', filterable: true },
	{ label: 'COUNTRY', field: 'country', filterable: true },
	{ label: 'EMAIL', field: 'email', filterable: true },
	{ label: 'PHONE', field: 'phoneNumber', filterable: true },
	{ label: 'ACTION', field: 'action', filterable: false },
];

export const NUMBER_REGEX = new RegExp(/[^\d]/g);

// Server
const PORT = process.env.REACT_APP_SERVER_PORT;
export const SERVER_BASE_URL = `http://localhost:${PORT}`;
// export const SERVER_BASE_URL = 'https://task-dashboard-server.vercel.app';

export const SERVER_ROUTES = {
	USERS: {
		BASE: '/users/by/companyId',
		USER_BY_ID: '/users/by/userId',
		BY_COMPANY_ID: '/users/by/companyId',
		LOGIN: '/users/login',
		ADD_USER: '/users/add-user',
		UPDATE_USER: '/users/update-user',
		LOGOUT_USER: '/users/logout-user',
	},
	COLUMNS: {
		BASE: '/columns',
		BY_COMPANY_ID: '/columns/by/companyId',
		MOVE_TASK_INTERNAL: '/columns/move-internal',
		MOVE_TASK_EXTERNAL: '/columns/move-external',
	},
	TASKS: {
		BASE: '/tasks',
		BY_COMPANY_ID: '/tasks/by/companyId',
		DUE_SOON: '/tasks/tasks-due-soon',
	},
	COMPANIES: {
		BASE: '/companies',
		BY_COMPANY_ID: '/companies/by/companyId',
	},
	CUSTOMERS: {
		BASE: '/customers',
		ADD_CUSTOMER: '/customers/add-customer',
		UPDATE_CUSTOMER: '/customers/update-customer',
		BY_CUSTOMER_ID: '/customers/by/customerId',
		TOP_BY_LICENSES: '/customers/top-by-licenses'
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
	'#00ff77',
	'#0000ff',
	'#08c3f7',
	'#000000',
	'#777777',
	'#0275d8',
	'#aaaaaa',
];

export const CHART_OPTIONS_MULTIPLE = [
	{ label: 'Area', value: 'area' },
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

export const HOME_SALES_DATA_SERIES = [
	{
		name: 'USA',
		data: [
			2, 9, 13, 50, 170, 299, 438, 841, 1169, 1703, 2422, 3692, 5543, 7345,
			12298, 18638, 22229, 25540, 28133, 29463, 31139, 31175, 31255, 29561,
			27552, 26008, 25830, 26516, 27835, 28537, 27519, 25914, 25542, 24418,
			24138, 24104, 23208, 22886, 23305, 23459, 23368, 23317, 23575, 23205,
			22217, 21392, 19008, 13708, 11511, 10979, 10904, 11011, 10903, 10732,
			10685, 10577, 10526, 10457, 10027, 8570, 8360, 7853, 5709, 5273, 5113,
			5066, 4897, 4881, 4804, 4717, 4571, 4018, 3822, 3785, 2500,
		],
		pointStart: 1662508800000,
		pointInterval: 604800000,
	},
	{
		name: 'England',
		data: [
			1, 5, 25, 50, 120, 150, 200, 426, 660, 863, 1048, 1627, 2492, 3346, 4259,
			5242, 6144, 7091, 8400, 9490, 10671, 11736, 13279, 14600, 15878, 17286,
			19235, 22165, 24281, 26169, 28258, 30665, 32146, 33486, 35130, 36825,
			38582, 40159, 38107, 36538, 35078, 32980, 29154, 26734, 24403, 21339,
			18179, 15942, 15442, 14368, 13188, 12188, 11152, 10114, 9076, 8038, 7000,
			6643, 6286, 5929, 5527, 5215, 4858, 4750, 4650, 4600, 4500, 4490, 4300,
			4350, 4330, 4310, 4495, 4477, 4000,
		],
		pointStart: 1662508800000,
		pointInterval: 604800000,
	},
	{
		name: 'Canada',
		data: [
			0, 1, 5, 15, 32, 55, 88, 129, 181, 243, 316, 401, 498, 609, 733, 871,
			1024, 1191, 1374, 1573, 1788, 2020, 2270, 2536, 2821, 3125, 3446, 3787,
			4148, 4528, 4929, 5350, 5792, 6255, 6740, 7247, 7776, 8327, 8901, 9498,
			10119, 10763, 11432, 12124, 12841, 13584, 14351, 15144, 15962, 16807,
			17677, 18574, 19498, 20449, 21428, 22434, 23467, 24529, 25619, 26738,
			27885, 29061, 30267, 31502, 32768, 34063, 35388, 36744, 38130, 39547,
			40996, 42476, 43987, 45530, 47106,
		],
		pointStart: 1662508800000,
		pointInterval: 604800000,
	},
];
