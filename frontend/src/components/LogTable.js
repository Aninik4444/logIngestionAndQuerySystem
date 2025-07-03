import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, Box
} from '@mui/material';

const levelStyles = {
  error: { backgroundColor: '#fdecea', borderLeft: '5px solid #f44336' },
  warn: { backgroundColor: '#fff8e1', borderLeft: '5px solid #ff9800' },
  info: { backgroundColor: '#e3f2fd', borderLeft: '5px solid #2196f3' },
  debug: { backgroundColor: '#f5f5f5', borderLeft: '5px solid #9e9e9e' }
};

const LogTable = ({ logs }) => {
  return (
    <TableContainer component={Paper} sx={{ margin: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Timestamp</strong></TableCell>
            <TableCell><strong>Level</strong></TableCell>
            <TableCell><strong>Message</strong></TableCell>
            <TableCell><strong>Resource ID</strong></TableCell>
            <TableCell><strong>Trace ID</strong></TableCell>
            <TableCell><strong>Span ID</strong></TableCell>
            <TableCell><strong>Commit</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <Typography align="center" sx={{ padding: 2 }}>
                  No logs found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Box sx={{ ...levelStyles[log.level], padding: 1 }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ ...levelStyles[log.level], padding: 1 }}>
                    {log.level.toUpperCase()}
                  </Box>
                </TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.resourceId}</TableCell>
                <TableCell>{log.traceId}</TableCell>
                <TableCell>{log.spanId}</TableCell>
                <TableCell>{log.commit}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogTable;