import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	chartsMain: {
		width: '100%',
		padding: '30px',
		minHeight: `calc(100vh - ${theme.headerHeight})`,
		backgroundColor: '#000000',
		backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23333344' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E")`,
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
