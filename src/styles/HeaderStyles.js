import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	headerMain: {
		width: '100vw',
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
		'& .header-profile':{
			'& img':{
				borderRadius: '50%',
			}
		}
	},
}));
