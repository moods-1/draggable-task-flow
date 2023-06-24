import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	headerMain: {
		width: '100vw',
		maxWidth: '1920px',
		height: '60px',
		padding: '10px 30px',
		backgroundColor: theme.palette.background.light,
		color: '#FFF',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
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
				'& p': {
					marginBottom: '5px',
				},
				'& .edit-div': {
					width: '100%',
					border: 'none',
					borderTop: '1px solid #777',
					borderRadius: 0,
					marginTop: '10px',
					background: theme.palette.background.light,
					cursor: 'pointer',
				},
			},
		},
	},
}));
