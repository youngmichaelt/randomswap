var express = require('express');
var app = express();
var cors = require('cors')
var stringify = require('qs-stringify');
var path = require('path');

var qs = require('qs');
// var mongo = require('mongodb');
require('./model');
var mongoose = require('mongoose');

var bodyParser = require('body-parser')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//const swap = require('./swap.js');'

var txn = mongoose.model('txn');

mongoose.connect('mongodb://localhost:27017/swapdb', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors())


app.use(express.static('public'));

app.get('/', function(req, res) {

    var query = txn.find({}, null, { limit: 10, sort: { _id: -1 } })
    query.exec(function(err, txns) {

        res.render('index.ejs', { txns: txns });
    });



})
app.get('/about', function(req, res) {

    res.render('about.ejs');


})



// app.get('/txn', function(req, res) {
//     let newtxn = new txn({
//         address: "test",
//         token1: "test",
//         token2: "test",
//         amount: "test"
//     })
//     newtxn.save();


// })

app.post('/txn', function(req, res) {

    console.log(req.body);
    console.log(req.body.address);
    let newtxn = new txn({
        address: req.body.address,
        token1: req.body.token1,
        token2: req.body.token2,
        amount: req.body.amount,
        success: req.body.success
    })
    newtxn.save();
    res.send({ status: 'SUCCESS' });

})

// app.get('/lasttxn', function(req, res) {
//     var query = txn.find({}, null, { limit: 10, sort: { 'epoch': -1 } });
//     query.exec(function(err, docs) {
//         console.log(docs);
//     });
// })





var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    //    console.log("Example app listening at http://%s:%s", host, port)
    //    const params = {
    //     buyToken: 'DAI',
    //     sellToken: 'ETH',
    //     sellAmount: '1000000000000000000', // Always denominated in wei
    // }
    // console.log(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
})