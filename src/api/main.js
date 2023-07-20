import axios from 'axios';
import { getToken, unauthorizedLogout } from '../helpers/helperFunctions';

export const mainRequest = async (method, url, data) => {
	const token = getToken() || '';
	const headers = { Authorization: token };
	try {
		const response = await axios({ method, url, data, headers });
		return response.data;
	} catch (error) {
		const { status } = error.response;
		if (status === 401) {
			unauthorizedLogout();
		}
		return error.response.data;
	}
};
