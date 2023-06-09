import axios from 'axios';
import { SERVER_BASE_URL, SERVER_ROUTES } from '../helpers/constants';

export const getAllColumns = async () => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.COLUMNS.BASE}`;
		return await axios(url);
	} catch (error) {
		return error;
	}
};

export const moveTaskSameColumn = async (body) => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.COLUMNS.MOVE_TASK_INTERNAL}`;
		return await axios.patch(url, body);
	} catch (error) {
		return error;
	}
};
export const moveTaskNewColumn = async (body) => {
	try {
		const url = `${SERVER_BASE_URL}${SERVER_ROUTES.COLUMNS.MOVE_TASK_EXTERNAL}`;
		return await axios.patch(url, body);
	} catch (error) {
		return error;
	}
};
