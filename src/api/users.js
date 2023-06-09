import axios from 'axios';
import { SERVER_BASE_URL, SERVER_ROUTES } from '../helpers/constants';

export const getAllUsers = async () => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.BASE}`;
		return await axios(url);
	} catch (error) {
		return error;
	}
};

export const updateUser = async (body) => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.BASE}`;
		return await axios.patch(url, body);
	} catch (error) {
		return error;
	}
};

export const addUser = async (body) => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.BASE}`;
		return await axios.post(url, body);
	} catch (error) {
		return error;
	}
};