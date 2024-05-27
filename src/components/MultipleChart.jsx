import React, { useState } from 'react';

import MultipleCharts from './MultipleChartTypes';
import ChartControls from './ChartControls';
import ChartDropDown from './ChartDropDown';
import useStyles from '../styles/ChartStyles';
import { CHART_OPTIONS_MULTIPLE } from '../helpers/constants';

const MultipleChart = ({ series, categories }) => {
	const [enable3D, setEnable3D] = useState(false);
	const [enableDataLabels, setEnableDataLabels] = useState(false);
	const [stacked, setStacked] = useState(false);
	const [multipleChartType, setMultipleChartType] = useState('area');
	const classes = useStyles();

	const handleChartSelection = (e) => {
		const { value } = e.target;
		const [type, label] = value.split(',');
		setMultipleChartType(type);
		setStacked(label?.includes('Stacked'));
	};

	const handle3D = (e) => {
		setEnable3D(e.target.checked);
	};

	const handleDataLabels = (e) => {
		setEnableDataLabels(e.target.checked);
	};

	return (
		<div className={classes.chartBox}>
			<div className='chart-head'>
				<ChartControls
					handle3D={handle3D}
					handleDataLabels={handleDataLabels}
				/>
				<ChartDropDown
					selectOptions={CHART_OPTIONS_MULTIPLE}
					changeFunction={handleChartSelection}
					defaultValue={multipleChartType}
				/>
			</div>
			<MultipleCharts
				chartType={multipleChartType}
				categories={categories}
				series={series}
				title='Monthly Task Complete'
				subtitle='All users'
				enable3D={enable3D}
				enableDataLabels={enableDataLabels}
				stacking={stacked}
			/>
		</div>
	);
};

export default MultipleChart;
