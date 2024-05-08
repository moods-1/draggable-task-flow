import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	appMain: {
		width: '100%',
		maxWidth: '1920px',
		margin: '0 auto',
		height: '100vh',
		backgroundColor: '#fefefe',
		color: '#000',
		borderRight: `1px solid ${theme.palette.background.dark}`,
		borderLeft: `1px solid ${theme.palette.background.dark}`,
		'& .MuiButton, .btn': {
			boxShadow: 'none!important',
		},
		'& .form-control': {
			boxShadow: 'none!important',
		},
		'& table': {
			backgroundColor: '#FFF',
			'& thead': {
				background: theme.palette.background.mid,
				fontSize: '13px',
				fontWeight: 600,
				color: '#000',
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
				'& .more-button': {
					border: 'none',
					background: 'transparent',
					outlineStyle: 'none',
				},
			},
		},
	},
	appMainContainer: {
		maxWidth: '1920px',
		height: '100vh',
		borderLeft: `1px solid ${theme.palette.background.light}`,
		borderRight: `1px solid ${theme.palette.background.light}`,
		margin: 'auto',
		overflowX: 'hidden',
		backgroundColor: 'none',
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
		height: '100vh',
		overflowY: 'auto',
	},
	contentHeader: {
		padding: '10px 0px',
		display: 'flex',
		fontSize: '14px',
		alignItems: 'center',
		justifyContent: 'space-between',
		color: '#000',
		marginBottom: '20px',
		'& .content-header-title': {
			fontSize: '22px',
			fontWeight: 600,
			marginBottom: 0,
		},
		'& .content-header-subtitle': {
			fontSize: '15px',
		},
		'& button': {
			border: 'none',
			minWidth: '110px',
			height: '30px',
			background: theme.palette.background.dark,
			'&:disabled': {
				opacity: 0.8,
			},
		},
	},
}));
