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
