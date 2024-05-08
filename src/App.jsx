import { Routes, Route } from 'react-router-dom';

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
	Mixpanel.track('Task dashboard site accessed', {
		action: 'Task dashboard site accessed.',
	});

	return (
		<TaskContextProvider>
			<div className={classes.appMain}>
				<Routes>
					<Route path='/auth' element={<Auth />} />
					<Route path='/' element={<Dashboard />}>
						<Route index element={<Home />} />
						<Route path='tasks' element={<Tasks />} />
						<Route path='users' element={<Users />} />
						<Route path='charts' element={<Charts />} />
						<Route path='customers' element={<Customers />} />
					</Route>
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</div>
		</TaskContextProvider>
	);
}

export default App;
