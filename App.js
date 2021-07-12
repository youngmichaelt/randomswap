var express = require('express');
var app = express();
var cors = require('cors')
var stringify = require('qs-stringify')
var qs = require('qs');
var mongo = require('mongodb');
//const swap = require('./swap.js');

app.use(cors())


app.use(express.static('public'));

app.get('/', function(req, res) {
    //res.send('Hello World');
    res.sendFile('public/index.html');


    //swap;
    //console.log(swap)

})
app.get('/test', function(req, res) {
    //res.send('Hello World');
    res.sendFile('/Users/mac/Desktop/randomswap/public/test.html');
    //swap;
    //console.log(swap)

})





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