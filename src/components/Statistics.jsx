import React, { useContext, useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Spinner } from 'reactstrap';
import useStyles from '../styles/StatisticsStyles';
import { TaskContext } from '../context/taskContext';
import {
	SIDEBAR_PROGRESS_LABELS,
	MENU_PRIORITY_BUTTONS,
} from '../helpers/constants';
import { statusColor } from '../helpers/helperFunctions';

function Statistics({ showFilters, filterObject, handleFilterObject }) {
	const [progressValues, setProgressValues] = useState([]);
	const [priorityValues, setPriorityValues] = useState([]);
	const { tasks } = useContext(TaskContext);
	const classes = useStyles();
	const priorityLabels = MENU_PRIORITY_BUTTONS.map((m) => m.label);

	useEffect(() => {
		let localTasks = Object.values(tasks);
		let complete = 0;
		let inProgress = 0;
		let toDo = 0;
		let high = 0;
		let mid = 0;
		let low = 0;
		const total = localTasks.length;
		localTasks.forEach((t) => {
			if (t.state === 'Complete') {
				complete += 1;
			} else if (t.state === 'In Progress') {
				inProgress += 1;
			} else if (t.state === 'To Do') {
				toDo += 1;
			}
			if (t.priority === 0) {
				high += 1;
			} else if (t.priority === 1) {
				mid += 1;
			} else if (t.priority === 2) {
				low += 1;
			}
		});
		const toDoPercentage = parseInt((toDo / total) * 100) || 0;
		const inProgressPercentage = parseInt((inProgress / total) * 100) || 0;
		const completePercentage = parseInt((complete / total) * 100) || 0;

		setProgressValues([
			toDoPercentage,
			inProgressPercentage,
			completePercentage,
		]);
		setPriorityValues([high, mid, low]);
	}, [tasks]);

	return (
		<div className={classes.statisticsMain}>
			<div className={classes.statisticsContent}>
				<div>
					<p className='statistics-section-title'>Progress Levels</p>
					<div className='statistics-box'>
						{SIDEBAR_PROGRESS_LABELS.map((label, index) => (
							<div className='statistic-box' key={label}>
								<div className='statistic-header'>
									<p>{label}</p>
								</div>
								<div style={{ width: 80, height: 80 }}>
									{progressValues.length ? (
										<CircularProgressbar
											value={progressValues[index]}
											text={`${progressValues[index]}%`}
											strokeWidth={7}
											styles={buildStyles({
												strokeLinecap: 'butt',
												textColor: 'white',
												pathColor: '#0275d8',
												trailColor: 'white',
											})}
										/>
									) : (
										<Spinner />
									)}
								</div>
							</div>
						))}
					</div>
				</div>
				<div>
					<p className='statistics-section-title'>Priority Counts</p>
					<div className='statistics-box'>
						{priorityLabels.map((label, index) => (
							<div className='priority-box' key={label}>
								<div className='priority-header'>
									<p>{label}</p>
								</div>
								<p style={{ color: statusColor(label) }}>
									{priorityValues[index]}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Statistics;
