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

// Init route
app.use('/', require('./routes'))

// Handle error
app.use((req, res, next) => {
    const error = new Error("Not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    return res.status(status).json({
        status: 'error',
        code: status,
        message: error.message || "Internal Server Error"
    })
})

app.listen(PORT, () => console.log('Server listening on port ' + PORT));
