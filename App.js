var express = require('express');
var app = express();
var cors = require('cors')
//const swap = require('./swap.js');

app.use(cors())


app.use(express.static('public'));

app.get('/', function (req, res) {
   //res.send('Hello World');
   res.sendFile('public/index.html');
   //swap;
   //console.log(swap)
   
})





var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})