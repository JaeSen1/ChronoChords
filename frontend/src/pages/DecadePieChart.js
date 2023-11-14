import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const DecadePieChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        fetch('http://localhost:8085/spotify/percentageByDecade')
            .then(response => response.json())
            .then(data => {
                const labels = Object.keys(data);
                const percentages = Object.values(data);

                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Songs %',
                        data: percentages,
                        backgroundColor: [
                            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'purple', 'pink', 'gray', 'maroon', 'brown'
                        ],
                        borderWidth: 2,
                    }],
                });
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const fullScreenCenterStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh', // full viewport height
        width: '100vw', // full viewport width
    };

    const chartContainerStyle = {
        width: '600px', // Adjust the width as needed
        height: '600px', // Adjust the height as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={fullScreenCenterStyle}>
            <div style={chartContainerStyle}>
                <h2>Song Distribution by Decade</h2>
                {chartData && chartData.labels && chartData.labels.length > 0 ? (
                    <Pie data={chartData} />
                ) : (
                    <p>Loading chart data...</p>
                )}
            </div>
        </div>
    );
};

export default DecadePieChart;

