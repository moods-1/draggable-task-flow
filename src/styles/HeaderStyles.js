import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	headerMain: {
		width: '100vw',
		maxWidth: '1920px',
		height: theme.headerHeight,
		padding: '10px 30px',
		backgroundColor: theme.palette.background.light,
		color: '#FFF',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		'& .header-brand-logo': {
			width: '40px',
			height: '40px',
			overflow: 'hidden',
		},
		'& p': {
			padding: 0,
			margin: 0,
		},
		'& .header-large-title': {
			fontSize: '26px',
		},
		'& .header-profile': {
			position: 'relative',
			'& img': {
				cursor: 'pointer',
				borderRadius: '50%',
			},
			'& .header-user-details': {
				minWidth: 140,
				maxWidth: 200,
				height: 'auto',
				minHeight: 60,
				listStyle: 'none',
				border: '1px solid #777',
				borderTop: 'none',
				position: 'absolute',
				right: '-28px',
				top: 50,
				zIndex: 1000,
				textAlign: 'center',
				fontSize: '14px',
				color: '#FFF',
				background: theme.palette.background.light,
				'& li': {
					marginBottom: '5px',
				},
				'& .action': {
					cursor: 'pointer',
					'&:hover': {
						color: theme.palette.primary.main,
					},
				},
			},
		},
	},
}));
