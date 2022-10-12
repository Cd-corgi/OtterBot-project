const mongoose = require('mongoose')

let shem = new mongoose.Schema({
    author_id: String,
    item_name: String,
    item_key_name: String,
    item_price: Number,
    item_image: String
})

module.exports = mongoose.model("inventory", shem, "FNFT inv");