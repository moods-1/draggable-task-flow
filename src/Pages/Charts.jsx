import React, { useState, useEffect, useContext } from 'react';

import MultipleChart from '../components/MultipleChart';
import PieChart from '../components/PieChart';
import { getCompanyTasks } from '../api/tasks';
import useStyles from '../styles/ChartStyles';
import {
	formatMultiChartData,
	formatPieDonutChartData,
	getCompanyId,
} from '../helpers/helperFunctions';
import { Slider } from '../components/custom/Loaders';
import { TaskContext } from '../context/taskContext';

const Charts = ({ snack }) => {
	const [chartsLoading, setChartsLoading] = useState(true);
	const [multipleChartsCategories, setMultipleChartsCategories] = useState([]);
	const [multipleChartsSeries, setMultipleChartsSeries] = useState([]);
	const [pieDonutSeriesData, setPieDonutSeriesData] = useState([]);
	const classes = useStyles();
	const { handleHeaderText } = useContext(TaskContext);

	useEffect(() => {
		setChartsLoading(true);
		const fetchTasks = async () => {
			const companyId = getCompanyId();
			const result = await getCompanyTasks(true, companyId);
			const { status, message, response } = result;
			if (status < 300) {
				const { multiCategories, multiDataSeries } =
					formatMultiChartData(response);
				const { pieDonutData } = formatPieDonutChartData(response);
				setMultipleChartsCategories(multiCategories);
				setMultipleChartsSeries(multiDataSeries);
				setPieDonutSeriesData(pieDonutData);
			} else {
				snack(message, 'error');
			}
			setChartsLoading(false);
		};
		fetchTasks();
	}, [snack]);

	useEffect(() => {
		handleHeaderText({ title: 'Charts', subtitle: 'Visualize Workflow' });
	}, [handleHeaderText]);

	return (
		<div className={classes.chartsMain}>
			{chartsLoading ? (
				<div className={classes.chartBox} style={{ height: 500 }}>
					<h5>Loading ...</h5>
					<Slider />
				</div>
			) : (
				<>
					<div className={classes.chartsContent}>
						<MultipleChart
							series={multipleChartsSeries}
							categories={multipleChartsCategories}
						/>
						<PieChart series={pieDonutSeriesData} />
					</div>
				</>
			)}
		</div>
	);
};

export default Charts;
