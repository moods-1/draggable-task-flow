import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
import HC_export_data from 'highcharts/modules/export-data';

HC_more(Highcharts); // required to allow bubble charts
HC_exporting(Highcharts); // required to export/download images png, jpg, svg
HC_export_data(Highcharts); //  required to export csv, xls

const MultipleCharts = ({ chartType, categories, series }) => {
    console.log({categories})
	const options = {
		chart: {
            type: chartType,
        },
        title: {
            text: 'Monthly Task Completion'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: categories,
            crosshair: true
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
                    // align: "left",
                    // verticalAlign: "top",
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
            min: 0,
            title: {
                text: 'Tasks'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series,
	};
	return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default MultipleCharts;
