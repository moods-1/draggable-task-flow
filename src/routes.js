import { PeopleAlt, List, Leaderboard } from '@mui/icons-material';
export const routes = [
	{
		title: 'TASKS',
		path: '/',
		icon: <List fontSize='small' />,
	},
	{
		title: 'USERS',
		path: '/users',
		icon: <PeopleAlt fontSize='small' />,
	},
	{
		title: 'CHARTS',
		path: '/charts',
		icon: <Leaderboard fontSize='small' />,
	},
];
