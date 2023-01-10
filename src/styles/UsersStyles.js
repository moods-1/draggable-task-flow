import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	usersMain: {
		width: '100%',
		height: '100%',
		padding: '0px 20px 20px 20px',
		backgroundColor: theme.palette.background.dark,
		'& p': {
			padding: 0,
			margin: 0,
		},
	},
	usersContent: {
		justifyContent: 'left',
		padding: '0px',
		margin: 0,
		gap: 20,
		'& table': {
			backgroundColor: '#FFF',
			'& thead': {
				background: theme.palette.background.light,
				fontSize: '14px',
				color: '#FFF',
				position: 'sticky',
				zIndex: 10,
				top: '-2px',
				'& td': {
					border: 'none',
				},
			},
			'& tbody': {
				fontSize: '14px',
				'& td': {
					verticalAlign: 'middle',
				},
			},
			'& img': {
				borderRadius: '50%',
			},
		},
	},
	tableTop: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginBottom: '20px',
	},
}));
