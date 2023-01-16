import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { TaskContextProvider } from './context/taskContext';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider } from '@material-ui/core';
import App from './App';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { theme } from './themes/theme';

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<SnackbarProvider>
			<TaskContextProvider>
				<Router>
					<App />
				</Router>
			</TaskContextProvider>
		</SnackbarProvider>
	</MuiThemeProvider>,
	document.getElementById('root')
);
