import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	statisticsMain: {
		width: '100%',
		padding: '0px',
		color: '#000',
		marginBottom: '20px',
	},
	statisticsContent: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 20,
		'& .statistics-section-title': {
			fontSize: '16px',
			fontWeight: 600,
			marginBottom: '5px',
		},
		'& .statistics-box': {
			display: 'flex',
			gap: 20,			
			'& .statistic-box': {
				borderRadius: '10px',
				boxShadow: theme.boxShadow.mid,
				'& .statistic-header': {
					width: '100%',
					padding: '10px 0px',
					color: '#000',
					fontWeight: 600,
					backgroundColor: theme.palette.background.mid,
				},
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				gap: 10,
				alignItems: 'center',
				width: '140px',
				height: '140px',
				backgroundColor: theme.palette.background.light,
			},
			'& .priority-box': {
				color: '#fff',
				borderRadius: '10px',
				boxShadow: theme.boxShadow.mid,
				'& .priority-header': {
					padding: '10px 0px',
					color: '#000',
					fontWeight: 600,
					backgroundColor: theme.palette.background.mid,
				},
				textAlign: 'center',
				width: '140px',
				height: '140px',
				padding: '0px',
				backgroundColor: '#FFF',
				'& p:nth-child(2)': {
					marginTop: '15px',
					fontSize: '40px',
				},
			},
		},
	},
}));
