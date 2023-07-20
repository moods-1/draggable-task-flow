import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Button } from 'reactstrap';

import ModalTextField from '../components/Modals/ModalTextField';
import useStyles from '../styles/AuthStyles';
import { Dashboard } from '../assets/images';
import { userLogin } from '../api/users';
import { handleLogin, getLoggedIn } from '../helpers/helperFunctions';

const inputProps = {
	maxLength: 30,
	minLength: 2,
	style: {
		fontSize: 15,
	},
};

const Auth = ({ snack }) => {
	// Pre-filled for demo purposes
	const [email, setEmail] = useState('dan.jones@moods.ca');
	const [password, setPassword] = useState('djPassword');
	const [disableSubmit, setDisableSubmit] = useState(true);
	const navigate = useNavigate();
	const loggedIn = getLoggedIn();

	const classes = useStyles();

	const clearState = () => {
		setEmail('');
		setPassword('');
	};

	const handleEmail = (value) => {
		setEmail(value);
	};

	const handlePassword = (value) => {
		setPassword(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requestBody = { email, password };
		const result = await userLogin(requestBody);
		const { status, message, response } = result;
		if (status < 305) {
			handleLogin(response);
			clearState();
			navigate('/');
		} else {
			return snack(message, 'error');
		}
	};

	useEffect(() => {
		setDisableSubmit(!email || !password);
	}, [email, password]);

	if (loggedIn) {
		return <Navigate to='/' replace={true} />;
	}

	return (
		<div className={classes.authMain}>
			<div>
				<h1 className={classes.authTitle}>SaaSy Dashboard</h1>
				<form className={classes.authForm} onSubmit={handleSubmit}>
					<div className={classes.authFormHead}>
						<img src={Dashboard} width={50} alt='dashboard' />
						<Typography variant='h4' align='center'>
							Login
						</Typography>
					</div>
					<ModalTextField
						label='Email'
						type='email'
						inputProps={inputProps}
						value={email}
						onChange={(e) => handleEmail(e.target.value)}
					/>
					<ModalTextField
						label='Password'
						type='password'
						inputProps={inputProps}
						value={password}
						onChange={(e) => handlePassword(e.target.value)}
					/>
					<Button color='primary' disabled={disableSubmit} block>
						Submit
					</Button>
				</form>
				<p className={classes.authNote}>*Pre-filled for demo purposes.</p>
			</div>
		</div>
	);
};

export default Auth;
