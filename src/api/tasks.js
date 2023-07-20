import { mainRequest } from './main';
import { SERVER_BASE_URL, SERVER_ROUTES } from '../helpers/constants';

export const getTasks = async (done) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.BASE}/${done}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const getCompanyTasks = async (done, companyId) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.BY_COMPANY_ID}/${done}/${companyId}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const updateTask = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.BASE}`;
	const method = 'patch';
	return await mainRequest(method, url, body);
};

export const addTask = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.BASE}`;
	const method = 'post';
	return await mainRequest(method, url, body);
};

export const deleteTask = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.BASE}`;
	const method = 'delete';
	return await mainRequest(method, url, body);
};

export const taksDueSoon = async (days,companyId) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.TASKS.DUE_SOON}/${days}/${companyId}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};
