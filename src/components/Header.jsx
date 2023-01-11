import React, { useRef, useEffect, useState, useContext } from 'react';
import { Button } from 'reactstrap';
import { TaskContext } from '../context/taskContext';
import useStyles from '../styles/HeaderStyles';
import { DefaultProfile } from '../images';
import { phoneNumberHyphenator } from '../helpers/helperFunctions';
import UserModal from '../components/Modals/UserModal';
import ClickOutsideHandler from './custom/ClickOutsideHandler';

function Header({ setHeaderHeight }) {
	const [showProfileDetails, setShowProfileDetails] = useState(false);
	const [showUserModal, setShowUserModal] = useState(false);
	const classes = useStyles();
	const headerRef = useRef();
	const { loggedInUser } = useContext(TaskContext);
	const firstName = loggedInUser?.firstName;
	const lastName = loggedInUser?.lastName;
	const phoneNumber = phoneNumberHyphenator(loggedInUser?.phoneNumber);
	const userName = `${firstName} ${lastName}`;

	const handleEdit = () => {
		setShowProfileDetails(false);
		setShowUserModal(true);
	};

	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.clientHeight);
		}
	}, [setHeaderHeight]);

	return (
		<div ref={headerRef} className={classes.headerMain}>
			<p />
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
						<div className='header-user-details'>
							<p>{userName || ''}</p>
							<p>{phoneNumber}</p>
							<Button size='sm' className='edit-div shadow-none' onClick={handleEdit}>
								edit
							</Button>
						</div>
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
