import React from 'react';

export default function FilterPanel({ 
  states, 
  districts, 
  years, 
  crimeTypes,
  selectedFilters,
  onFilterChange 
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State/UT</label>
          <select
            className="w-full border rounded-md p-2"
            value={selectedFilters.state}
            onChange={(e) => onFilterChange('state', e.target.value)}
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
          <select
            className="w-full border rounded-md p-2"
            value={selectedFilters.district}
            onChange={(e) => onFilterChange('district', e.target.value)}
          >
            <option value="">All Districts</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            className="w-full border rounded-md p-2"
            value={selectedFilters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Crime Type</label>
          <select
            className="w-full border rounded-md p-2"
            value={selectedFilters.crimeType}
            onChange={(e) => onFilterChange('crimeType', e.target.value)}
          >
            {Object.entries(crimeTypes).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}