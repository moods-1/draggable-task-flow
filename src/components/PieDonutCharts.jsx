import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d';
import cylinder from 'highcharts/modules/cylinder';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
import HC_export_data from 'highcharts/modules/export-data';
import { CHART_COLORS } from '../helpers/constants';

HC_more(Highcharts); // required to allow bubble charts
HC_exporting(Highcharts); // required to export/download images png, jpg, svg
HC_export_data(Highcharts); //  required to export csv, xls
highcharts3d(Highcharts);
cylinder(Highcharts);

const PieDountCharts = ({
	chartType,
	seriesData,
	title,
	subtitle,
	enable3D,
}) => {
	const options3d = enable3D
		? { enabled: true, alpha: 15, beta: 10, depth: 50, viewDistance: 25 }
		: { enabled: false, alpha: 0, beta: 0, depth: 0, viewDistance: 0 };

	const options = {
		chart: {
			type: chartType,
			borderRadius: 7,
			borderWidth: 1,
			spacing: [20, 20, 20, 20],
			options3d,
		},
		colors: CHART_COLORS,
		title: {
			text: title || '',
		},
		subtitle: {
			text: subtitle || '',
		},
		responsive: {
			rules: [
				{
					condition: {
						minHeight: 200,
						minWidth: 0,
					},
					chartOptions: {
						legend: {
							useHTML: true,
							labelFormatter: function () {
								return `<p class="reportLegend">${this.name}</p>`;
							},
						},
					},
				},
			],
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat:
				'<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y}</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true,
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				},
			},
		},
		series: [
			{
				type: 'pie',
				name: '',
				// 60% for donut type
				innerSize: `${chartType === 'pie' ? '0%' : '60%'}`,
				data: seriesData,
				colorByPoint: true,
			},
		],
		credits: {
			// Hide Highcharts.com at the bottom of the chart
			enabled: false,
		},
	};
	return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieDountCharts;
