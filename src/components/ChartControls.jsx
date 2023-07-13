import React from 'react';

import useStyles from '../styles/ChartStyles';

const ChartControls = ({ handle3D, handleDataLabels, enableDataLabels }) => {
	const classes = useStyles();

	return (
		<div className={classes.selectionBox}>
			<label className={classes.label} htmlFor='input-3d'>
				3D
			</label>
			<input type='checkbox' id='input-3d' onChange={handle3D} />
			<label className={classes.label} htmlFor='data-labels'>
				Data Labels
			</label>
			<input
				type='checkbox'
				id='data-labels'
				onChange={handleDataLabels}
				checked={enableDataLabels}
			/>
		</div>
	);
};

export default ChartControls;
