import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
	authMain: {
		width: '100%',
		minHeight: '100vh',
		padding: '20px',
		display: 'grid',
		placeItems: 'center',
	},
	authTitle: {
		color: '#fff',
		textAlign: 'center',
		marginBottom: '40px',
	},
	authForm: {
		width: '100%',
		maxWidth: '340px',
		minHeight: '300px',
		border: '1px solid #ddd',
		borderRadius: '10px',
		padding: '30px',
		backgroundColor: '#fff',
		'& .MuiFormControl-root': {
			margin: '10px 0px',
		},
		'& button': {
			padding: '8px 10px',
			marginTop: '30px',
		},
	},
	authFormHead: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '20px',
		marginBottom: '40px',
		'& h4': {
			fontWeight: 600,
		},
	},
	authNote: {
		width: '100%',
		fontSize: '15px',
		textAlign: 'center',
		color: theme.palette.primary.main,
		margin: '10px auto',
	}
}));
