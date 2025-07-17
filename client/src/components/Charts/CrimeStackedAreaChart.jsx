import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B66FF', '#FFD166', '#06D6A0', '#118AB2'];

export default function CrimeStackedAreaChart({ data, title, keys, nameKey = 'year' }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys.map((key, index) => (
            <Area 
              key={key}
              type="monotone" 
              dataKey={key} 
              stackId="1"
              stroke={COLORS[index % COLORS.length]} 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}