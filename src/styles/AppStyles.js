import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	appMain: {
		width: '100%',
		backgroundColor: '#000000',
	},
	appMainContainer: {
		maxWidth: '1920px',
		borderLeft: `1px solid ${theme.palette.background.light}`,
		borderRight: `1px solid ${theme.palette.background.light}`,
		margin: 'auto',
		overflowX: 'hidden',
		backgroundColor: theme.palette.background.dark,
		'&::-webkit-scrollbar': {
			width: 10,
			backgroundColor: '#05014a',
		},
		'&::-webkit-scrollbar-thumb': {
			background: '#05014a',
			borderRadius: 8,
			border: '3px solid #0275d8',
			minHeight: 70,
		},
	},
	appContainer: {
		width: '100%',
		display: 'flex',
		flexWrap: 'nowrap',
	},
	appContent: {
		flexGrow: 1,
	},
	contentHeader: {
		padding: '10px 0px',
		display: 'flex',
		fontSize: '14px',
		alignItems: 'center',
		justifyContent: 'space-between',
		color: '#FFF',
		marginBottom: '20px',
		borderBottom: `1px solid ${theme.palette.secondary.main}`,
		'& .content-header-title': {
			fontSize: '18px',
		},
		'& .content-header-subtitle': {
			fontSize: '13px',
		},
		'& button': {
			border: 'none',
			minWidth: '110px',
			height: '30px',
			background: theme.palette.background.light,
		},
	},
}));
