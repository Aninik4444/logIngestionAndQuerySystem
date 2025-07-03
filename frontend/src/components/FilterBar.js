import React from 'react';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Box,
  Stack,
  Button,
} from '@mui/material';

const levels = ['error', 'warn', 'info', 'debug'];

const FilterBar = ({ filters, setFilters, tempFilters, setTempFilters, onApply, onMessageChange,  onResourceIdChange, onClear }) => {
  const handleLiveChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleTempChange = (e) => {
    const { name, value } = e.target;
    setTempFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleMessageChange = (e) => {
    onMessageChange(e.target.value);
  };

  return (
    <Box sx={{ backgroundColor: "#1e1e1e", padding: 2, borderRadius: 1 }}>
      <Stack
        direction="row"
        spacing={1.5}
        useFlexGap
        flexWrap="wrap"
        alignItems="flex-start"
      >
        {/* Message Search (debounced) */}
        <StyledInput
          label="message"
          name="message"
          value={filters.message || ''}
          onChange={handleMessageChange}
        />

        {/* Level Multi-select (live) */}
        <StyledMultiSelect
          label="level"
          name="level"
          value={filters.level || []}
          onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
          options={levels}
        />

        {/* Resource ID (live) */}
        <StyledInput
          label="resourceId"
          name="resourceId"
          value={filters.resourceId || ''}
          onChange={(e) => onResourceIdChange(e.target.value)}
        />

        {/* Start Time (manual) */}
        <StyledInput
          label="start time"
          name="timestamp_start"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={tempFilters.timestamp_start || ""}
          onChange={handleTempChange}
        />

        {/* End Time (manual) */}
        <StyledInput
          label="end time"
          name="timestamp_end"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={tempFilters.timestamp_end || ""}
          onChange={handleTempChange}
        />

        {/* Apply Filters Button */}
        <Button
          variant="contained"
          size="small"
          sx={{ height: "40px", alignSelf: "center" }}
          onClick={onApply}
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={onClear}
          sx={{ height: "40px", alignSelf: "center" }}
        >
          Clear Filters
        </Button>
      </Stack>
    </Box>
  );
};

// 🔧 Shared styles
const commonInputStyles = {
  minWidth: 180,
  maxWidth: 220,
  backgroundColor: '#2b2b2b',
  borderRadius: '6px',
  '& .MuiOutlinedInput-root': {
    height: '40px',
    fontSize: '0.85rem',
    paddingRight: '8px',
    '& fieldset': {
      borderColor: '#444',
    },
    '&:hover fieldset': {
      borderColor: '#666',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#aaa',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
  },
  '& .MuiInputBase-input': {
    color: '#eee',
    padding: '8px 12px',
  },
};

const StyledInput = (props) => (
  <TextField
    {...props}
    variant="outlined"
    size="small"
    sx={commonInputStyles}
  />
);

const StyledMultiSelect = ({ label, name, value, onChange, options }) => (
  <FormControl size="small" sx={commonInputStyles}>
    <InputLabel>{label}</InputLabel>
    <Select
      multiple
      name={name}
      value={value}
      onChange={onChange}
      input={<OutlinedInput label={label} />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((val) => (
            <Chip
              key={val}
              label={val.toUpperCase()}
              size="small"
              sx={{ backgroundColor: '#444', color: '#fff', fontSize: '0.75rem' }}
            />
          ))}
        </Box>
      )}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default FilterBar;