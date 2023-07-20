import { mainRequest } from './main';
import { SERVER_BASE_URL, SERVER_ROUTES } from '../helpers/constants';

export const getAllColumns = async () => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.COLUMNS.BASE}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const getCompanyColumns = async (companyId) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.COLUMNS.BY_COMPANY_ID}/${companyId}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const moveTaskSameColumn = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.COLUMNS.MOVE_TASK_INTERNAL}`;
	const method = 'patch';
	return await mainRequest(method, url, body);
};

export const moveTaskNewColumn = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.COLUMNS.MOVE_TASK_EXTERNAL}`;
	const method = 'patch';
	return await mainRequest(method, url, body);
};
