const mongoose = require('mongoose');
let AppSchema = mongoose.Schema

let productSchema = new AppSchema ({
    title: String,
    price: Number,
    description: String,
    image: String,
    purchases: Number,
    uniquePurchases: Number
}, {versionKey: false})

module.exports = mongoose.model('products', productSchema)