import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	chartsMain: {
		width: '100%',
		padding: '30px',
		minHeight: `calc(100vh - ${theme.headerHeight})`,
		'& .highcharts-data-table': {
			marginTop: '10px',
			color: '#FFFFFF',
			fontSize: '13px',
		},
		' & .highcharts-table-caption': {
			color: '#FFFFFF',
		},
	},
	chartsContent: {
		width: '100%',
		display: 'flex',
		gap: '20px',
		flexWrap: 'wrap',
	},
	chartBox: {
		minWidth: '480px',
		maxWidth: '480px',
		padding: 20,
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		borderRadius: 5,
		'& .chart-head': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '20px',
			background: theme.palette.background.light,
			'& select': {
				maxWidth: '200px',
				height: 30,
				padding: '0 0.75rem',
				outlineStyle: 'none',
			},
		},
	},
	label: {
		display: 'inline-block',
		color: '#FFFFFF',
	},
	selectionBox: {
		display: 'flex',
		alignItems: 'center',
		gap: '5px',
		fontSize: '14px',
		'& *': {
			padding: 0,
			margin: 0,
		},
		'& input': {
			marginBottom: '-2px',
			marginRight: '5px',
		},
	},
}));
