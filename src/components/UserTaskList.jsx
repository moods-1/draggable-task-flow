import React from 'react';
import CustomDataTable from './custom/CustomDataTable';
import useStyles from '../styles/UsersStyles';

function UserTaskList({ tasksAssigned }) {
	const classes = useStyles();

	const columns = [
		{ label: 'TASK STATE', field: 'state' },
		{ label: 'TASK TITLE', field: 'taskTitle' },
	];

	return (
		<div className={`${classes.usersContent} mt-3`}>
			<CustomDataTable rows={tasksAssigned} columns={columns} />
		</div>
	);
}

export default UserTaskList;
