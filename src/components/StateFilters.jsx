import React from 'react';
import useStyles from '../styles/TasksStyles';
import { TASK_STATE_FILTERS } from '../helpers/constants';

function StateFilters({ filterObject, handleFilterObject }) {
	const classes = useStyles();
	return (
		<div className={classes.filterMain}>
			<p className='filter-subject-label'>State:</p>
			{TASK_STATE_FILTERS.map(({ label, value }) => (
				<div
					key={label}
					className='form-check form-check-inline align-items-center'
				>
					<label className='form-check-label mr-2' htmlFor='inlineCheckbox1'>
						{label}
					</label>
					<input
						className='form-check-input'
						type='checkbox'
						id={`inlineCheckbox${label}`}
						value={value}
						checked={label in filterObject}
						onChange={() => handleFilterObject(label, value)}
					/>
				</div>
			))}
		</div>
	);
}

export default StateFilters;
