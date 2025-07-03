const { REQUIRED_FIELDS, VALID_LEVELS } = require('./constants')
/**
 * Checks if all required fields are present in the object.
 * @param {Object} data - The object to validate.
 * @returns {{ valid: boolean, missingFields: string[] }}
 */
function getMissingFields(data) {
  const missingFields = REQUIRED_FIELDS.filter(field => !data.hasOwnProperty(field));
  return {
    valid: missingFields.length === 0,
    missingFields
  };
}

const isISO8601 = (str) => {
  const date = new Date(str);
  return !isNaN(date.getTime()) && str === date.toISOString();
};

const validateLog = (log) => {
  const errors = [];

  if (!log || typeof log !== 'object') {
    errors.push('Log entry must be a JSON object.');
    return errors;
  }

  if (!log.level || typeof log.level !== 'string' || !VALID_LEVELS.includes(log.level)) {
    errors.push("Field 'level' is required and must be one of: error, warn, info, debug.");
  }

  if (!log.message || typeof log.message !== 'string' || log.message.trim() === '') {
    errors.push("Field 'message' is required and must be a non-empty string.");
  }

  if (!log.resourceId || typeof log.resourceId !== 'string' || log.resourceId.trim() === '') {
    errors.push("Field 'resourceId' is required and must be a non-empty string.");
  }

  if (!log.timestamp || typeof log.timestamp !== 'string' || !isISO8601(log.timestamp)) {
    errors.push("Field 'timestamp' is required and must be a valid ISO 8601 formatted string.");
  }

  if (!log.traceId || typeof log.traceId !== 'string' || log.traceId.trim() === '') {
    errors.push("Field 'traceId' is required and must be a non-empty string.");
  }

  if (!log.spanId || typeof log.spanId !== 'string' || log.spanId.trim() === '') {
    errors.push("Field 'spanId' is required and must be a non-empty string.");
  }

  if (!log.commit || typeof log.commit !== 'string' || log.commit.trim() === '') {
    errors.push("Field 'commit' is required and must be a non-empty string.");
  }

  if (
    log.metadata === undefined ||
    typeof log.metadata !== 'object' ||
    log.metadata === null ||
    Array.isArray(log.metadata)
  ) {
    errors.push("Field 'metadata' is required and must be a valid JSON object.");
  }

  return errors;
};

module.exports = { getMissingFields, validateLog };