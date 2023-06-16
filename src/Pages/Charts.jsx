import React, { useState, useEffect } from 'react';
import MultipleCharts from '../components/MultipleChartTypes';
import PieDonutCharts from '../components/PieDonutCharts';
import { getTasks } from '../api/tasks';
import useStyles from '../styles/ChartStyles';
import {
	formatMultiChartData,
	formatPieDonutChartData,
} from '../helpers/helperFunctions';

const Charts = () => {
	const [multipleChartsCategories, setMultipleChartsCategories] = useState([]);
	const [multipleChartsSeries, setMultipleChartsSeries] = useState([]);
	const [pieDonutSeriesData, setPieDonutSeriesData] = useState([]);
	const [enable3D, setEnable3D] = useState(false);
	const [enableDataLabels, setEnableDataLabels] = useState(false);
	const classes = useStyles();

	const handle3D = (e) => {
		setEnable3D(e.target.checked);
	};

	const handleDataLabels = (e) => {
		setEnableDataLabels(e.target.checked);
	};

	useEffect(() => {
		const fetchTasks = async () => {
			const result = await getTasks(true);
			const { response } = result?.data;
			const { multiCategories, multiDataSeries } =
				formatMultiChartData(response);
			const { pieDonutData } = formatPieDonutChartData(response);
			setMultipleChartsCategories(multiCategories);
			setMultipleChartsSeries(multiDataSeries);
			setPieDonutSeriesData(pieDonutData);
		};
		fetchTasks();
	}, []);

	return (
		<div className={classes.chartsMain}>
			<div className={classes.selectionBox}>
				<label className={classes.label}>Enable: &nbsp;</label>
				<label className={classes.label}>3D</label>
				<input type='checkbox' onChange={handle3D} />
				<label className={classes.label}>Data Labels</label>
				<input type='checkbox' onChange={handleDataLabels} />
			</div>
			<div className={classes.chartsContent}>
				<div className={classes.chartBox}>
					<MultipleCharts
						chartType='column'
						categories={multipleChartsCategories}
						series={multipleChartsSeries}
						title='Monthly Task Complete'
						subtitle='All users'
						enable3D={enable3D}
						enableDataLabels={enableDataLabels}
						stacking={true}
					/>
				</div>
				<div className={classes.chartBox}>
					<MultipleCharts
						chartType='column'
						categories={multipleChartsCategories}
						series={multipleChartsSeries}
						title='Monthly Task Completion'
						subtitle='All users'
						enable3D={enable3D}
						enableDataLabels={enableDataLabels}
						stacking={false}
					/>
				</div>
				<div className={classes.chartBox}>
					<PieDonutCharts
						chartType='pie'
						seriesData={pieDonutSeriesData}
						title='All-time Task Completion'
						subtitle='All users'
						enable3D={enable3D}
						enableDataLabels={enableDataLabels}
					/>
				</div>
			</div>
		</div>
	);
};

export default Charts;
