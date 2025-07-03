git branch -M mainimport React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";
import dayjs from "dayjs";

// 🧠 Group logs by timestamp bucket (e.g., per minute)
const groupLogsByTimeAndLevel = (logs, interval = "minute") => {
  const timeFormat =
    interval === "minute" ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD HH";
  const grouped = {};

  logs.forEach((log) => {
    const timeKey = dayjs(log.timestamp).format(timeFormat);
    if (!grouped[timeKey]) {
      grouped[timeKey] = {
        time: timeKey,
        error: 0,
        warn: 0,
        info: 0,
        debug: 0,
      };
    }
    grouped[timeKey][log.level] += 1;
  });

  return Object.values(grouped).sort(
    (a, b) => dayjs(a.time).unix() - dayjs(b.time).unix()
  );
};

// 🎨 Match table colors
const levelColors = {
  error: "#f44336",
  warn: "#ff9800",
  info: "#2196f3",
  debug: "#9e9e9e",
};

const AnalyticsDashboard = ({ logs }) => {
  const data = groupLogsByTimeAndLevel(logs);

  return (
    <Paper
      elevation={2}
      sx={{ margin: 2, padding: 2, backgroundColor: "#1e1e1e" }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
        Logs Over Time by Level
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" tick={{ fontSize: 10 }} />
          <YAxis allowDecimals={false} stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "transparent", // or '#1e1e1e' for subtle
              border: "none",
              boxShadow: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "#ccc" }}
            cursor={{ fill: "transparent" }} // prevents hover background
          />
          <Legend />
          <Bar dataKey="error" stackId="a" fill={levelColors.error} activeBar={false} />
          <Bar dataKey="warn" stackId="a" fill={levelColors.warn} activeBar={false} />
          <Bar dataKey="info" stackId="a" fill={levelColors.info} activeBar={false} />
          <Bar dataKey="debug" stackId="a" fill={levelColors.debug} activeBar={false} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default AnalyticsDashboard;
