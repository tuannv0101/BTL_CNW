const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const connection = require('./db')
const router = require('./routes/index.js');

app.use(cors());
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => console.log('Server listening on port ' + PORT));