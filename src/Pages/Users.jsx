import React, { useEffect, useState, useContext } from 'react';
import { MoreVert } from '@mui/icons-material';
import { TaskContext } from '../context/taskContext';
import ContentHeader from '../components/ContentHeader';
import { USERS_TABLE_HEADERS } from '../helpers/constants';
import useStyles from '../styles/UsersStyles';
import CustomDataTable from '../components/custom/CustomDataTable';
import { DefaultProfile } from '../images';
import SearchInput from '../components/custom/SearchInput';
import UserModal from '../components/Modals/UserModal';
import { phoneNumberHyphenator, getIsAdmin } from '../helpers/helperFunctions';

function Users({ snack }) {
	const { users, loggedInUser } = useContext(TaskContext);
	const [showNewUserModal, setShowNewUserModal] = useState(false);
	const [dataFilter, setDataFilter] = useState('');
	const [localUsers, setLocalUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [type, setType] = useState('new');
	const [isLoading, setIsLoading] = useState(true);
	const classes = useStyles();
	const admin = getIsAdmin();

	const rows = localUsers.map((user) => {
		const { image, firstName, lastName, phoneNumber, _id: id } = user;
		const imageAlt = `${firstName} ${lastName}`;
		const enableEdit = loggedInUser?._id === id || admin;

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
				<button
					className='more-button'
					disabled={!enableEdit}
					onClick={() => {
						setCurrentUser(user);
						setType('edit');
						setShowNewUserModal(!showNewUserModal);
					}}
				>
					<MoreVert />
				</button>
			),
		};
	});

	useEffect(() => {
		if (users.length) {
			setLocalUsers(users);
			setIsLoading(false);
		}
	}, [users]);

	return (
		<div className={classes.usersMain}>
			<ContentHeader
				title='Users'
				subtitle='View and manage users'
				buttonText='+ New User'
				buttonColor='secondary'
				showButton
				disableButton={!admin}
				buttonFunction={() => {
					setType('new');
					setShowNewUserModal(true);
				}}
			/>
			<div className={classes.usersContent}>
				<div>
					<div className={classes.tableTop}>
						<SearchInput
							placeHolder='Search users'
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
						isLoading={isLoading}
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
					snack={snack}
				/>
			)}
		</div>
	);
}

export default Users;
