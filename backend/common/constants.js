const REQUIRED_FIELDS = ['level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit', 'metadata'];
const VALID_LEVELS = ['error', 'warn', 'info', 'debug'];
module.exports = {
  REQUIRED_FIELDS,
  VALID_LEVELS
};