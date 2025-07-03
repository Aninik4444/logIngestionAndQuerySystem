const db = require('../db');
const { validateLog } = require('../common/utils');

// POST /logs - Ingest a log entry
const addLog = async (req, res) => {
  const log = req.body;
  console.log('Received log:', log);
  // Validate the log entry
   const errors = validateLog(log);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // get existing logs or initialize an empty array
    const logs = await db.getData('/logs') || [];
    logs.push(log);
    db.push('/logs', logs);
    res.status(201).json(log);
  } catch (err) {
    if (err.name === 'DataError') {
      db.push('/logs', [log]); // if /logs doesn't exist yet
      return res.status(201).json(log);
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to save log' });
  }
}
// GET /logs - Query logs

const queryLogs = async (req, res) => {
  try {
    let logs = [];
    try {
      logs = await db.getData('/logs');
    } catch {
      // If no logs exist yet
      logs = [];
    }

    const {
      level,
      message,
      resourceId,
      timestamp_start,
      timestamp_end
    } = req.query;
    // Apply filters
    const levels = Array.isArray(level) ? level : level ? [level] : null;
    logs = logs.filter(log => {
      return (!levels || levels.includes(log.level)) &&
        (!message || log.message.toLowerCase().includes(message.toLowerCase())) &&
        (!resourceId || log.resourceId === resourceId) &&
        (!timestamp_start || new Date(log.timestamp) >= new Date(timestamp_start)) &&
        (!timestamp_end || new Date(log.timestamp) <= new Date(timestamp_end));
    });

    // Sort reverse-chronologically
    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.status(200).json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve logs' });
  }
}
module.exports = {
    addLog,
    queryLogs
};
