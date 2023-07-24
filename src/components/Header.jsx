import React, { useRef, useEffect, useState, useContext } from 'react';

import { TaskContext } from '../context/taskContext';
import useStyles from '../styles/HeaderStyles';
import { DefaultProfile } from '../assets/images';
import {
	phoneNumberHyphenator,
	unauthorizedLogout,
} from '../helpers/helperFunctions';
import UserModal from '../components/Modals/UserModal';
import ClickOutsideHandler from './custom/ClickOutsideHandler';
import { DefaultLogo } from '../assets/images';

function Header({ setHeaderHeight }) {
	const [showProfileDetails, setShowProfileDetails] = useState(false);
	const [showUserModal, setShowUserModal] = useState(false);
	const classes = useStyles();
	const headerRef = useRef();
	const { loggedInUser, company } = useContext(TaskContext);
	const firstName = loggedInUser?.firstName;
	const lastName = loggedInUser?.lastName;
	const phoneNumber = phoneNumberHyphenator(loggedInUser?.phoneNumber);
	const userName = `${firstName} ${lastName}`;
	const brand = company?.logo || DefaultLogo;

	const handleEdit = () => {
		setShowProfileDetails(false);
		setShowUserModal(true);
	};

	const handleLogout = () => {
		unauthorizedLogout();
	};

	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.clientHeight);
		}
	}, [setHeaderHeight]);

	return (
		<div ref={headerRef} className={classes.headerMain}>
			<div className='header-brand-logo'>
				<img src={brand} alt='Logo' width='100%' />
			</div>
			<p className='header-large-title'>Task Dashboard</p>
			<ClickOutsideHandler outsideFunction={() => setShowProfileDetails(false)}>
				<div className='header-profile'>
					<img
						role='presentation'
						src={loggedInUser?.image || DefaultProfile}
						alt={loggedInUser?.firstName || 'default'}
						width={40}
						height={40}
						onClick={() => {
							setShowProfileDetails(!showProfileDetails);
						}}
					/>
					{showProfileDetails && (
						<ul className='header-user-details'>
							<li>{userName || ''}</li>
							<li>{phoneNumber}</li>
							<li className='action' onClick={handleEdit}>edit</li>
							<li className='action' onClick={handleLogout}>logout</li>
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
