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

const MultipleCharts = ({
	chartType,
	categories,
	series,
	title,
	subtitle,
	enable3D,
	enableDataLabels,
	stacking,
}) => {
	const options3d = enable3D
		? { enabled: true, alpha: 15, beta: 10, depth: 50, viewDistance: 25 }
		: { enabled: false, alpha: 0, beta: 0, depth: 0, viewDistance: 0 };

	const options = {
		chart: {
			type: chartType,
			options3d,
			borderRadius: 0,
			spacing: [20, 20, 20, 20],
			backgroundColor: 'rgba(33,33,44,0.5)',
		},
		colors: CHART_COLORS,
		title: {
			text: title || '',
			style: {
				color: '#FFFFFF',
			},
		},
		subtitle: {
			text: subtitle || '',
			style: {
				color: '#FFFFFF',
			},
		},
		xAxis: {
			categories: categories,
			crosshair: true,
			labels: {
				style: {
					color: '#ffffff',
				},
			},
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
							itemStyle: {
								color: '#FFFFFF',
							},
						},
					},
				},
			],
		},
		yAxis: {
			min: 0,
			title: {
				text: '',
			},
			labels: {
				style: {
					color: '#ffffff',
				},
			},
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
			packedbubble: {
				minSize: '60%',
				maxSize: '120%',
				zMin: 0,
				zMax: 1000,
				layoutAlgorithm: {
					splitSeries: false,
					gravitationalConstant: 0.02,
				},
				dataLabels: {
					enabled: true,
					format: '{point.name}',
					filter: {
						property: 'y',
						operator: '>',
						value: 250,
					},
					style: {
						color: 'black',
						textOutline: 'none',
						fontWeight: 'normal',
					},
				},
			},
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
				stacking: stacking ? 'normal' : '',
				dataLabels: {
					enabled: enableDataLabels,
				},
			},
			bar: {
				borderRadius: '50%',
				borderColor: 'none',
				dataLabels: {
					enabled: enableDataLabels,
				},
			},
			columnpyramid: {
				borderColor: 'none',
			},
			cylinder: {
				borderColor: 'none',
			},
		},
		series,
		credits: {
			// Hide Highcharts.com at the bottom of the chart
			enabled: false,
		},
	};
	return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default MultipleCharts;
