const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/logs', require('./routes/logRoute'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});