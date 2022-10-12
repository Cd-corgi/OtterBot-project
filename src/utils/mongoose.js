const mongoose = require('mongoose')
const { MONGO_URI } = require('../config/config.json')
module.exports = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("[MONGOOSE] Connected")
    } catch(err) {
        console.log(err)
    }
}