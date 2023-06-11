import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import MultipleCharts from './MultipleCharts';
import { getTasks } from '../api/tasks';
import useStyles from '../styles/ChartStyles';

const formatData = (data, subject) => {
	const dataObject = {};
	data.forEach((d) => {
		const dateKey = d.completionDate.split('T')[0].slice(0, 7);
		if (dateKey in dataObject) {
			dataObject[dateKey] = dataObject[dateKey] + 1;
		} else {
			dataObject[dateKey] = 1;
		}
	});
	const dataCategories = Object.keys(dataObject).map((d) =>
		moment(d, 'YYYY-MM').format('MMM')
	);
	const dataSeries = [{ name: subject, data: Object.values(dataObject) }];
	return { dataCategories, dataSeries };
};

const Charts = () => {
	const [categories, setCategories] = useState([]);
	const [series, setSeries] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		const fetchTasks = async () => {
			const result = await getTasks(true);
			const { response } = result?.data;
			const { dataCategories, dataSeries } = formatData(response, 'Done');
			setCategories(dataCategories);
			setSeries(dataSeries);
		};
		fetchTasks();
	}, []);

	return (
		<div className={classes.chartsMain}>
			<div className={classes.chartBox}>
				<MultipleCharts
					chartType='line'
					categories={categories}
					series={series}
				/>
			</div>
			<div className={classes.chartBox}>
				<MultipleCharts
					chartType='column'
					categories={categories}
					series={series}
				/>
			</div>
		</div>
	);
};

export default Charts;
