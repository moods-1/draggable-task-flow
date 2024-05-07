import moment from 'moment-timezone';

export const redSet = new Set(['high', 0]);
export const orangeSet = new Set(['mid', 1]);
export const blueSet = new Set(['low', 2]);

export const statusColor = (value) => {
	let localValue = value?.toLowerCase();
	if (redSet.has(localValue)) {
		return '#F00';
	} else if (orangeSet.has(localValue)) {
		return '#f5b225';
	} else if (blueSet.has(localValue)) {
		return '#0275d8';
	}
	return 'gray';
};

export function makeRandomId(length) {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export function phoneNumberHyphenator(phone) {
	let output = phone;
	if (phone) {
		const outputArray = [];
		if (phone.length === 10) {
			outputArray.push(phone.substring(0, 3));
			outputArray.push(phone.substring(3, 6));
			outputArray.push(phone.substring(6, 10));
			output = `${outputArray.join('-')}`;
		} else {
			output = `${phone}`;
		}
	}
	return output;
}

export const textTruncater = (text, length) =>
	text?.length > length ? text.substr(0, length - 1) + '...' : text;

export const formatMultiChartData = (data) => {
	const userObject = {};
	const dataObject = {};
	const userTasks = {};
	const monthSet = new Set([]);
	data.forEach((d) => {
		const { assignee, assigneeName, completionDate } = d;
		userObject[assignee] = assigneeName;
		// Add array of tasks by assinee
		if (assignee in userTasks) userTasks[assignee].push(d);
		else userTasks[assignee] = [d];
		// Categories setter
		const month = completionDate.split('T')[0].slice(0, 7);
		monthSet.add(month);
	});
	// Set chart series data
	const months = [...monthSet];
	Object.keys(userTasks).forEach((u) => {
		dataObject[u] = { name: u, data: months.map((_) => 0) };
	});
	// Set the data series for each user by month
	months.forEach((m, index) => {
		Object.entries(userTasks).forEach(([key, value]) => {
			let val = dataObject[key].data[index];
			value.forEach((v) => {
				if (m === v.completionDate.split('T')[0].slice(0, 7)) val += 1;
			});
			dataObject[key].data[index] = val;
		});
	});
	// Convert assignee id to assignee name
	const series = Object.values(dataObject).map((d) => {
		d.name = userObject[d.name];
		return d;
	});
	// Convert year month numbers to short text month
	const categories = months.map((m) => moment(m, 'YYYY-MM').format('MMM YYYY'));
	return { multiCategories: categories, multiDataSeries: series };
};

export const formatPieDonutChartData = (data) => {
	const dataObject = {};
	const userObject = {};
	data.forEach((d) => {
		const { assignee, assigneeName } = d;
		userObject[assignee] = assigneeName;
		if (assignee in dataObject) dataObject[assignee] += 1;
		else dataObject[assignee] = 1;
	});
	const userData = Object.entries(dataObject).map(([key, value]) => {
		return { name: userObject[key], y: value };
	});
	return { pieDonutData: userData };
};

export const storeUser = (data) => {
	localStorage.setItem('user', JSON.stringify(data));
};

export const clearUser = async () => {
	localStorage.removeItem('user');
};

export const clearStorage = () => {
	localStorage.clear();
};

export function unauthorizedLogout() {
	clearStorage();
	window.location.href = '/auth';
}

export const getStoredUser = () => {
	if (localStorage.getItem('user')) {
		return JSON.parse(localStorage.getItem('user'));
	}
	return null;
};

// Token
export const setToken = (data) => {
	localStorage.setItem('token', data);
};

export const getToken = () => {
	if (localStorage.getItem('token')) {
		return localStorage.getItem('token');
	}
	return '';
};

// Logged in
export const setLoggedIn = (state) => {
	localStorage.setItem('loggedIn', state);
};

export const getLoggedIn = () => {
	if (localStorage.getItem('loggedIn')) {
		const state = localStorage.getItem('loggedIn');
		return state === 'true' ? true : false;
	}
	return false;
};

// Admin
export const setIsAdmin = (state) => {
	localStorage.setItem('isAdmin', state);
};

export const getIsAdmin = () => {
	if (localStorage.getItem('isAdmin')) {
		const state = localStorage.getItem('isAdmin');
		return state === 'true' ? true : false;
	}
	return false;
};

// CompanyId
export const setCompanyId = (id) => {
	localStorage.setItem('companyId', id);
};

export const getCompanyId = () => {
	if (localStorage.getItem('companyId')) {
		return localStorage.getItem('companyId');
	}
	return '';
};

export const handleLogin = (data) => {
	const { token, companyId } = data;
	storeUser(data);
	setToken(token);
	setCompanyId(companyId);
	setLoggedIn(true);
};
