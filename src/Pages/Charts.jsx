import React, { useState, useEffect } from 'react';

import MultipleChart from '../components/MultipleChart';
import PieChart from '../components/PieChart';
import { getCompanyTasks } from '../api/tasks';
import useStyles from '../styles/ChartStyles';
import {
	formatMultiChartData,
	formatPieDonutChartData,
	getCompanyId,
} from '../helpers/helperFunctions';
import CustomSpinner from '../components/custom/CustomSpinner';

const Charts = ({ snack }) => {
	const [chartsLoading, setChartsLoading] = useState(true);
	const [multipleChartsCategories, setMultipleChartsCategories] = useState([]);
	const [multipleChartsSeries, setMultipleChartsSeries] = useState([]);
	const [pieDonutSeriesData, setPieDonutSeriesData] = useState([]);

	const classes = useStyles();

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

	return (
		<div className={classes.chartsMain}>
			<div className={classes.chartsContent}>
				{chartsLoading ? (
					<CustomSpinner height='80vh' color={'primary'} />
				) : (
					<>
						<MultipleChart
							series={multipleChartsSeries}
							categories={multipleChartsCategories}
						/>
						<PieChart series={pieDonutSeriesData} />
					</>
				)}
			</div>
		</div>
	);
};

export default Charts;
