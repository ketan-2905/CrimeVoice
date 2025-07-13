// src/components/CrimeGraphMultiYear.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// ✅ Import and register required chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function CrimeGraphMultiYear({ data, district }) {
  if (!data || !data.years || !data.crimes || data.years.length === 0 || data.crimes.length === 0) {
    return <div className="text-red-600">No chart data available</div>;
  }

  const chartData = {
    labels: data.years,
    datasets: [
      {
        label: `Total Crimes per Year in ${district}`,
        data: data.crimes,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Crimes Over the Years in ${district}`,
        font: { size: 18 },
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => value,
        color: '#000',
        font: {
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  // ✅ Optional: Force re-render with a unique key
  const chartKey = `${district}-${data.years.join(',')}-${data.crimes.join(',')}`;

  return (
    <div style={{ height: '400px' }}>
      <Bar key={chartKey} data={chartData} options={chartOptions} />
    </div>
  );
}
