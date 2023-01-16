import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Header, Sidebar, Tasks, Users } from './components';
import useStyles from './styles/AppStyles';

function App() {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const [headerHeight, setHeaderHeight] = useState(0);

	const snack = useCallback(
		(message, type) => {
			enqueueSnackbar(message, { variant: type, autoHideDuration: 4000 });
		},
		[enqueueSnackbar]
	);

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
						<Route path='/' element={<Tasks snack={snack} />} />
						<Route path='/users' element={<Users snack={snack} />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
