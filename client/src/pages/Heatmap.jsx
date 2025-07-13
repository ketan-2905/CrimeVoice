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

        // Group totals by year
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
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#1f2937', color: 'white' }}>
      <h1 style={{ textAlign: 'center' }}>Crime Heatmap & Statistics</h1>
      <div style={{ border: '1px solid #4b5563', padding: '20px', borderRadius: '8px', height: '450px' }}>
        {graphData ? (
          <CrimeGraphMultiYear data={graphData} district="All Districts" />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        If nothing appears, check browser console (F12) for errors
      </p>
    </div>
  );
}
