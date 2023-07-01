import { createTheme } from '@material-ui/core';

export const theme = createTheme({
	typography: {
		fontFamily: "'Roboto', sans-serif",
	},
	headerHeight: '60px',
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
			pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23333344' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E")`,
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
