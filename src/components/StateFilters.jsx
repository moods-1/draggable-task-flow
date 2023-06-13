import React from 'react';
import useStyles from '../styles/TasksStyles';
import { TASK_STATE_FILTERS } from '../helpers/constants';

function StateFilters({ filterObject, handleFilterObject, showFilters }) {
	const classes = useStyles();
	return (
		<div className={classes.filterMain}>
			<div className={`filter-content ${showFilters ? 'filter-grow' : ''}`}>
				<p className='filter-subject-label'>State:</p>
				{TASK_STATE_FILTERS.map(({ label, value }) => (
					<div
						key={label}
						className='form-check form-check-inline align-items-center'
					>
						<label className='form-check-label mr-2' htmlFor={`inlineCheckbox${label}`}>
							{label}
						</label>
						<input
							type='checkbox'
							id={`inlineCheckbox${label}`}
							value={value}
							checked={label in filterObject}
							onChange={() => handleFilterObject(label, value)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default StateFilters;
