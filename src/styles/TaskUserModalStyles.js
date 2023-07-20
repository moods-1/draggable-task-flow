import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	modal: {
		'& .modal-content': {
			border: 'none',
		},
		'& .cancel-button': {
			background: theme.palette.background.light,
		},
		'& .MuiTextField-root': {
			'& .Mui-disabled': {
				opacity: 1,
				color: '#555 !important',
			},
			'& select, input, label': {
				'&:disabled': {
					opacity: 1,
					'-webkit-text-fill-color': '#555',
				},
			},
		},
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
		'& .assignee-box': {
			position: 'relative',
			display: 'flex',
			alignItems: 'center',
			justtifyContent: 'center',
			flexDirection: 'column',
			textAlign: 'center',
		},
		'& .user-selection-box': {
			width: '100%',
			height: 'auto',
			minHeight: '100px',
			maxHeight: '200px',
			overflowY: 'auto',
			margin: '20px 0px',
			padding: '5px',
			fontSize: '14px',
			cursor: 'pointer',
			'&::-webkit-scrollbar': {
				width: '7px',
				borderRadius: '8px',
				backgroundColor: '#DDD',
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: '#334',
				borderRadius: '8px',
				border: 'none',
				minHeight: '50px',
			},
			'& .user-selection-item': {
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: '10px',
				padding: '0px 10px',
				boxShadow: '0px 0px 5px #DDD',
			},
			'& .user-selection-empty-message': {
				width: '100%',
				height: '100%',
				display: 'grid',
				placeItems: 'center',
			},
		},
		'& .MuiButtonBase-root': {
			'&:hover': {
				backgroundColor: 'transparent',
			},
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
	topProfile: {
		height: 80,
		width: 80,
		margin: '20px auto',
		borderRadius: '50%',
	},
	listProfile: {
		height: 35,
		width: 35,
		margin: '5px 0px',
		borderRadius: '50%',
	},
	closeButton: {
		position: 'absolute',
		top: 5,
		right: 15,
		color: '#FFF',
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
}));
