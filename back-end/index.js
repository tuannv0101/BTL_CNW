const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./configs')
const PORT = config.app.port

// Init middleware
app.use(cors());
app.use(express.json());

// Init DB
require('./db')

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
