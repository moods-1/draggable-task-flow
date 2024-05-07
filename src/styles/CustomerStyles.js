import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	customersMain: {
		width: '100%',
		height: `calc(100vh-${theme.headerHeight})`, 
		padding: '0px 20px 20px 20px',
		backgroundColor: 'none',
		'& p': {
			padding: 0,
			margin: 0,
		},
	},
	customersContent: {
		justifyContent: 'left',
		padding: '0px',
		margin: 0,
		gap: 20,
	},
	tableTop: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginBottom: '20px',
	},
}));
