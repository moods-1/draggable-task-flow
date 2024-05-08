import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	headerMain: {
		width: '100%',
		height: theme.headerHeight,
		padding: '5px 30px',
		backgroundColor: theme.palette.background.dark,
		color: '#fff',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '20px',
		position: 'sticky',
		top: 0,
		zIndex: 1000,
		'& p': {
			padding: 0,
			margin: 0,
		},
		'& .header-text': {
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			'& .header-title': {
				fontSize: '18px',
				fontWeight: 600,
				marginBottom: 0,
				display: 'inline',
				marginRight: '5px',
			},
			'& .header-subtitle': {
				fontSize: '18px',
			},
		},
		'& .header-profile': {
			position: 'relative',
			'& img': {
				cursor: 'pointer',
				borderRadius: '50%',
			},
			'& .header-user-details': {
				width: 'auto',
				minWidth: 160,
				maxWidth: 300,
				padding: '0px 10px 10px',
				height: 'auto',
				minHeight: 60,
				listStyle: 'none',
				borderTop: 'none',
				borderBottomLeftRadius: '7px',
				position: 'absolute',
				right: '-30px',
				top: 40,
				zIndex: 1000,
				textAlign: 'left',
				fontSize: '14px',
				color: '#FFF',
				background: theme.palette.background.dark,
				'& li': {
					padding: '2px 10px',
					width: '100%',
					borderRadius: '3px',
					marginBottom: '3px',
				},
				'& .action': {
					cursor: 'pointer',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					'&:hover': {
						fontWeight: 500,
						background: theme.palette.background.light,
						color: theme.palette.text.dark,
					},
					'& svg': {
						fontSize: '17px',
					},
				},
			},
		},
	},
}));
