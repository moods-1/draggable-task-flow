import React, { useContext, useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';
import useStyles from '../styles/SidebarStyles';
import { TaskContext } from '../context/taskContext';

function Sidebar({ headerHeight }) {
	const classes = useStyles();
	const { dashboard, handleDashboard } = useContext(TaskContext);
	const { sidebarLarge } = dashboard;
	const siderBarRef = useRef();

	const handleControlButton = () => {
		if (siderBarRef.current) {
			const viewWidth = siderBarRef.current.clientWidth;
			const newData = { sidebarLarge: !sidebarLarge, sidebarWidth: viewWidth };
			handleDashboard('', newData, true);
		} else handleDashboard('sidebarLarge', !sidebarLarge);
	};

	return (
		<div
			ref={siderBarRef}
			className={classes.sidebarMain}
			style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
		>
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
								<div>
									{sidebarLarge ? title : ''}
									{icon ? icon : ''}
								</div>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
