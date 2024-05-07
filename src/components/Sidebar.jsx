import React, { useContext, useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';
import useStyles from '../styles/SidebarStyles';
import { TaskContext } from '../context/taskContext';
import { DefaultLogo } from '../assets/images';

function Sidebar() {
	const classes = useStyles();
	const { dashboard, handleDashboard, company } = useContext(TaskContext);
	const { sidebarLarge } = dashboard;
	const siderBarRef = useRef();
	const brand = company?.logo || DefaultLogo;
	const compName = company?.companyName || '';

	const handleControlButton = () => {
		if (siderBarRef.current) {
			const viewWidth = siderBarRef.current.clientWidth;
			const newData = { sidebarLarge: !sidebarLarge, sidebarWidth: viewWidth };
			handleDashboard('', newData, true);
		} else handleDashboard('sidebarLarge', !sidebarLarge);
	};

	return (
		<div ref={siderBarRef} className={classes.sidebarMain}>
			<div className='sidebar-brand'>
				<img src={brand} alt='Logo' />
				{sidebarLarge ? <span>{compName}</span> : null}
			</div>
			<div className={classes.controlDiv}>
				<button aria-label='Expansion' onClick={handleControlButton}>
					{sidebarLarge ? <ChevronLeft /> : <ChevronRight />}
				</button>
			</div>
			<div className={`${sidebarLarge ? 'large' : 'small'}`}>
				<ul>
					{routes.map(({ title, path, icon }) => (
						<li key={path}>
							<NavLink to={path}>
								<span>
									{icon ? icon : ''}
									{sidebarLarge ? title : ''}
								</span>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
