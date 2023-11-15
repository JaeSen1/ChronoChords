// Import necessary modules and components from React and Chart.js
import React, { useState, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const DecadeChart = () => {
    // State for storing the chart data
    const [chartData, setChartData] = useState({});
    // State for storing raw data for each decade for the right-side column
    const [rawData, setRawData] = useState([]);
    // State for storing the total number of songs in the database
    const [totalNumSongs, setTotalNumSongs] = useState(0);

    // Fetch and process data when the component mounts
    useEffect(() => {
        fetch('http://localhost:8085/spotify/percentageByDecade')
            .then(response => response.json())
            .then(data => {

                console.log(data);

                setTotalNumSongs(data.totalSongs);

                // Sort decades in descending order
                const sortedPercentageEntries = Object.entries(data.percentageByDecade)
                .sort((a, b) => b[0].localeCompare(a[0]));

                // Prepare labels and percentages for the chart
                const labels = sortedPercentageEntries.map(entry => entry[0]);
                const percentages = sortedPercentageEntries.map(entry => entry[1]);


                // Define a set of colors for the chart segments
                const colors = [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(27, 133, 184, 0.5)',
                    'rgba(255, 0, 0, 0.5)',
                    'rgba(85, 158, 131, 0.5)',
                    'rgba(174, 90, 65, 0.5)',
                    'rgba(104, 196, 175, 0.5)',
                    'rgba(195, 203, 113, 0.5)',
                ];

                // Set the processed data to the chartData state
                setChartData({ 
                    labels: labels, 
                    datasets: [{
                        label: 'Songs %',
                        data: percentages,
                        backgroundColor: colors,
                        borderWidth: 1,
                    }] 
                });

                // Combine percentage and count data for raw data display
                const combinedData = sortedPercentageEntries.map(([decade, percentage]) => {
                    const count = data.countByDecade[decade] || 0; // Get count by decade or default to 0 if not present
                    return { decade, percentage, count };
                });

                setRawData(combinedData);
                console.log(rawData);
                })

            .catch(error => console.error('Error:', error));
    }, []);

    // Chart configuration options
    const options = {
        animation: {
            animateRotate: true,
            animateScale: true
        }
    };

    // Styling for the full-screen layout
    const fullScreenCenterStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        width: '100vw',
    };

    // Styling for the chart container
    const chartContainerStyle = {
        width: '800px',
        height: '800px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    // Styling for the raw data display container
    const rawDataStyle = {
        marginLeft: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    };

    // Function to determine the color of percentage text based on its value
    const getColorBasedOnPercentage = (percentage) => {
        const greenValue = Math.min(255, Math.round(255 * (percentage / 7)));
        const redValue = 255 - greenValue;
        return `rgb(${redValue}, ${greenValue}, 0)`;
    };

    // Render the component
    return (
        <div style={fullScreenCenterStyle}>
            <div style={chartContainerStyle}>
                <h2>Database Song Distribution by Decade</h2>
                {chartData && chartData.labels && chartData.labels.length > 0 ? (
                    <PolarArea data={chartData} options={options}/>
                ) : (
                    <p>Loading chart data...</p>
                )}
            </div>
            <div style={rawDataStyle}>
                <h2>Raw Data | {totalNumSongs} Total Songs</h2>
                {rawData.map(({ decade, percentage, count }) => (
                    <p key={decade} style={{ color: getColorBasedOnPercentage(percentage) }}>
                        {`${decade}: ${percentage.toFixed(2)}%  --->  ${count} Songs`}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default DecadeChart;
