import { mainRequest } from './main';
import { SERVER_BASE_URL, SERVER_ROUTES } from '../helpers/constants';

export const getCompanyById = async (companyId) => {
	const url = `${SERVER_BASE_URL}${SERVER_ROUTES.COMPANIES.BY_COMPANY_ID}/${companyId}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

