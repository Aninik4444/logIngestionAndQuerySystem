const LogRouter = require('express').Router();
const {
    addLog,
    queryLogs
} = require('../controllers/logController');

LogRouter.get('/', queryLogs);
LogRouter.post('/', addLog);

module.exports = LogRouter;
