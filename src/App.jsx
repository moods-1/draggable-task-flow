import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Header, Sidebar } from './components';
import { Mixpanel } from './components/Mixpanel';
import Users from './Pages/Users';
import Tasks from './Pages/Tasks';
import Charts from './Pages/Charts';
import useStyles from './styles/AppStyles';

function App() {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const [headerHeight, setHeaderHeight] = useState(0);
	Mixpanel.track('Task dashboard site accessed', { action: 'Site accessed.' });

	const snack = useCallback(
		(message, type) => {
			enqueueSnackbar(message, { variant: type, autoHideDuration: 4000 });
		},
		[enqueueSnackbar]
	);

	return (
		<div className={classes.appMain}>
			<div className={classes.appMainContainer}>
				<Header setHeaderHeight={setHeaderHeight} />
				<div
					className={classes.appContainer}
					style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
				>
					<Sidebar headerHeight={headerHeight} />
					<div className={classes.appContent}>
						<Routes>
							<Route path='/' element={<Tasks snack={snack} />} />
							<Route path='/users' element={<Users snack={snack} />} />
							<Route path='/charts' element={<Charts snack={snack} />} />
						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
