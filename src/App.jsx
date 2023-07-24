import { useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Mixpanel } from './components/Mixpanel';
import Users from './Pages/Users';
import Tasks from './Pages/Tasks';
import Charts from './Pages/Charts';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import ErrorPage from './Pages/ErrorPage';
import useStyles from './styles/AppStyles';

function App() {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	Mixpanel.track('Task dashboard site accessed', {
		action: 'Task dashboard site accessed.',
	});

	const snack = useCallback(
		(message, type) => {
			enqueueSnackbar(message, { variant: type, autoHideDuration: 4000 });
		},
		[enqueueSnackbar]
	);

	return (
		<div className={classes.appMain}>
			<Routes>
				<Route path='/auth' element={<Auth snack={snack} />} />
				<Route path='/' element={<Dashboard />}>
					<Route index element={<Tasks snack={snack} />} />
					<Route path='users' element={<Users snack={snack} />} />
					<Route path='charts' element={<Charts snack={snack} />} />
				</Route>
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</div>
	);
}

export default App;
