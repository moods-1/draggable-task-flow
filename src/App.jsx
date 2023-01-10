import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Sidebar, Tasks, Users } from './components';
import useStyles from './styles/AppStyles';

function App() {
	const classes = useStyles();
	const [headerHeight, setHeaderHeight] = useState(0);

	return (
		<div className={classes.appMainContainer}>
			<Header setHeaderHeight={setHeaderHeight} />
			<div
				className={classes.appContainer}
				style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
			>
				<Sidebar headerHeight={headerHeight} />
				<div className={classes.appContent}>
					<Routes>
						<Route path='/' element={<Tasks />} />
						<Route path='/users' element={<Users />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
