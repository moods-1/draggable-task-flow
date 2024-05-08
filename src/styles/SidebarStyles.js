import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
	sidebarMain: {
		color: '#FFF',
		minHeight: '100vh',
		backgroundColor: theme.palette.background.dark,
		'& .sidebar-brand': {
			width: '100%',
			color: '#000',
			display: 'flex',
			alignItems: 'center',
			gap: 5,
			padding: '0px 5px',
			height: theme.headerHeight,
			backgroundColor: theme.palette.background.light,
			overflow: 'hidden',
			'& img': {
				width: 30,
				height: 30,
			},
		},
		'& hr': {
			marginTop: '0rem',
			borderColor: theme.palette.primary.main,
		},
		'& .large': {
			width: '180px',
			fontSize: '13px',
			transition: 'width 300ms',
			padding: '0 5px',
		},
		'& .small': {
			width: '40px',
			transition: 'width 300ms',
			marginRight: '-5px',
			'& li': {
				borderRadius: '0px',
			},
		},
		'& ul': {
			minHeight: '88vh',
			listStyleType: 'none',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			'& li': {
				padding: '2px 10px',
				width: '100%',
				borderRadius: '3px',
				marginBottom: '3px',
				fontWeight: 500,
				cursor: 'pointer',
				'& span': {
					height: 30,
					gap: '10px',
					display: 'flex',
					alignItems: 'center',
				},
				'&:hover': {
					background: theme.palette.background.light,
					color: theme.palette.text.dark,
				},
				'& a': {
					textDecoration: 'none',
					color: theme.palette.text.light,
					'&:hover': {
						color: theme.palette.text.dark,
						background: theme.palette.background.light,
					},
				},
			},
			'& li:has(a.active)': {
				background: theme.palette.background.light,
				color: '#000',
				'& span': {
					color: '#000',
				},
			},
		},
	},
	controlDiv: {
		display: 'flex',
		justifyContent: 'flex-end',
		'& button': {
			color: theme.palette.text.light,
			border: 'none',
			borderRadius: '50%',
			backgroundColor: 'transparent',
			margin: '5px',
		},
	},
}));
