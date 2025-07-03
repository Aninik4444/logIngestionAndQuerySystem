const API_BASE = 'http://localhost:4000';

export const fetchLogs = async (filters) => {
  const query = new URLSearchParams();

  for (const key in filters) {
    if (Array.isArray(filters[key])) {
      filters[key].forEach(val => query.append(key, val));
    } else if (filters[key]) {
      query.append(key, filters[key]);
    }
  }

  const res = await fetch(`${API_BASE}/logs?${query.toString()}`);
  return res.json();
};