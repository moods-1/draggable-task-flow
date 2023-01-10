import { Carl, Bean, Dave, Jean } from '../images';

export const COLUMNS = {
	'col-1': {
		id: 'col-1',
		title: 'To Do',
		taskIds: ['001', '002'],
	},
	'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['004', '005'] },
	'col-3': { id: 'col-3', title: 'Complete', taskIds: ['003'] },
};

export const USERS = [
	{
		id: '001',
		image: Carl,
		firstName: 'Carl',
		lastName: 'Moodie',
		email: 'carl.moodie@moods.ca',
		phoneNumber: '4161234567',
		assignedTasks: [],
	},
	{
		id: '002',
		image: Jean,
		firstName: 'Jean',
		lastName: 'Simmons',
		email: 'jean.simmons@moods.ca',
		phoneNumber: '6471234567',
		assignedTasks: [],
	},
	{
		id: '003',
		image: Dave,
		firstName: 'Dave',
		lastName: 'Jones',
		email: 'dave.jones@moods.ca',
		phoneNumber: '9051234567',
		assignedTasks: [],
	},
	{
		id: '004',
		image: Bean,
		firstName: 'Bean',
		lastName: 'Mann',
		email: 'bean.mann@moods.ca',
		phoneNumber: '4161234567',
		assignedTasks: [],
	},
];

export const TASKS = {
	'001': {
		assignor: USERS[0],
		id: '001',
		complete: false,
		priority: 0,
		assignee: USERS[0],
		state: 'To Do',
		taskTitle: 'Updated users in MongoDB',
		dueDate: '2023-2-24',
	},
	'002': {
		assignor: USERS[2],
		id: '002',
		complete: false,
		priority: 1,
		assignee: USERS[1],
		state: 'To Do',
		taskTitle: 'Refactor front-end code',
		dueDate: '2023-2-24',
	},
	'003': {
		assignor: USERS[3],
		id: '003',
		complete: false,
		priority: 2,
		assignee: USERS[2],
		state: 'Complete',
		taskTitle: 'Redisgned the UI/UX',
		dueDate: '2023-2-24',
	},
	'004': {
		assignor: USERS[2],
		id: '004',
		complete: false,
		priority: 0,
		assignee: USERS[3],
		state: 'In Progress',
		taskTitle: 'Update the S3 bucket',
		dueDate: '2023-2-24',
	},
	'005': {
		assignor: USERS[0],
		id: '005',
		complete: false,
		priority: 0,
		assignee: USERS[1],
		state: 'In Progress',
		taskTitle: 'Testing 123...',
		dueDate: '2023-2-24',
	},
};