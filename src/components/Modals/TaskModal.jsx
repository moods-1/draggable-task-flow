import React, { useState, useContext, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarMonth } from '@mui/icons-material';
import SearchInput from '../custom/SearchInput';
import { DefaultProfile } from '../../images';
import { TaskContext } from '../../context/taskContext';
import {
	TASK_LIST_PRIORITY,
	TASK_LIST_PRIORITY_NUMBERS,
} from '../../helpers/constants';
import ModalTextField from './ModalTextField';
import useStyles from '../../styles/TaskUserModalStyles';
import { addTask, updateTask } from '../../api/tasks';

const TaskModal = ({
	open,
	toggle,
	currentTask,
	handleEditSave,
	handleDelete,
	taskType,
	snack,
}) => {
	const classes = useStyles();
	const [showUsers, setShowUsers] = useState(false);
	const [userFilter, setUserFilter] = useState('');
	const [task, setTask] = useState({});
	const [localUsers, setLocalUsers] = useState([]);
	const [originalAssignee, setOriginalAssignee] = useState('');
	const { users, setRefetchUsers, handleNewTask, loggedInUser } =
		useContext(TaskContext);
	const assignee = localUsers.find((u) => u._id === task?.assignee);
	const assignor = localUsers.find((u) => u._id === task?.assignor);

	const filteredUsers = localUsers.filter(
		(u) =>
			u.firstName.toLowerCase().includes(userFilter) ||
			u.lastName.toLowerCase().includes(userFilter)
	);

	const handleAssignment = async (userId, assignmentType) => {
		const subjectUser = users.find((u) => u._id === userId);
		if (assignmentType === 'assignee') {
			const { assignedTasks } = subjectUser;
			const assignedSet = new Set([...assignedTasks, userId]);
			subjectUser.assignedTasks = [...assignedSet];
			setTask((prevState) => ({
				...prevState,
				assignee: subjectUser._id,
				assigneeName: `${subjectUser.firstName} ${subjectUser.lastName.slice(
					0,
					1
				)}.`,
				assigneeImage: subjectUser.image,
			}));
			setShowUsers(!showUsers);
			setUserFilter('');
		} else {
			setTask((prevState) => ({
				...prevState,
				assignor: subjectUser._id,
			}));
		}
	};

	const handleChange = (value, field) => {
		setTask((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	const handleCancel = () => {
		setTask({});
		toggle();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!task.assignee) {
			return snack('An assignee is required.', 'info');
		}
		if (taskType === 'edit') {
			const requestBody = { ...task, originalAssignee };
			const result = await updateTask(requestBody);
			const { status } = result.data;
			if (status === 200) {
				handleEditSave(task);
				toggle();
			} else {
				snack('There was an error', 'error');
			}
		} else {
			const result = await addTask(task);
			const { status, response } = result.data;
			if (status === 200) {
				handleNewTask(response);
				toggle();
				snack('Task added successfully!', 'success');
			}
		}
		setRefetchUsers((prevState) => !prevState);
	};

	useEffect(() => {
		if (taskType === 'edit') {
			setOriginalAssignee(currentTask.assignee);
			setTask(currentTask);
		} else {
			setTask({ state: 'To Do', complete: false, assignor: loggedInUser._id });
		}
	}, [currentTask, taskType, loggedInUser._id]);

	useEffect(() => {
		setLocalUsers(users);
	}, [users]);

	const assignorName = task.assignor
		? `${assignor?.firstName} ${assignor?.lastName}`
		: '';

	const assigneeName = task.assignee
		? `${assignee?.firstName} ${assignee?.lastName}`
		: '';

	const taskPriority = task.priority === 0 ? '0' : task.priority;

	return (
		<Modal
			isOpen={open}
			toggle={toggle}
			centered
			className={classes.modal}
			size='md'
		>
			<ModalHeader className={classes.modalHeader}>
				<p>{taskType === 'new' ? 'New' : 'Edit'} Task</p>
			</ModalHeader>
			<ModalBody className={classes.modalBody}>
				<form onSubmit={handleSubmit}>
					<div className={classes.dragItemMenu}>
						<div className='assignee-box'>
							<h4 className='text-center'>{assigneeName || 'Assignee'}</h4>
							<img
								className={classes.topProfile}
								src={assignee?.image || DefaultProfile}
								alt={assignee?.name || 'default'}
							/>
							<Button
								className='shadow-none'
								size='sm'
								color='link'
								style={{ textDecoration: 'none', color: showUsers && '#F00' }}
								onClick={() => setShowUsers(!showUsers)}
							>
								{showUsers ? 'Cancel' : 'Change'}
							</Button>
							<hr />
							{showUsers && (
								<Row className='mb-4 mx-0 w-100 px-3'>
									<SearchInput
										inputSize='sm'
										inputWidth='100%'
										placeHolder='Search users'
										changeFunction={setUserFilter}
									/>
									<div className='user-selection-box'>
										{filteredUsers.length ? (
											filteredUsers.map(
												({ _id, image, firstName, lastName }) => (
													<div
														key={_id}
														role='presentation'
														className='user-selection-item'
														onClick={() => handleAssignment(_id, 'assignee')}
													>
														<img
															className={`${classes.listProfile}`}
															src={image}
															alt={firstName}
														/>
														<p className='m-0 p-0'>{`${firstName} ${lastName}`}</p>
													</div>
												)
											)
										) : (
											<div className='user-selection-empty-message'>
												No users match your search criteria.
											</div>
										)}
									</div>
									<hr />
								</Row>
							)}
						</div>
						<Row className='mb-4 mx-0'>
							<Col>
								<ModalTextField
									label='Task Title'
									onChange={(e) => handleChange(e.target.value, 'taskTitle')}
									inputProps={{
										maxLength: 40,
										minLength: 3,
										style: {
											fontSize: 15,
										},
									}}
									value={task?.taskTitle}
								/>
							</Col>
						</Row>
						<Row className='mb-4 mx-0'>
							<Col>
								<TextField
									label='Assignor'
									select
									size='small'
									variant='standard'
									fullWidth
									value={assignor?._id || ''}
									required
									inputProps={{
										style: {
											fontSize: 15,
										},
									}}
									SelectProps={{
										native: true,
									}}
									onChange={(e) => handleAssignment(e.target.value)}
								>
									<option value=''>{assignorName}</option>
									{users.map(({ firstName, lastName, _id }) => (
										<option key={_id} value={_id}>
											{`${firstName} ${lastName}`}
										</option>
									))}
								</TextField>
							</Col>
							<Col>
								<TextField
									label='Priority'
									select
									size='small'
									variant='standard'
									fullWidth
									value={taskPriority || ''}
									required
									inputProps={{
										style: {
											fontSize: 15,
										},
									}}
									SelectProps={{
										native: true,
									}}
									onChange={(e) =>
										handleChange(Number(e.target.value), 'priority')
									}
								>
									<option value=''>{TASK_LIST_PRIORITY[taskPriority]}</option>
									{Object.entries(TASK_LIST_PRIORITY_NUMBERS).map(
										([key, value]) => (
											<option key={key} value={value}>
												{key}
											</option>
										)
									)}
								</TextField>
							</Col>
						</Row>
						<Row className='mb-5 mx-0'>
							<Col>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DesktopDatePicker
										label='Due Date'
										inputFormat='DD-MMM-YYYY'
										value={task.dueDate || new Date()}
										onChange={(value) => handleChange(value?.$d, 'dueDate')}
										renderInput={(params) => (
											<TextField variant='standard' required {...params} />
										)}
										disableMaskedInput
										InputProps={{
											sx: {
												height: 30,
												fontSize: 15,
												outlineStyle: 'none',
												boxShadow: 'none !important',
											},
										}}
										components={{
											OpenPickerIcon: () => (
												<CalendarMonth
													sx={{
														fontSize: 18,
													}}
												/>
											),
										}}
										showDaysOutsideCurrentMonth
									/>
								</LocalizationProvider>
							</Col>
							<Col>{''}</Col>
						</Row>
						<Row className='mb-3 mx-0'>
							<Col>
								<Button
									className='cancel-button'
									block
									size='sm'
									onClick={handleCancel}
								>
									Cancel
								</Button>
							</Col>
							{taskType === 'edit' && (
								<Col>
									<Button
										color='danger'
										block
										size='sm'
										onClick={() => handleDelete(task)}
									>
										Delete task
									</Button>
								</Col>
							)}
							<Col>
								<Button color='primary' block size='sm' type='submit'>
									Save changes
								</Button>
							</Col>
						</Row>
					</div>
				</form>
			</ModalBody>
			<Button close className={classes.closeButton} onClick={handleCancel} />
		</Modal>
	);
};

export default TaskModal;
