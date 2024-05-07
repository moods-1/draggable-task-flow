import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { Header, Sidebar } from '../components';
import useStyles from '../styles/AppStyles';
import { getLoggedIn } from '../helpers/helperFunctions';

const Dashboard = () => {
	const classes = useStyles();

	if (!getLoggedIn()) {
		return <Navigate to='/auth' replace={true} />;
	}

	return (
		<div className={classes.appMainContainer}>
			<div className={classes.appContainer}>
				<Sidebar />
				<div className={classes.appContent}>
					<Header />
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
