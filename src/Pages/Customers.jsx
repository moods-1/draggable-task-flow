import React, { useEffect, useState, useContext } from 'react';
import { MoreVert } from '@mui/icons-material';

import useStyles from '../styles/CustomerStyles';
import ContentHeader from '../components/ContentHeader';
import { phoneNumberHyphenator } from '../helpers/helperFunctions';
import { TaskContext } from '../context/taskContext';
import { CUSTOMERS_TABLE_HEADERS } from '../helpers/constants';
import CustomDataTable from '../components/custom/CustomDataTable';
import { DefaultProfile } from '../assets/images';
import SearchInput from '../components/custom/SearchInput';
import CustomerModal from '../components/Modals/CustomerModal';
import { getAllCustomers } from '../api/customers';

function Users({ snack, hideFilter, hideHeader }) {
	const { isAdmin, handleHeaderText } = useContext(TaskContext);

	const [showCustomerModal, setShowCustomerModal] = useState(false);
	const [dataFilter, setDataFilter] = useState('');
	const [customers, setCustomers] = useState([]);
	const [currentCustomer, setCurrentCustomer] = useState({});
	const [type, setType] = useState('new');
	const [isLoading, setIsLoading] = useState(true);
	const classes = useStyles();

	const toggleModal = (data) => {
		if (data) {
			if (type === 'new') {
				setCustomers((prev) => [data, ...prev]);
			} else if (type === 'edit') {
				const { _id: id } = data;
				const customerIndex = customers.findIndex((c) => c._id === id);

				setCustomers((prev) => [
					...prev.slice(0, customerIndex),
					data,
					...prev.slice(customerIndex + 1),
				]);
			}
		}
		setShowCustomerModal(false);
	};

	const rows = customers.map((customer) => {
		const { logo, customerName, phoneNumber } = customer;
		const imageAlt = customerName;

		return {
			...customer,
			phoneNumber: phoneNumberHyphenator(phoneNumber),
			profile: (
				<img
					src={logo || DefaultProfile}
					alt={imageAlt}
					height={30}
					width={30}
				/>
			),
			action: (
				<button
					className='more-button'
					onClick={() => {
						setCurrentCustomer(customer);
						setType('edit');
						setShowCustomerModal(true);
					}}
				>
					<MoreVert />
				</button>
			),
		};
	});

	useEffect(() => {
		handleHeaderText({
			title: 'Customers',
			subtitle: 'View and Manage Customers',
		});
	}, [handleHeaderText]);

	useEffect(() => {
		setIsLoading(true);
		const fetchCustomers = async () => {
			try {
				const result = await getAllCustomers();
				const { status, response } = result;
				if (status < 400) {
					setCustomers(response);
				}
			} catch (error) {
				console.log('Error fetching customers.');
			}
			setIsLoading(false);
		};
		fetchCustomers();
	}, []);

	return (
		<div className={classes.customersMain}>
			{hideHeader ? null : (
				<ContentHeader
					title=''
					subtitle=''
					buttonText='+ New Customer'
					buttonColor='secondary'
					showButton
					disableButton={!isAdmin}
					buttonFunction={() => {
						setType('new');
						setShowCustomerModal(true);
					}}
				/>
			)}

			<div className={classes.customersContent}>
				<div>
					{hideFilter ? null : (
						<div className={classes.tableTop}>
							<SearchInput
								placeHolder='Search customers'
								changeFunction={setDataFilter}
								inputSize='sm'
							/>
						</div>
					)}

					<CustomDataTable
						rows={rows}
						columns={CUSTOMERS_TABLE_HEADERS}
						dataFilter={dataFilter}
						filterable
						tableHeight={800}
						isLoading={isLoading}
					/>
				</div>
			</div>
			{showCustomerModal && (
				<CustomerModal
					open={showCustomerModal}
					toggle={toggleModal}
					type={type}
					currentCustomer={currentCustomer}
					setCurrentCustomer={setCurrentCustomer}
					snack={snack}
				/>
			)}
		</div>
	);
}

export default Users;
