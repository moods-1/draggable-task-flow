import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	chartsMain: {
		width: '100%',
		padding: '30px',
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
		gap: '30px',
		flexWrap: 'wrap',
	},
	chartBox: {
		minWidth: '300px',
		flex: 1,
	},
	label: {
		display: 'inline-block',
		color: '#FFFFFF',
	},
	selectionBox: {
		display: 'flex',
		alignItems: 'center',
		gap: '5px',
		marginBottom: '10px',
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
