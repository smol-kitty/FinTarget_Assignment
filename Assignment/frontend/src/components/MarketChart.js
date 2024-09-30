import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MarketChart = ({ symbol }) => {
  const storedData =
    JSON.parse(localStorage.getItem(`marketData_${symbol}`)) || [];
  const chartData = storedData.map((data) => ({
    closePrice: parseFloat(data.k.c),
    time: new Date(data.k.t).toLocaleTimeString(),
  }));
  const data = {
    labels: chartData.map((data) => data.time),
    datasets: [
      {
        label: `${symbol.toUpperCase()} Close Price`,
        data: chartData.map((data) => data.closePrice),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${symbol.toUpperCase()} Close Prices`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USDT)",
        },
      },
    },
  };

  return (
    <div>
      {storedData.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>No data available for {symbol}</p>
      )}
    </div>
  );
};

export default MarketChart;
