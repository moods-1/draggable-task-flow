import React, { useState, useEffect, useContext } from 'react';
import { Logout, Edit } from '@mui/icons-material';

import { TaskContext } from '../context/taskContext';
import useStyles from '../styles/HeaderStyles';
import { DefaultProfile } from '../assets/images';
import { phoneNumberHyphenator } from '../helpers/helperFunctions';
import UserModal from '../components/Modals/UserModal';
import ClickOutsideHandler from './custom/ClickOutsideHandler';

function Header() {
	const [showProfileDetails, setShowProfileDetails] = useState(false);
	const [showUserModal, setShowUserModal] = useState(false);
	const classes = useStyles();
	const { loggedInUser, handleUserLogout, headerText } =
		useContext(TaskContext);
	const firstName = loggedInUser?.firstName;
	const lastName = loggedInUser?.lastName;
	const phoneNumber = phoneNumberHyphenator(loggedInUser?.phoneNumber);
	const userName = `${firstName} ${lastName}`;

	const handleEdit = () => {
		setShowProfileDetails(false);
		setShowUserModal(true);
	};

	const handleLogout = () => {
		handleUserLogout();
		setShowProfileDetails(false);
	};

	useEffect(() => {
		window.addEventListener('resize', () => {
			setShowProfileDetails(false);
		});
		return window.removeEventListener('resize', () => {});
	}, []);

	return (
		<div className={classes.headerMain}>
			<p className='header-text'>
				<span className='header-title'>{headerText.title}:</span>
				<span className='header-subtitle'>{headerText.subtitle}</span>
			</p>
			<ClickOutsideHandler outsideFunction={() => setShowProfileDetails(false)}>
				<div className='header-profile'>
					<img
						role='presentation'
						src={loggedInUser?.image || DefaultProfile}
						alt={loggedInUser?.firstName || 'default'}
						width={35}
						height={35}
						onClick={() => {
							setShowProfileDetails(!showProfileDetails);
						}}
					/>
					{showProfileDetails && (
						<ul className='header-user-details'>
							<li>{userName || ''}</li>
							<li>{phoneNumber}</li>
							<li className='action' onClick={handleEdit}>
								Edit
								<Edit />
							</li>
							<li className='action' onClick={handleLogout}>
								Logout
								<Logout />
							</li>
						</ul>
					)}
				</div>
				{showUserModal && (
					<UserModal
						open={showUserModal}
						toggle={() => setShowUserModal(!showUserModal)}
						type='edit'
						currentUser={loggedInUser}
					/>
				)}
			</ClickOutsideHandler>
		</div>
	);
}

export default Header;
