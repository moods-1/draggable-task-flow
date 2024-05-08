import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	errorMain: {
		width: '100%',
		minHeight: '100vh',
		padding: '20px',
		display: 'grid',
		placeItems: 'center',
		textAlign: 'center',
		color: '#000',
		fontSize: '18px',
		'& img': {
			width: '100%',
			maxWidth: '300px',
			margin: '40px auto 30px',
		},
		'& button': {
			minWidth: '140px',
			marginTop: '20px',
		}
	},	
}));