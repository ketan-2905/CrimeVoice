import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import CrimeGraphMultiYear from '../components/CrimeGraphMultiYear';

export default function Heatmap() {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    fetch('/public/data/03_District_wise_crimes_committed_against_children_2001_2012.csv')
      .then(response => response.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true });
        const rows = parsed.data.filter(row =>
          row["Year"] && row["Total"] && !isNaN(parseInt(row["Total"]))
        );

        const yearMap = {};
        rows.forEach(row => {
          const year = row["Year"].trim();
          const total = parseInt(row["Total"]) || 0;
          if (!yearMap[year]) yearMap[year] = 0;
          yearMap[year] += total;
        });

        const years = Object.keys(yearMap).sort();
        const crimes = years.map(y => yearMap[y]);

        setGraphData({
          years,
          crimes
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Crime Heatmap & Statistics</h1>
      <div className="border border-gray-600 p-8 rounded-xl h-[450px] bg-gray-800 shadow-xl">
        {graphData ? (
          <CrimeGraphMultiYear data={graphData} district="All Districts" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-xl text-gray-400">Loading chart...</div>
          </div>
        )}
      </div>
      <p className="text-center mt-6 text-gray-400 hover:text-gray-300 transition-colors">
        If nothing appears, check browser console (F12) for errors
      </p>
    </div>
  );
}
