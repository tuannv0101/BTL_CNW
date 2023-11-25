'use strict'

const mongoose = require('mongoose')
const config = require('../configs')

class Database {
    constructor() {
        this.connect()
    }

    connect(type = "mongodb") {
        if (1 === 1) {
            mongoose.set("debug", true)
            mongoose.set("debug", { color: true })
        }

        mongoose.connect(config.db.url)
            .then(_ => console.log("Connected MongoDB Success!"))
            .catch(err => console.log("Connect fail!" + err.message))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
