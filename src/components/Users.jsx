import React, { useEffect, useState, useContext } from 'react';
import { MoreVert } from '@mui/icons-material';
import { TaskContext } from '../context/taskContext';
import ContentHeader from './ContentHeader';
import { USERS_TABLE_HEADERS } from '../helpers/constants';
import useStyles from '../styles/UsersStyles';
import CustomDataTable from './custom/CustomDataTable';
import { DefaultProfile } from '../images';
import SearchInput from './custom/SearchInput';
import UserModal from './Modals/UserModal';
import { phoneNumberHyphenator } from '../helpers/helperFunctions';

function Users() {
	const { users } = useContext(TaskContext);
	const [showNewUserModal, setShowNewUserModal] = useState(false);
	const [dataFilter, setDataFilter] = useState('');
	const [localUsers, setLocalUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [type, setType] = useState('new');
	const classes = useStyles();

	const rows = localUsers.map((user) => {
		const { image, firstName, lastName, phoneNumber } = user;
		const imageAlt = `${firstName} ${lastName}`;
		return {
			...user,
			phoneNumber: phoneNumberHyphenator(phoneNumber),
			profile: (
				<img
					src={image || DefaultProfile}
					alt={imageAlt}
					height={30}
					width={30}
				/>
			),
			action: (
				<MoreVert
					role='button'
					onClick={() => {
						setCurrentUser(user);
						setType('edit');
						setShowNewUserModal(!showNewUserModal);
					}}
				/>
			),
		};
	});

	useEffect(() => setLocalUsers(users), [users]);

	return (
		<div className={classes.usersMain}>
			<ContentHeader
				title='Users'
				subtitle='View and manage users'
				buttonText='+ New User'
				buttonColor='secondary'
				showButton
				buttonFunction={() => {
					setType('new');
					setShowNewUserModal(true);
				}}
			/>
			<div className={classes.usersContent}>
				<div>
					<div className={classes.tableTop}>
						<SearchInput
							placeHolder='Search for users'
							changeFunction={setDataFilter}
							inputSize='sm'
						/>
					</div>
					<CustomDataTable
						rows={rows}
						columns={USERS_TABLE_HEADERS}
						dataFilter={dataFilter}
						filterable
						tableHeight={400}
					/>
				</div>
			</div>
			{showNewUserModal && (
				<UserModal
					open={showNewUserModal}
					toggle={() => setShowNewUserModal(!showNewUserModal)}
					type={type}
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
				/>
			)}
		</div>
	);
}

export default Users;
