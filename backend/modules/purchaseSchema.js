const mongoose = require('mongoose');
let AppSchema = mongoose.Schema

let purchaseSchema = new AppSchema ({
    date: String,
    products: [{productId: String, amount: Number}],
    totalPrice: Number,
}, {versionKey: false})

module.exports = mongoose.model('purchases', purchaseSchema)