require('dotenv').config()

const dev = {
    app: {
        port: process.env.PORT || 8080,
    },
    db: {
        url: process.env.MONGODB_URL || "mongodb://0.0.0.0:27017/"
    }
}

const pro = {
    app: {
        port: process.env.PORT || 8080,
    },
    db: {
        url: process.env.MONGODB_URL || "mongodb://0.0.0.0:27017/"
    }
}


const config = { dev, pro }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
