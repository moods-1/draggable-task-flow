import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	taskMain: {
		width: '100%',
		height: `calc(100vh-${theme.headerHeight})`,
		padding: '0px 20px 20px 20px',
		backgroundColor: 'none',
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
			borderRadius: '10px',
			overflow: 'hidden',
			background: '#fff',
			boxShadow: theme.boxShadow.mid,
			'& .droppable-column-head': {
				position: 'relative',
				padding: 20,
				color: '#000',
				fontWeight: 600,
				background: theme.palette.background.mid,
				borderBottom: `1px solid ${theme.palette.secondary.light}`,
				'& .droppable-column-head-qty': {
					position: 'absolute',
					top: 10,
					right: 15,
					background: theme.palette.secondary.dark,
					color: '#fff',
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
			background: '#eee',
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
		borderRadius: '5px',
		backgroundColor: '#fff',
		boxShadow: theme.boxShadow.small,
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
			color: '#000',
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
