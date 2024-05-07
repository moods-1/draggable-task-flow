import { useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { TaskContextProvider } from './context/taskContext';
import { Mixpanel } from './components/Mixpanel';
import Users from './Pages/Users';
import Tasks from './Pages/Tasks';
import Home from './Pages/Home/Home';
import Charts from './Pages/Charts';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import ErrorPage from './Pages/ErrorPage';
import Customers from './Pages/Customers';
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
		<TaskContextProvider>
			<div className={classes.appMain}>
				<Routes>
					<Route path='/auth' element={<Auth snack={snack} />} />
					<Route path='/' element={<Dashboard />}>
						{/* <Route index element={<Tasks snack={snack} />} /> */}
						<Route index element={<Home snack={snack} />} />
						<Route path='tasks' element={<Tasks snack={snack} />} />
						<Route path='users' element={<Users snack={snack} />} />
						<Route path='charts' element={<Charts snack={snack} />} />
						<Route path='customers' element={<Customers snack={snack} />} />
					</Route>
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</div>
		</TaskContextProvider>
	);
}

export default App;
