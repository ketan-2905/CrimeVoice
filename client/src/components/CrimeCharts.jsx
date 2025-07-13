import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

export default function CrimeCharts({ data }) {
  if (!data || !data.years || data.years.length === 0) return null;

  // Line Chart Configuration
  const lineConfig = {
    type: 'line',
    data: {
      labels: data.years,
      datasets: [{
        label: 'Total Crimes',
        data: data.total,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  };

  // Bar Chart Configuration
  const barConfig = {
    type: 'bar',
    data: {
      labels: ['Murder', 'Rape', 'Kidnapping', 'Foeticide', 'Suicide'],
      datasets: [{
        label: 'Total Crimes',
        data: [
          data.murder.reduce((a, b) => a + b, 0),
          data.rape.reduce((a, b) => a + b, 0),
          data.kidnapping.reduce((a, b) => a + b, 0),
          data.foeticide.reduce((a, b) => a + b, 0),
          data.suicide.reduce((a, b) => a + b, 0)
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Crimes Over Time</h2>
        <Line config={lineConfig} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Crime Type Distribution</h2>
        <Bar config={barConfig} />
      </div>
    </div>
  );
}