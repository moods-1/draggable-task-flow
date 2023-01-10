import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	sidebarMain: {
		color: '#FFF',
		backgroundColor: theme.palette.background.light,
		borderTop: `1px solid ${theme.palette.background.dark}`,
		borderRight: `2px solid ${theme.palette.background.light}`,
		'& hr': {
			marginTop: '0rem',
			borderColor: theme.palette.primary.main,
		},
		'& .large': {
			width: '180px',
			fontSize: '13px',
			transition: 'width 300ms',
		},
		'& .small': {
			width: '40px',
			transition: 'width 300ms',
			marginRight: '-5px',
		},
		'& ul': {
			listStyleType: 'none',
			'& li': {
				padding: '2px 10px',
				marginBottom: '1px',
				width: '100%',
				'&:hover': {
					background: theme.palette.secondary.dark,
				},
				'& a': {
					textDecoration: 'none',
					color: theme.palette.text.light,
					'& div': {
						height: 30,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					},
					'&:hover': {
						color: theme.palette.text.light,
						background: theme.palette.background.dark,
					},
				},
			},
			'& li:has(a.active)':{
				background: theme.palette.background.dark,
				color: theme.palette.info.main,
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
