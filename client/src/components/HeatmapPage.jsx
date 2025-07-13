// src/pages/HeatmapPage.jsx
import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Auto-registers charts

export default function HeatmapPage() {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [crimeData, setCrimeData] = useState(null);

  // Mapping category keys to CSV headers
  const categoryMap = {
    murder: 'Murder',
    rape: 'Rape',
    kidnapping: 'Kidnapping and Abduction',
    foeticide: 'Foeticide',
    suicide: 'Abetment of suicide',
    exposure: 'Exposure and abandonment',
    procuration: 'Procuration of minor girls',
    buying: 'Buying of girls for prostitution',
    selling: 'Selling of girls for prostitution',
    pcmmma: 'Prohibition of child marriage act',
    other: 'Other Crimes'
  };

  // Load unique districts
  useEffect(() => {
    fetch('/data/03_District_wise_crimes_committed_against_children_2001_2012.csv')
      .then(response => response.text())
      .then(data => {
        const parsed = Papa.parse(data, { header: true }).data;
        const validRows = parsed.filter(row => row['DISTRICT']);
        const uniqueDistricts = [...new Set(validRows.map(row => row['DISTRICT'].trim()))];
        setDistricts(uniqueDistricts.sort());
      });
  }, []);

  // Load crime data for selected district
  useEffect(() => {
    if (!selectedDistrict) return;

    fetch('/data/03_District_wise_crimes_committed_against_children_2001_2012.csv')
      .then(response => response.text())
      .then(data => {
        const parsed = Papa.parse(data, { header: true }).data;
        const districtRows = parsed.filter(row => row['DISTRICT']?.trim() === selectedDistrict);

        if (districtRows.length === 0) {
          setCrimeData(null);
          return;
        }

        // Extract unique years
        const years = [...new Set(districtRows.map(row => row['Year']))];

        // Transform category data
        const transformed = {
          years,
          ...Object.entries(categoryMap).reduce((acc, [key, colName]) => {
            acc[key] = years.map(year => {
              const yearlyData = districtRows.filter(row => row['Year'] === year);
              return yearlyData.reduce((sum, row) => sum + parseInt(row[colName] || 0), 0);
            });
            return acc;
          }, {})
        };

        // Total crimes per year
        transformed.total = transformed.years.map((_, i) =>
          Object.keys(categoryMap).reduce((sum, key) => sum + (transformed[key][i] || 0), 0)
        );

        setCrimeData(transformed);
      });
  }, [selectedDistrict]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">District Crime Visualization</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select District:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">-- Select District --</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {selectedDistrict && crimeData && crimeData.years.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Crimes Over Time</h2>
            <div style={{ height: '400px' }}>
              <Line
                data={{
                  labels: crimeData.years,
                  datasets: [{
                    label: 'Total Crimes',
                    data: crimeData.total,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  }
                }}
              />
            </div>
          </div>

          {/* Bar Chart */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Crime Type Distribution</h2>
            <div style={{ height: '400px' }}>
              <Bar
                data={{
                  labels: ['Murder', 'Rape', 'Kidnapping', 'Foeticide', 'Suicide'],
                  datasets: [{
                    label: `Crimes in ${selectedDistrict}`,
                    data: [
                      crimeData.murder.reduce((a, b) => a + b, 0),
                      crimeData.rape.reduce((a, b) => a + b, 0),
                      crimeData.kidnapping.reduce((a, b) => a + b, 0),
                      crimeData.foeticide.reduce((a, b) => a + b, 0),
                      crimeData.suicide.reduce((a, b) => a + b, 0)
                    ],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)',
                      'rgba(255, 206, 86, 0.5)',
                      'rgba(75, 192, 192, 0.5)',
                      'rgba(153, 102, 255, 0.5)'
                    ]
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  }
                }}
              />
            </div>
          </div>
        </div>
      ) : selectedDistrict && !crimeData ? (
        <div className="text-center p-4 text-yellow-600">
          No crime data available for {selectedDistrict}
        </div>
      ) : null}
    </div>
  );
}
