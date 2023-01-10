import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useContext,
} from 'react';
import {
	Modal,
	ModalBody,
	Row,
	Col,
	Button,
	ModalHeader,
	Label,
} from 'reactstrap';
import { TextField } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { DefaultProfile } from '../../images';
import useStyles from '../../styles/UserModalStyles';
import { makeRandomId } from '../../helpers/helperFunctions';
import { NUMBER_REGEX } from '../../helpers/constants';
import { useSnackbar } from 'notistack';
import { TaskContext } from '../../context/taskContext';
import UserTaskList from '../UserTaskList';

const newId = makeRandomId(8);
const acceptableFiles = ['png', 'jpg', 'jpeg'];

function TaskModal({ open, toggle, currentUser, setCurrentUser, type }) {
	const classes = useStyles();
	const id = currentUser?.id || newId;
	const [user, setUser] = useState({});
	const [showTasks, setShowTasks] = useState(false);
	const [showTasksTable, setShowTasksTable] = useState(false);
	const [tasksAssigned, setTasksAssigned] = useState([]);
	const hiddenFileInput = useRef();
	const { enqueueSnackbar } = useSnackbar();
	const { handleUsers, tasks } = useContext(TaskContext);

	const snack = useCallback(
		(message, type) => {
			enqueueSnackbar(message, { variant: type, autoHideDuration: 4000 });
		},
		[enqueueSnackbar]
	);

	const handleUser = (value, field) => {
		setUser((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	const onDrop = (e) => {
		const fileObj = e.target.files[0];
		if (fileObj) {
			const filename = fileObj.name;
			if (fileObj) {
				const fileExt = filename.substring(filename.lastIndexOf('.') + 1);
				if (fileExt && acceptableFiles.some((type) => fileExt.includes(type))) {
					handleUser(URL.createObjectURL(fileObj), 'image');
				} else {
					handleUser(null, 'image');
					snack('Only files with png, jpeg or jpg extensions please.', 'error');
				}
			}
		}
	};

	const chooseFile = () => {
		hiddenFileInput.current.click();
	};

	const handleImageButton = () => {
		if (user.image) {
			setUser((prevState) => ({ ...prevState, image: '' }));
		} else {
			chooseFile();
		}
	};

	const handlePhoneNumber = (value, field) => {
		if (NUMBER_REGEX.test(value)) {
			return null;
		} else {
			handleUser(value.replace(/[^\d/]/g, ''), field);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!user.image) {
			return snack('A profile image is required.', 'info');
		}
		handleUsers(user, type);
		toggle();
	};

	const handleCancel = () => {
		setCurrentUser({});
		setUser({});
		toggle();
	};

	useEffect(() => {
		if (type === 'new') {
			setUser({ id, assignedTasks: [] });
		} else setUser(currentUser);
	}, [currentUser, id, type]);

	useEffect(() => {
		if (type === 'edit' && user?.assignedTasks) {
			const tasksSet = new Set([]);
			user?.assignedTasks.forEach((t) => {
				Object.values(tasks).forEach((task) => {
					if (task.id === t) {
						tasksSet.add(task);
					}
				});
			});
			setShowTasks(tasksSet.size ? true : false);
			setTasksAssigned([...tasksSet]);
		}
	}, [type, user.assignedTasks, tasks]);

	return (
		<Modal
			isOpen={open}
			toggle={handleCancel}
			centered
			className={classes.modal}
			size='md'
		>
			<ModalHeader className={classes.modalHeader}>
				<p>{type === 'new' ? 'New ' : 'View or Edit '}User</p>
			</ModalHeader>
			<ModalBody className={classes.modalBody}>
				<div className={classes.modalProfileDiv}>
					<img
						src={user.image || DefaultProfile}
						alt='user-profile'
						width={80}
						height={80}
					/>
					<Button
						className='shadow-none'
						size='sm'
						color='link'
						style={{ textDecoration: 'none' }}
						onClick={handleImageButton}
					>
						{user.image ? 'Delete ' : 'Select an '}image
					</Button>
					<input
						ref={hiddenFileInput}
						type='file'
						style={{ display: 'none' }}
						multiple={false}
						accept='.png, .jpg, .jpeg'
						onChange={(e) => onDrop(e)}
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<Row className='mb-4 mx-0'>
						<Col>
							<TextField
								label='First Name'
								variant='standard'
								size='small'
								required
								fullWidth
								inputProps={{
									maxLength: 30,
									minLength: 2,
									style: {
										fontSize: 15,
									},
								}}
								value={user?.firstName || ''}
								onChange={(e) => handleUser(e.target.value, 'firstName')}
							/>
						</Col>
						<Col>
							<TextField
								label='Last Name'
								variant='standard'
								size='small'
								required
								fullWidth
								inputProps={{
									maxLength: 30,
									minLength: 2,
									style: {
										fontSize: 15,
									},
								}}
								value={user?.lastName || ''}
								onChange={(e) => handleUser(e.target.value, 'lastName')}
							/>
						</Col>
					</Row>
					<Row className='mb-5 mx-0'>
						<Col>
							<TextField
								label='Email'
								variant='standard'
								size='small'
								type='email'
								required
								fullWidth
								inputProps={{
									maxLength: 60,
									minLength: 5,
									style: {
										fontSize: 15,
									},
								}}
								value={user?.email || ''}
								onChange={(e) => handleUser(e.target.value, 'email')}
							/>
						</Col>
						<Col>
							<TextField
								label='Phone Number'
								variant='standard'
								size='small'
								type='text'
								fullWidth
								value={user?.phoneNumber || ''}
								required
								inputProps={{
									maxLength: 10,
									minLength: 10,
									style: {
										fontSize: 15,
									},
								}}
								onChange={(e) =>
									handlePhoneNumber(e.target.value, 'phoneNumber')
								}
							/>
						</Col>
					</Row>
					{showTasks && (
						<Row className='mb-4 mx-0' style={{ marginTop: '-20px' }}>
							<Col>
								<div className='d-flex justify-content-between'>
									<Label className='mb-2'>Assigned Tasks</Label>{' '}
									{showTasksTable ? (
										<ExpandLess
											role='button'
											onClick={() => setShowTasksTable(false)}
										/>
									) : (
										<ExpandMore
											role='button'
											onClick={() => setShowTasksTable(true)}
										/>
									)}
								</div>
								{showTasksTable && (
									<UserTaskList tasksAssigned={tasksAssigned} />
								)}
							</Col>
						</Row>
					)}
					<Row className='mb-3 mx-0'>
						<Col>
							<Button block size='sm' className='cancel-button' onClick={handleCancel}>
								Cancel
							</Button>
						</Col>
						<Col>
							<Button color='primary' block size='sm' type='submit'>
								Save User
							</Button>
						</Col>
					</Row>
				</form>
			</ModalBody>
			<Button close className={classes.closeButton} onClick={handleCancel} />
		</Modal>
	);
}

export default TaskModal;
