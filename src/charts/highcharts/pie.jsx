import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = ({ fullWithChart }) => {

    // useEffect(() => {
        const chartOptions = {
            chart: {
                type: 'pie',
                height: fullWithChart ? "calc(100vh - 32px - 16px - 24px)" : 260
            },
            title: {
                text: null,
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Cherries', 'Dates'],
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Quantity',
                },
            },
            series: [
                {
                    name: 'Fruits',
                    data: [5, 8, 12, 6],
                },
            ],
        };
    // }, [fullWithChart])

    return (
        <div id='highpie' style={{ height: fullWithChart ? "calc(100vh - 32px - 16px - 24px)" : "260px", width: "100%" }}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}

export default PieChart;