var mongoose = require('mongoose');

mongoose.model('txn', new mongoose.Schema({
    address: String,
    token1: String,
    token2: String,
    amount: String,
    success: String
}))