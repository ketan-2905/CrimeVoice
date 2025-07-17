import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import FilterPanel from '../components/FilterPanel';
import SummaryCards from '../components/SummaryCards';
import CrimeBarChart from '../components/Charts/CrimeBarChart';
import CrimeLineChart from '../components/Charts/CrimeLineChart';
import CrimePieChart from '../components/Charts/CrimePieChart';
import CrimeStackedAreaChart from '../components/Charts/CrimeStackedAreaChart';
import TableView from '../components/TableView';
import { processData, filterData, aggregateData, crimeTypes } from '../utils/dataHelpers';

export default function Dashboard() {
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState({ states: [], districts: [], years: [], data: [] });
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    year: '',
    crimeType: 'Total'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load CSV data
  useEffect(() => {
    fetch('/public/data/03_District_wise_crimes_committed_against_children_2001_2012.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const validData = results.data.filter(row => 
              row['STATE/UT'] && row.DISTRICT && row.Year && !isNaN(parseInt(row.Total || 0))
            );
            setRawData(validData);
            setProcessedData(processData(validData));
            setLoading(false);
          },
          error: (error) => {
            setError('Error parsing CSV: ' + error.message);
            setLoading(false);
          }
        });
      })
      .catch(err => {
        setError('Error fetching data: ' + err.message);
        setLoading(false);
      });
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (rawData.length > 0) {
      setFilteredData(filterData(rawData, filters));
    }
  }, [rawData, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Prepare data for charts
  const crimesByYear = aggregateData(filteredData, 'Year', filters.crimeType);
  const crimesByState = aggregateData(filteredData, 'STATE/UT', filters.crimeType);
  const crimesByDistrict = aggregateData(filteredData, 'DISTRICT', filters.crimeType);
  
  // Prepare data for stacked area chart
  const prepareStackedData = () => {
    const years = [...new Set(filteredData.map(item => item.Year))].sort();
    const selectedCrimeTypes = Object.keys(crimeTypes).filter(type => type !== 'Total').slice(0, 5);
    
    return years.map(year => {
      const yearData = { year };
      selectedCrimeTypes.forEach(crimeType => {
        const total = filteredData
          .filter(item => item.Year === year)
          .reduce((sum, item) => sum + (parseInt(item[crimeType]) || 0), 0);
        yearData[crimeType] = total;
      });
      return yearData;
    });
  };
  
  const stackedData = prepareStackedData();
  const stackedKeys = Object.keys(crimeTypes).filter(type => type !== 'Total').slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-600">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Crime Statistics Dashboard</h1>
      
      <FilterPanel
        states={processedData.states}
        districts={processedData.districts}
        years={processedData.years}
        crimeTypes={crimeTypes}
        selectedFilters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <div className="mt-8">
        <SummaryCards data={filteredData} filters={filters} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <CrimeBarChart 
          data={crimesByDistrict} 
          title={`${filters.crimeType} Crimes by District`} 
        />
        
        <CrimeLineChart 
          data={crimesByYear} 
          title={`${filters.crimeType} Crimes Trend Over Years`} 
        />
        
        <CrimePieChart 
          data={crimesByState} 
          title={`${filters.crimeType} Crimes Distribution by State`} 
        />
        
        <CrimeStackedAreaChart 
          data={stackedData} 
          keys={stackedKeys}
          title="Top 5 Crime Types Over Time" 
        />
      </div>
    </div>
  );
}