import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	modal: {
		'& .modal-content': {
			border: 'none',
		},
		'& .cancel-button':{
			background: theme.palette.background.light,
		}
	},
	modalHeader: {
		color: theme.palette.white,
		height: '50px',
		background: theme.palette.background.light,
		'& p': {
			marginTop: '-5px',
		},
	},
	modalBody: {
		position: 'relative',
		'& input, select, button': {
			boxShadow: 'none !important',
		},
		'& label': {
			fontWeight: 600,
			fontSize: '14px',
			marginBottom: '3px',
		},
	},
	modalProfileDiv: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: 30,
		marginBottom: '30px',
		'& img': {
			margin: '10px auto -20px',
			borderRadius: '50%',
		},
	},
	closeButton: {
		position: 'absolute',
		top: 5,
		right: 15,
		color: '#FFF',
	},
}));
