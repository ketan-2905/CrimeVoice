export const crimeTypes = {
  Murder: 'Murder',
  Rape: 'Rape',
  'Kidnapping and Abduction': 'Kidnapping and Abduction',
  Foeticide: 'Foeticide',
  'Abetment of suicide': 'Abetment of suicide',
  'Exposure and abandonment': 'Exposure and abandonment',
  'Procuration of minor girls': 'Procuration of minor girls',
  'Buying of girls for prostitution': 'Buying of girls for prostitution',
  'Selling of girls for prostitution': 'Selling of girls for prostitution',
  'Prohibition of child marriage act': 'Prohibition of child marriage act',
  'Other Crimes': 'Other Crimes',
  'Total': 'Total'
};

export const processData = (data) => {
  const states = [...new Set(data.map(item => item['STATE/UT']))];
  const years = [...new Set(data.map(item => item.Year))].sort();
  const districts = [...new Set(data.map(item => item.DISTRICT))];

  return {
    states,
    years,
    districts,
    data
  };
};

export const filterData = (data, filters) => {
  return data.filter(item => {
    const stateMatch = !filters.state || item['STATE/UT'] === filters.state;
    const districtMatch = !filters.district || item.DISTRICT === filters.district;
    const yearMatch = !filters.year || item.Year === filters.year;
    return stateMatch && districtMatch && yearMatch;
  });
};

export const aggregateData = (data, groupBy = 'Year', crimeType = 'Total') => {
  const grouped = {};
  data.forEach(item => {
    const key = item[groupBy];
    if (!grouped[key]) {
      grouped[key] = 0;
    }
    grouped[key] += parseInt(item[crimeType]) || 0;
  });
  return grouped;
};