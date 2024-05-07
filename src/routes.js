import {
	PeopleAlt,
	Business,
	List,
	Leaderboard,
	Home,
} from '@mui/icons-material';

export const routes = [
	{
		title: 'HOME',
		path: '/',
		icon: <Home fontSize='small' />,
	},
	{
		title: 'TASKS',
		path: '/tasks',
		icon: <List fontSize='small' />,
	},
	{
		title: 'USERS',
		path: '/users',
		icon: <PeopleAlt fontSize='small' />,
	},
	{
		title: 'CUSTOMERS',
		path: '/customers',
		icon: <Business fontSize='small' />,
	},
	{
		title: 'CHARTS',
		path: '/charts',
		icon: <Leaderboard fontSize='small' />,
	},
];
