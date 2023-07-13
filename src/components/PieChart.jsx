import React, { useState } from 'react';

import PieDonutCharts from './PieDonutCharts';
import ChartControls from './ChartControls';
import ChartDropDown from './ChartDropDown';
import useStyles from '../styles/ChartStyles';
import { CHART_OPTIONS_PIE } from '../helpers/constants';

const PieChart = ({ series }) => {
	const [enable3D, setEnable3D] = useState(false);
	const [enableDataLabels, setEnableDataLabels] = useState(true);
	const [chartType, setChartType] = useState('pie');
	const classes = useStyles();

	const handleChartSelection = (e) => {
		const { value } = e.target;
		const type = value.split(',')[0];
		setChartType(type);
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
					enableDataLabels={enableDataLabels}
				/>
				<ChartDropDown
					selectOptions={CHART_OPTIONS_PIE}
					changeFunction={handleChartSelection}
					defaultValue={chartType}
				/>
			</div>
			<PieDonutCharts
				chartType='pie'
				donut={chartType === 'donut'}
				seriesData={series}
				title='All-time Task Completion'
				subtitle='All users'
				enable3D={enable3D}
				enableDataLabels={enableDataLabels}
			/>
		</div>
	);
};

export default PieChart;
