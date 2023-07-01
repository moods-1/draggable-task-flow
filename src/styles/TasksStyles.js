import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	taskMain: {
		width: '100%',
		height: '100%',
		padding: '0px 20px 20px 20px',
		backgroundColor: theme.palette.background.dark,
		'& .High': {
			borderColor: theme.palette.red,
		},
		'& .Mid': {
			borderColor: theme.palette.warning.main,
		},
		'& .Low': {
			borderColor: theme.palette.primary.main,
		},
		'& p': {
			padding: 0,
			margin: 0,
		},
		'& .droppable-column': {
			minWidth: '330px',
			minHeight: '200px',
			border: 'none',
			borderRadius: '0px',
			background: 'rgba(33,33,44, 0.8)',
			'& .droppable-column-head': {
				position: 'relative',
				padding: 20,
				color: '#FFF',
				background: theme.palette.background.light,
				borderBottom: `1px solid ${theme.palette.background.dark}`,
				'& .droppable-column-head-qty': {
					position: 'absolute',
					top: 10,
					right: 15,
					background: theme.palette.background.dark,
					color: '#FFF',
					fontSize: '12px',
					width: 30,
					height: 30,
					borderRadius: '50%',
					display: 'grid',
					placeItems: 'center',
				},
			},
		},
		'& .droppable-column-div': {
			width: '100%',
			height: '100%',
		},
		'& .dragging-over': {
			background: '#334',
		},
	},
	taskContent: {
		justifyContent: 'left',
		padding: '0px',
		margin: 0,
		gap: 20,
	},
	dragItem: {
		position: 'relative',
		minWidth: '240px',
		maxWidth: '340px',
		margin: '20px',
		padding: '10px 20px',
		textAlign: 'center',
		borderRight: '5px solid #fff',
		backgroundColor: '#fff',
		fontSize: '15px',
		'& .task-header': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			gap: '10px',
			'& p:first-child': {
				fontWeight: 600,
			},
			'& p': {
				padding: 0,
				margin: 0,
				wordBreak: 'break-word',
			},
		},
		'& .MuiSvgIcon-root': {
			cursor: 'pointer',
		},
		'&:hover': {
			boxShadow: '0px 0px 5px #aaa',
		},
	},
	profile: {
		height: 40,
		width: 40,
		borderRadius: '50%',
	},
	// Task Filters
	filterMain: {
		'& .filter-content': {
			width: '100%',
			height: '0px',
			overflow: 'hidden',
			display: 'flex',
			alignItems: 'center',
			color: '#FFF',
			fontSize: '14px',
			background: theme.palette.background.light,
			marginBottom: '10px',
			paddingLeft: '10px',
			transition: 'height 300ms',
			'& .filter-subject-label': {
				marginRight: 10,
			},
			'& input': {
				marginBottom: '-3px',
			},
		},
		'& .filter-grow': {
			padding: '10px',
			height: '50px',
			transition: 'height 300ms',
		},
	},
}));
