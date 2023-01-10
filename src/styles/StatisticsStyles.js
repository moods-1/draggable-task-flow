import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	statisticsMain: {
		width: '100%',
		padding: '0px',
		color: '#FFF',
		marginBottom: '20px',
	},
	statisticsContent: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 20,
		'& .statistics-section-title': {
			fontSize: '14px',
			marginBottom: '5px',
		},
		'& .statistics-box': {
			display: 'flex',
			gap: 20,

			'& .statistic-box': {
				'& .statistic-header': {
					width: '100%',
					background: theme.palette.text.light,
					color: theme.palette.text.dark,
					padding: '10px 0px',
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
				'& .priority-header': {
					background: theme.palette.background.light,
					color: '#FFF',
					padding: '10px 0px',
				},
				textAlign: 'center',
				width: '140px',
				height: '140px',
				padding: '0px',
				color: theme.palette.background.dark,
				backgroundColor: '#FFF',
				'& p:nth-child(2)': {
					marginTop: '15px',
					fontSize: '40px',
				},
			},
		},
	},
}));
