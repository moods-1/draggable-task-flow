import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
import HC_export_data from 'highcharts/modules/export-data';

HC_more(Highcharts); // required to allow bubble charts
HC_exporting(Highcharts); // required to export/download images png, jpg, svg
HC_export_data(Highcharts); //  required to export csv, xls

const MultipleCharts = ({ chartType, chartHeight }) => {
	const options = {
		chart: {
			type: chartType,
			borderColor: '#DDD',
			borderRadius: 0,
			borderWidth: 1,
			spacing: [20, 20, 20, 20],
			height: chartHeight,
		},
		title: {
			text: '',
		},
		credits: {
			enabled: false,
		},
		tooltip: {
			headerFormat: '<p>{point.key}</p><br>',
			pointFormat:
				'<span style="color:{series.color}">\u25CF</span> <span style="font-size: 11px">{series.name}: {point.y}</span>',
		},
		exporting: {
			enabled: true,
			buttons: {
				contextButton: {
					menuItems: [
						'viewFullscreen',
						'separator',
						'downloadPNG',
						'downloadJPEG',
						'downloadPDF',
						'downloadSVG',
						'separator',
						'downloadCSV',
						'downloadXLS',
						'viewData',
					],
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
							align: 'left',
							verticalAlign: 'top',
							useHTML: true,
							labelFormatter: function () {
								return `<p class="reportLegend">${this.name}</p>`;
							},
						},
					},
				},
			],
		},
		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: undefined,
				skew3d: true,
			},
		},
		xAxis: {
			categories: [],
			labels: {
				skew3d: true,
				style: {
					fontSize: '12px',
				},
			},
		},
		plotOptions: {
			bar: {
				stacking: 'normal',
			},
			column: {
				allowPointSelect: true,
				cursor: 'pointer',
				depth: 35,
			},
			line: {
				marker: {
					enabled: false,
					states: {
						hover: {
							enabled: false,
						},
					},
				},
			},
			area: {
				marker: {
					enabled: false,
					states: {
						hover: {
							enabled: false,
						},
					},
				},
			},
		},
		series: [],
	};
	return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default MultipleCharts;
