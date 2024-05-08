import React, { useState, useEffect, useRef, useContext } from 'react';
import { Modal, ModalBody, Row, Col, Button, ModalHeader } from 'reactstrap';

import ModalTextField from './ModalTextField';
import { DefaultProfile } from '../../assets/images';
import useStyles from '../../styles/TaskUserModalStyles';
import { NUMBER_REGEX } from '../../helpers/constants';
import { TaskContext } from '../../context/taskContext';
import { addCustomer, updateCustomer } from '../../api/customers';

const acceptableFiles = ['png', 'jpg', 'jpeg'];
const textProps = {
	maxLength: 40,
	minLength: 2,
};

function CustomerModal({
	open,
	toggle,
	currentCustomer,
	setCurrentCustomer,
	type,
}) {
	const classes = useStyles();
	const [customer, setCustomer] = useState({});
	const hiddenFileInput = useRef();
	const { snack, isAdmin } = useContext(TaskContext);
	const viewOnly = !isAdmin;

	const handleCustomer = (value, field) => {
		setCustomer((prevState) => ({
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
						handleCustomer(reader.result, 'logo');
					};
				} else {
					handleCustomer(null, 'logo');
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
			handleCustomer(value.replace(/[^\d/]/g, ''), field);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!customer.logo) {
			return snack('A logo is required.', 'info');
		}
		if (type === 'new') {
			const result = await addCustomer(customer);
			const { status, response } = result;
			if (status === 200) {
				toggle(response);
				return snack(`${customer.customerName} added successfully!`, 'success');
			}
		} else {
			const { logo } = currentCustomer;
			const newLogo = customer.logo !== logo;
			customer.newLogo = newLogo;
			const result = await updateCustomer(customer);
			const { status, response } = result;
			if (status === 200) {
				toggle(response);
				return snack(
					`${customer.customerName} updated successfully!`,
					'success'
				);
			} else {
				return snack(
					`Sorry, we could not update ${customer.customerName}.`,
					'error'
				);
			}
		}
	};

	const handleCancel = () => {
		if (setCurrentCustomer) {
			setCurrentCustomer({});
		}
		setCustomer({});
		toggle();
	};

	useEffect(() => {
		if (type === 'new') {
			setCustomer({ assignedTasks: [] });
		} else setCustomer(currentCustomer);
	}, [currentCustomer, type]);

	return (
		<Modal
			isOpen={open}
			toggle={handleCancel}
			centered
			className={classes.modal}
			size='md'
		>
			<ModalHeader className={classes.modalHeader}>
				<p>{type === 'new' ? 'New ' : 'View or Edit '}Customer</p>
			</ModalHeader>
			<ModalBody className={classes.modalBody}>
				<div className={classes.modalProfileDiv}>
					<img
						src={customer.logo || DefaultProfile}
						alt='customer-profile'
						width={80}
						height={80}
					/>
					<Button
						disabled={viewOnly}
						className='shadow-none'
						type='button'
						size='sm'
						color='link'
						style={{ textDecoration: 'none' }}
						onClick={chooseFile}
					>
						{customer.logo ? 'Change ' : 'Select an '}logo
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
								disabled={viewOnly}
								label='Customer Name'
								inputProps={textProps}
								value={customer?.customerName}
								onChange={(e) => handleCustomer(e.target.value, 'customerName')}
								required
							/>
						</Col>
						<Col>
							<ModalTextField
								disabled={viewOnly}
								label='City'
								inputProps={{
									maxLength: 60,
									minLength: 2,
									style: {
										fontSize: 15,
									},
								}}
								value={customer?.city}
								required
								onChange={(e) => handleCustomer(e.target.value, 'city')}
							/>
						</Col>
					</Row>
					<Row className='mb-4 mx-0'>
						<Col>
							<ModalTextField
								disabled={viewOnly}
								label='State'
								inputProps={{
									maxLength: 25,
									minLength: 2,
									style: {
										fontSize: 15,
									},
								}}
								value={customer?.state}
								required
								onChange={(e) => handleCustomer(e.target.value, 'state')}
							/>
						</Col>
						<Col>
							<ModalTextField
								disabled={viewOnly}
								label='Country'
								value={customer?.country}
								inputProps={{
									maxLength: 25,
									minLength: 3,
									style: {
										fontSize: 15,
									},
								}}
								required
								onChange={(e) => handleCustomer(e.target.value, 'country')}
							/>
						</Col>
					</Row>
					<Row className='mb-4 mx-0'>
						<Col>
							<ModalTextField
								disabled={viewOnly}
								label='Address'
								inputProps={textProps}
								value={customer?.address}
								onChange={(e) => handleCustomer(e.target.value, 'address')}
								required
							/>
						</Col>
						<Col>
							<ModalTextField
								disabled={viewOnly}
								type='number'
								label='Licenses'
								inputProps={{
									min: 0,
								}}
								value={customer?.licensesPurchased}
								onChange={(e) =>
									handleCustomer(parseInt(e.target.value), 'licensesPurchased')
								}
							/>
						</Col>
					</Row>
					<Row className='mb-4 mx-0'>
						<Col>
							<ModalTextField
								disabled={viewOnly}
								label='Email'
								type='email'
								inputProps={{
									maxLength: 60,
									minLength: 5,
									style: {
										fontSize: 15,
									},
								}}
								value={customer?.email}
								required
								onChange={(e) => handleCustomer(e.target.value, 'email')}
							/>
						</Col>
						<Col>
							<ModalTextField
								disabled={viewOnly}
								label='Phone Number'
								value={customer?.phoneNumber}
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

					<Row className='mb-3 mx-0'>
						<Col>
							<Button
								disabled={viewOnly}
								block
								size='sm'
								className='cancel-button'
								onClick={handleCancel}
							>
								Cancel
							</Button>
						</Col>
						<Col>
							<Button
								color='primary'
								block
								size='sm'
								type='submit'
								disabled={viewOnly}
							>
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

export default CustomerModal;
