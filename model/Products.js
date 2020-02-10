const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    cover: String
});

const Product = mongoose.model('Product', prodSchema);

module.exports = Product;