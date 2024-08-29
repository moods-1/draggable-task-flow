import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	homeMain: {
		width: '100%',
		height: `calc(100vh-${theme.headerHeight})`,
		padding: '40px 20px 20px',
		color: '#000',
		'& .chart-box': {
			width: '100%',
			borderRadius: 10,
			boxShadow: theme.boxShadow.mid,
		},
		'& .home-section-title': {
			fontSize: 16,
			fontWeight: 600,
		},
		'& .home-content': {
			marginTop: '-20px',
		},
		'& .section': {
			width: '100%',
			display: 'flex',
			alignItems: 'stretch',
			flexWrap: 'wrap',
			gap: '20px',
			'& .section-flex-1': {
				flex: 1,
				width: '100%',
				maxWidth: '480px',
				minWidth: '400px',
			},
			'& .section-flex-2': {
				flex: 1,
				display: 'flex',
				width: '100%',
			},
		},
		'& .customer-card-content': {
			display: 'flex',
			gap: '20px',
			flexDirection: 'column',
			alignItems: 'stretch',
			justifyContent: 'stretch',
			'& .slider-div': {
				height: '300px',
				width: '100%',
			},
			'& .license-card': {
				display: 'flex',
				gap: '15px',
				maxHeight: '70px',
				width: '100%',
				overflow: 'hidden',
				boxShadow: theme.boxShadow.small,
				borderRadius: '5px',
				paddingRight: '10px',
			},
			'& .details': {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '10px 0px',
				'& .name': {
					fontWeight: 500,
					marginBottom: 0,
				},
			},
			'& .image-div': {
				width: '70px',
				backgroundColor: 'red',
			},
		},
		'& .user-section': {
			marginTop: '20px',
			'& p': {
				fontWeight: 500,
			},
		},
	},
}));
