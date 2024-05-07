import { mainRequest } from './main';
import { SERVER_BASE_URL, SERVER_ROUTES } from '../helpers/constants';

export const getAllCustomers = async () => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.CUSTOMERS.BASE}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const addCustomer = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.CUSTOMERS.ADD_CUSTOMER}`;
	const method = 'post';
	return await mainRequest(method, url, body);
};

export const updateCustomer = async (body) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.CUSTOMERS.UPDATE_CUSTOMER}`;
	const method = 'patch';
	return await mainRequest(method, url, body);
};

export const getCustomerById = async (customerId) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.CUSTOMERS.BY_CUSTOMER_ID}/${customerId}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const getTopCustomers = async () => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.CUSTOMERS.TOP_BY_LICENSES}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};
