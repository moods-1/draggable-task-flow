import React, { useEffect, useState, useContext } from 'react';
import { MoreVert, Circle } from '@mui/icons-material';
import { TaskContext } from '../context/taskContext';
import ContentHeader from '../components/ContentHeader';
import { USERS_TABLE_HEADERS } from '../helpers/constants';
import useStyles from '../styles/UsersStyles';
import CustomDataTable from '../components/custom/CustomDataTable';
import { DefaultProfile } from '../assets/images';
import SearchInput from '../components/custom/SearchInput';
import UserModal from '../components/Modals/UserModal';
import { phoneNumberHyphenator } from '../helpers/helperFunctions';

function Users({ snack, hideFilter, hideHeader }) {
	const { users, loggedInUser, isAdmin, handleHeaderText } =
		useContext(TaskContext);
	const [showNewUserModal, setShowNewUserModal] = useState(false);
	const [dataFilter, setDataFilter] = useState('');
	const [localUsers, setLocalUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [type, setType] = useState('new');
	const [isLoading, setIsLoading] = useState(true);
	const classes = useStyles();

	const rows = localUsers.map((user) => {
		const { image, firstName, lastName, phoneNumber, _id: id, loggedIn } = user;
		const imageAlt = `${firstName} ${lastName}`;
		const enableEdit = loggedInUser?._id === id || isAdmin;

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
			loggedIn: loggedIn ? (
				<Circle sx={{ fontSize: 10, color: '#00ff00' }} />
			) : (
				<Circle sx={{ fontSize: 10, color: '#f00' }} />
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

	useEffect(() => {
		handleHeaderText({ title: 'Users', subtitle: 'View and Manage Users' });
	}, [handleHeaderText]);

	return (
		<div className={classes.usersMain}>
			{hideHeader ? null : (
				<ContentHeader
					title=''
					subtitle=''
					buttonText='+ New User'
					buttonColor='secondary'
					showButton
					disableButton={!isAdmin}
					buttonFunction={() => {
						setType('new');
						setShowNewUserModal(true);
					}}
				/>
			)}

			<div className={classes.usersContent}>
				<div>
					{hideFilter ? null : (
						<div className={classes.tableTop}>
							<SearchInput
								placeHolder='Search users'
								changeFunction={setDataFilter}
								inputSize='sm'
							/>
						</div>
					)}

					<CustomDataTable
						rows={rows}
						columns={USERS_TABLE_HEADERS}
						dataFilter={dataFilter}
						filterable
						tableHeight={600}
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
