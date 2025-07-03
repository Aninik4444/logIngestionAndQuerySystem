import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { fetchLogs } from './services/logServices';
import FilterBar from './components/FilterBar';
import LogTable from './components/LogTable';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { Typography } from '@mui/material';

function App() {
  const [filters, setFilters] = useState({});
  const [tempFilters, setTempFilters] = useState({});
  const [logs, setLogs] = useState([]);

  // ✅ Debounced setters
  const debouncedSetMessage = useMemo(() =>
    debounce((message) => {
      setFilters(prev => ({ ...prev, message }));
    }, 500), []
  );

  const debouncedSetResourceId = useMemo(() =>
    debounce((resourceId) => {
      setFilters(prev => ({ ...prev, resourceId }));
    }, 500), []
  );

  // Manual apply for start/end
  const handleApplyFilters = () => {
    setFilters(prev => ({
      ...prev,
      timestamp_start: tempFilters.timestamp_start,
      timestamp_end: tempFilters.timestamp_end
    }));
  };
  // Clear all filters
  const handleClearFilters = () => {
    setFilters({});
    setTempFilters({});
    debouncedSetMessage(""); // clear message filter
    debouncedSetResourceId(""); // clear resourceId filter
  };

  // Fetch logs when filters update
  useEffect(() => {
    const loadLogs = async () => {
      const data = await fetchLogs(filters);
      setLogs(data);
    };
    loadLogs();
  }, [filters]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSetMessage.cancel();
      debouncedSetResourceId.cancel();
    };
  }, []);

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ margin: 3 }}>
        Log Viewer Dashboard
      </Typography>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        onApply={handleApplyFilters}
        onMessageChange={debouncedSetMessage}
        onResourceIdChange={debouncedSetResourceId}
        onClear={handleClearFilters}
      />
      <AnalyticsDashboard logs={logs} />
      <LogTable logs={logs} />
    </div>
  );
}

export default App;