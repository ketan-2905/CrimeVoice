import React from 'react';
import { crimeTypes } from '../utils/dataHelpers';

export default function SummaryCards({ data, filters }) {
  const totalCrimes = data.reduce((sum, item) => sum + (parseInt(item.Total) || 0), 0);
  
  const mostCommonCrime = Object.entries(crimeTypes)
    .filter(([key]) => key !== 'Total')
    .reduce((max, [type]) => {
      const total = data.reduce((sum, item) => sum + (parseInt(item[type]) || 0), 0);
      return total > max.total ? { type, total } : max;
    }, { type: '', total: 0 });

  const topDistrict = Object.entries(
    data.reduce((acc, item) => {
      if (item.DISTRICT !== 'TOTAL') {
        acc[item.DISTRICT] = (acc[item.DISTRICT] || 0) + (parseInt(item.Total) || 0);
      }
      return acc;
    }, {})
  ).sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Total Crimes</h3>
        <p className="text-3xl font-bold text-blue-600">{totalCrimes.toLocaleString()}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Most Common Crime</h3>
        <p className="text-3xl font-bold text-red-600">{mostCommonCrime.type}</p>
        <p className="text-sm text-gray-500">{mostCommonCrime.total.toLocaleString()} cases</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Top District</h3>
        <p className="text-3xl font-bold text-green-600">{topDistrict?.[0]}</p>
        <p className="text-sm text-gray-500">{topDistrict?.[1].toLocaleString()} cases</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Active Filters</h3>
        <div className="text-sm text-gray-600">
          {Object.entries(filters)
            .filter(([, value]) => value)
            .map(([key, value]) => (
              <div key={key} className="flex items-center gap-1">
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}