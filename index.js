/**
 * Created by Admin on 2017-03-16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var app = express();
app.listen(3000, function() {
   console.log('Server running at http://localhost:3000');
});

app.use(multipart( {
   uploadDir:__dirname+ '/upload'
}));
app.use(bodyParser.urlencoded({extends:false}));
app.use('/musician', require('./route/musician').router);
app.use('/music', require('./route/music').router);

