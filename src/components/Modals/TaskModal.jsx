import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarMonth } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import SearchInput from '../custom/SearchInput';
import { DefaultProfile } from '../../images';
import { TaskContext } from '../../context/taskContext';
import {
	TASK_LIST_PRIORITY,
	TASK_LIST_PRIORITY_NUMBERS,
} from '../../helpers/constants';
import ModalTextField from './ModalTextField';
import { makeRandomId } from '../../helpers/helperFunctions';
import useStyles from '../../styles/TaskUserModalStyles';

const newId = makeRandomId(8);

const TaskModal = ({
	open,
	toggle,
	currentTask,
	handleEditSave,
	handleDelete,
	taskType,
}) => {
	const classes = useStyles();
	const id = currentTask.id || newId;
	const [showUsers, setShowUsers] = useState(false);
	const [userFilter, setUserFilter] = useState('');
	const [task, setTask] = useState({});
	const { users, handleNewTask, handleUsers, loggedInUser } =
		useContext(TaskContext);
	const { enqueueSnackbar } = useSnackbar();
	const [initialLoad, setInitialLoad] = useState(true);

	const snack = useCallback(
		(message, type) => {
			enqueueSnackbar(message, { variant: type, autoHideDuration: 4000 });
		},
		[enqueueSnackbar]
	);

	const filteredUsers = users.filter(
		(u) =>
			u.firstName.toLowerCase().includes(userFilter) ||
			u.lastName.toLowerCase().includes(userFilter)
	);

	const handleAssignment = (newId, assignmentType) => {
		const subjectUser = users.find((u) => u.id === newId);

		if (assignmentType === 'assignee') {
			const { assignedTasks } = subjectUser;
			// Remove the current task from the original assignee
			if (taskType === 'edit') {
				const { assignee: originalAssignee } = currentTask;
				const { id: originalId, assignedTasks: originalAssignedTasks } =
					originalAssignee;
				const originalIndex = originalAssignedTasks.indexOf(originalId);
				originalAssignedTasks.splice(originalIndex, 1);
				originalAssignee.assignedTasks = [...originalAssignedTasks];
				handleUsers(originalAssignee, 'edit');
			}
			//
			const assignedSet = new Set([...assignedTasks, newId]);
			subjectUser.assignedTasks = [...assignedSet];
			setTask((prevState) => ({
				...prevState,
				assignee: subjectUser,
			}));
			setShowUsers(!showUsers);
			setUserFilter('');
		} else {
			setTask((prevState) => ({
				...prevState,
				assignor: subjectUser,
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

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!task.assignee) {
			return snack('An assignee is required.', 'info');
		}
		if (taskType === 'edit') {
			handleEditSave(task);
		} else {
			handleNewTask(task);
		}
		toggle();
	};

	useEffect(() => {
		if (initialLoad) {
			if (taskType === 'edit') {
				setTask(currentTask);
			} else {
				setTask({
					state: 'To Do',
					complete: false,
					id,
					assignor: loggedInUser,
				});
			}
			setInitialLoad(false);
		}
	}, [currentTask, id, taskType, loggedInUser, initialLoad]);

	const assignorName = task.assignor
		? `${task.assignor.firstName} ${task.assignor.lastName}`
		: '';

	const assigneeName = task.assignee
		? `${task.assignee.firstName} ${task.assignee.lastName}`
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
								src={task.assignee?.image || DefaultProfile}
								alt={task.assignee?.name || 'default'}
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
												({ id, image, firstName, lastName }) => (
													<div
														key={id}
														role='presentation'
														className='user-selection-item'
														onClick={() => handleAssignment(id, 'assignee')}
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
										maxLength: 80,
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
									value={task?.assignor?.id || ''}
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
									{users.map(({ firstName, lastName, id }) => (
										<option key={id} value={id}>
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
										onClick={() => handleDelete(id)}
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
