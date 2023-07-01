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
		flex: 1,
		borderRadius: 5,
		boxShadow: `0px 0px 5px ${theme.palette.secondary.light}`,
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
