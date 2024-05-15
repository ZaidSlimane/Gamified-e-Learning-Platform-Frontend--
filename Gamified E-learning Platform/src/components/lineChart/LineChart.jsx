import React from 'react';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const LineChart = ({data}) => {
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white' // change this color as per your requirement
                }
            },
            x: {
                ticks: {
                    color: 'white' // change this color as per your requirement
                }
            },

        },plugins: {
            legend: {
                labels: {
                    color: 'white',
                }
            }
        }
    };

    return (
        <>
            <Line data={data} options={options}/>
        </>
    );
}

export default LineChart;
