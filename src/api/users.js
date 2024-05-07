import { mainRequest } from './main';
import { SERVER_BASE_URL, SERVER_ROUTES } from '../helpers/constants';

export const userLogin = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.LOGIN}`;
	const method = 'post';
	return await mainRequest(method, url, body);
};

export const getAllUsers = async () => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.BASE}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const getUserById = async (userId) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.USER_BY_ID}/${userId}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const getCompanyUsers = async (companyId) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.BY_COMPANY_ID}/${companyId}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const updateUser = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.UPDATE_USER}`;
	const method = 'patch';
	return await mainRequest(method, url, body);
};

export const logoutUser = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.LOGOUT_USER}`;
	const method = 'patch';
	return await mainRequest(method, url, body);
};

export const addUser = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.USERS.ADD_USER}`;
	const method = 'post';
	return await mainRequest(method, url, body);
};
