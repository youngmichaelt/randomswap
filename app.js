var express = require('express');
var app = express();
var cors = require('cors')
var stringify = require('qs-stringify');
var path = require('path');
const https = require('https');
var dotenv = require('dotenv');
dotenv.config();
var fs = require('fs');
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

// mongoose.connect('mongodb://localhost:27017/swapdb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@localhost:27017/swapdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())

https.createServer({
        cert: fs.readFileSync('./randomswap_xyz.crt'),
        key: fs.readFileSync('./priv-key.txt'),
        ca: fs.readFileSync('./randomswap_xyz.ca-bundle')
    }, app)
    .listen(443);

app.use(function(req, res, next) {

    if (req.secure) {
        // request was via https, so do no special handling

        next();
    } else {
        // request was via http, so redirect to https
        console.log("redirect");
        res.redirect('https://' + req.headers.host + req.url);
    }
});


console.log('Server started...');

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




//
// var server = app.listen(8081, function() {
//     var host = server.address().address
//     var port = server.address().port
//     console.log('started')

// })