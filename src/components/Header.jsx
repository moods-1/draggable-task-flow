import React, { useRef, useEffect, useState, useContext } from 'react';
import { TaskContext } from '../context/taskContext';
import useStyles from '../styles/HeaderStyles';

function Header({ setHeaderHeight }) {
	const [currentUser, setCurrentUser] = useState({});
	const classes = useStyles();
	const headerRef = useRef();
	const { users } = useContext(TaskContext);
	
	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.clientHeight);
		}
	}, [setHeaderHeight]);

	useEffect(() => {
		const loggedInUser = users.find(u=> u.id === '001');
		setCurrentUser(loggedInUser)
	}, [users]);

	return (
		<div ref={headerRef} className={classes.headerMain}>
			<p/>
			<p className='header-large-title'>Task Dashboard</p>
			<div className='header-profile'>
				<img src={currentUser?.image} alt={currentUser?.firstName} width={40} height={40} />
			</div>
		</div>
	);
}

export default Header;
