import React from 'react';
import { useNavigate } from 'react-router-dom';

import useStyles from '../styles/ErrorPageStyles';
import { LostMan } from '../assets/images';
import { Button } from 'reactstrap';

const ErrorPage = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	return (
		<div className={classes.errorMain}>
			<div>
				<h3>You appear to be lost.</h3>
				<img src={LostMan} alt='lost man' />
				<p> Let's get you back on track.</p>
				<Button color='primary' onClick={()=>{navigate('/')}}>Home</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
