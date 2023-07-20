import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { TaskContextProvider } from '../context/taskContext';
import { Header, Sidebar } from '../components';
import useStyles from '../styles/AppStyles';
import { getLoggedIn } from '../helpers/helperFunctions';

const Dashboard = () => {
	const [headerHeight, setHeaderHeight] = useState(0);
	const classes = useStyles();

	if (!getLoggedIn()) {
		return <Navigate to='/auth' replace={true} />;
	}

	return (
		<TaskContextProvider>
			<div className={classes.appMainContainer}>
				<Header setHeaderHeight={setHeaderHeight} />
				<div
					className={classes.appContainer}
					style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
				>
					<Sidebar headerHeight={headerHeight} />
					<div className={classes.appContent}>
						<Outlet />
					</div>
				</div>
			</div>
		</TaskContextProvider>
	);
};

export default Dashboard;
