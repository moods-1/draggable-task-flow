import React, { useState, useEffect } from 'react';

import MultipleChart from '../components/MultipleChart';
import PieChart from '../components/PieChart';
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

	const classes = useStyles();

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
			<div className={classes.chartsContent}>
				<MultipleChart
					series={multipleChartsSeries}
					categories={multipleChartsCategories}
				/>
				<PieChart series={pieDonutSeriesData} />
			</div>
		</div>
	);
};

export default Charts;
