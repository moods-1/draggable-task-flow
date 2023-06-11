import axios from 'axios';
import { SERVER_BASE_URL, SERVER_ROUTES } from '../helpers/constants';

export const getTasks = async (done) => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.BASE}/${done}`;
		return await axios(url);
	} catch (error) {
		return error;
	}
};

export const updateTask = async (body) => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.BASE}`;
		return await axios.patch(url, body);
	} catch (error) {
		return error;
	}
};

export const addTask = async (body) => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.BASE}`;
		return await axios.post(url, body);
	} catch (error) {
		return error;
	}
};
export const deleteTask = async (body) => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.BASE}`;
		return await axios.delete(url, { data: body });
	} catch (error) {
		return error;
	}
};

export const taksDueSoon = async (days) => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.DUE_SOON}/${days}`;
		return await axios(url);
	} catch (error) {
		return error;
	}
};
