import { createTheme } from '@material-ui/core';

export const theme = createTheme({
	typography: {
		fontFamily: "'Roboto', sans-serif",
	},
	palette: {
		primary: {
			main: '#0275d8',
			dark: '#6255b2',
		},
		secondary: {
			light: '#d3d3d3',
			main: '#6c757d',
			dark: '#0C0C0C',
		},
		background: {
			dark: '#000',
			light: '#334',
		},
		success: {
			light: '#e7f1e7',
			main: '#04c401',
			dark: '#02ae00',
		},
		error: {
			light: '#fde9e9',
			main: '#ec536c',
			dark: '#e8314f',
		},
		warning: {
			light: '#fff6e8',
			main: '#f5b225',
		},
		info: {
			main: '#5bc0de',
		},
		shadow: {
			main: 'rgba(255,255,255,0.5)',
		},
		text: {
			light: '#FFF',
			dark: '#000',
			secondary: '#AAA',
		},
		red: '#F00',
		white: '#FFF',
	},
});
