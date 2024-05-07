import React, { useContext, useEffect, useState } from 'react';
import { Circle } from '@mui/icons-material';

import { HOME_SALES_DATA_SERIES } from '../../helpers/constants';
import useStyles from '../../styles/HomeStyles';
import MultipleCharts from '../../components/MultipleChartTypes';
import TopCustomers from './TopCustomers';
import CustomDataTable from '../../components/custom/CustomDataTable';
import { TaskContext } from '../../context/taskContext';
import { phoneNumberHyphenator } from '../../helpers/helperFunctions';
import { DefaultProfile } from '../../assets/images';
import { USERS_TABLE_HEADERS } from '../../helpers/constants';

const xAxisOptions = {
	type: 'datetime',
	startOnTick: true,
	dateTimeLabelFormats: {
		week: '%e of %b',
	},
};

export default function Home() {
	const [homeUsers, setHomeUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const classes = useStyles();
	const { users, handleHeaderText } = useContext(TaskContext);
	const tableHeaders = USERS_TABLE_HEADERS.filter((u) => u.label !== 'ACTION');

	const rows = homeUsers.map((user) => {
		const { image, firstName, lastName, phoneNumber, loggedIn } = user;
		const imageAlt = `${firstName} ${lastName}`;
		return {
			...user,
			phoneNumber: phoneNumberHyphenator(phoneNumber),
			profile: (
				<img
					src={image || DefaultProfile}
					alt={imageAlt}
					height={30}
					width={30}
				/>
			),
			loggedIn: loggedIn ? (
				<Circle sx={{ fontSize: 10, color: '#00ff00' }} />
			) : (
				<Circle sx={{ fontSize: 10, color: '#f00' }} />
			),
		};
	});

	useEffect(() => {
		handleHeaderText({ title: 'Home', subtitle: 'General Company Overview' });
	}, [handleHeaderText]);

	useEffect(() => {
		if (users.length) {
			setHomeUsers(users);
			setIsLoading(false);
		}
	}, [users]);

	return (
		<div className={classes.homeMain}>
			<div className='home-content'>
				<div className='section'>
					<div className='section-flex-2'>
						<div className='chart-box '>
							<MultipleCharts
								chartType='area'
								series={HOME_SALES_DATA_SERIES}
								enable3D={false}
								enableDataLabels={true}
								title='All-time Sales by Country'
								xAxisOptions={xAxisOptions}
							/>
						</div>
					</div>
					<TopCustomers />
				</div>
			</div>
			<div className='dashcard user-section'>
				<p>Users</p>
				<CustomDataTable
					rows={rows}
					columns={tableHeaders}
					dataFilter={null}
					filterable
					tableHeight={600}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
