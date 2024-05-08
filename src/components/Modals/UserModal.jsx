import React, { useState, useEffect, useRef, useContext } from 'react';
import {
	Modal,
	ModalBody,
	Row,
	Col,
	Button,
	ModalHeader,
	Label,
} from 'reactstrap';
import ModalTextField from './ModalTextField';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { DefaultProfile } from '../../assets/images';
import useStyles from '../../styles/TaskUserModalStyles';
import { NUMBER_REGEX } from '../../helpers/constants';
import { TaskContext } from '../../context/taskContext';
import UserTaskList from '../UserTaskList';
import { addUser, updateUser } from '../../api/users';

const acceptableFiles = ['png', 'jpg', 'jpeg'];
const textProps = {
	maxLength: 30,
	minLength: 2,
};

function UserModal({ open, toggle, currentUser, setCurrentUser, type }) {
	const classes = useStyles();
	const [user, setUser] = useState({});
	const [showTasks, setShowTasks] = useState(false);
	const [showTasksTable, setShowTasksTable] = useState(false);
	const [tasksAssigned, setTasksAssigned] = useState([]);
	const hiddenFileInput = useRef();
	const { handleUsers, tasks, snack } = useContext(TaskContext);
	const passwordRequired = user?.password?.length > 0 || type === 'new';

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
					if (fileObj.size > 50000) {
						return snack('Please keep the file size below 50 Kb.', 'info');
					}
					const reader = new FileReader();
					reader.readAsDataURL(fileObj);
					reader.onloadend = () => {
						handleUser(reader.result, 'image');
					};
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

	const handlePhoneNumber = (value, field) => {
		if (NUMBER_REGEX.test(value)) {
			return null;
		} else {
			handleUser(value.replace(/[^\d/]/g, ''), field);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!user.image) {
			return snack('A profile image is required.', 'info');
		}
		if (type === 'new') {
			const result = await addUser(user);
			const { status, response } = result;
			if (status === 200) {
				handleUsers(response, type);
				toggle();
				return snack(`${user.firstName} added successfully!`, 'success');
			}
		} else {
			const { image } = currentUser;
			const newImage = user.image !== image;
			user.newImage = newImage;
			const result = await updateUser(user);
			const { status, response } = result;
			if (status < 400) {
				handleUsers(response, type);
				toggle();
				return snack(`${user.firstName} updated successfully!`, 'success');
			} else {
				return snack(`Sorry, we could not update ${user.firstName}.`, 'error');
			}
		}
	};

	const handleCancel = () => {
		if (setCurrentUser) {
			setCurrentUser({});
		}
		setUser({});
		toggle();
	};

	useEffect(() => {
		if (type === 'new') {
			setUser({ assignedTasks: [] });
		} else {
			setUser(currentUser);
		}
	}, [currentUser, type]);

	useEffect(() => {
		if (type === 'edit' && user?.assignedTasks) {
			const tasksSet = new Set([]);
			user?.assignedTasks.forEach((t) => {
				Object.values(tasks).forEach((task) => {
					if (task._id === t) {
						tasksSet.add(task);
					}
				});
			});
			setShowTasks(type === 'edit');
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
						onClick={chooseFile}
					>
						{user.image ? 'Change ' : 'Select an '}image
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
							<ModalTextField
								label='First Name'
								inputProps={textProps}
								value={user?.firstName}
								onChange={(e) => handleUser(e.target.value, 'firstName')}
								required
							/>
						</Col>
						<Col>
							<ModalTextField
								label='Last Name'
								inputProps={textProps}
								value={user?.lastName}
								onChange={(e) => handleUser(e.target.value, 'lastName')}
								required
							/>
						</Col>
					</Row>
					<Row className='mb-4 mx-0'>
						<Col>
							<ModalTextField
								label='Email'
								type='email'
								inputProps={{
									maxLength: 60,
									minLength: 5,
									style: {
										fontSize: 15,
									},
								}}
								value={user?.email}
								required
								onChange={(e) => handleUser(e.target.value, 'email')}
							/>
						</Col>
						<Col>
							<ModalTextField
								label='Phone Number'
								value={user?.phoneNumber}
								inputProps={{
									maxLength: 10,
									minLength: 10,
									style: {
										fontSize: 15,
									},
								}}
								required
								onChange={(e) =>
									handlePhoneNumber(e.target.value, 'phoneNumber')
								}
							/>
						</Col>
					</Row>
					<Row className='mb-5 mx-0'>
						<Col>
							<ModalTextField
								label='Password'
								type='password'
								value={user?.password}
								required={passwordRequired}
								inputProps={{
									maxLength: 20,
									minLength: 6,
								}}
								onChange={(e) => handleUser(e.target.value, 'password')}
							/>
						</Col>
						<Col />
					</Row>
					{showTasks && (
						<Row className='mb-4 mx-0' style={{ marginTop: '-20px' }}>
							<Col>
								<div className='d-flex justify-content-between'>
									<Label className='mb-2'>{`Assigned Tasks (${tasksAssigned.length})`}</Label>
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
								{showTasksTable && tasksAssigned.length > 0 && (
									<UserTaskList tasksAssigned={tasksAssigned} />
								)}
							</Col>
						</Row>
					)}
					<Row className='mb-3 mx-0'>
						<Col>
							<Button
								block
								size='sm'
								className='cancel-button'
								onClick={handleCancel}
							>
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

export default UserModal;
