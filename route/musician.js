/**
 * Created by Admin on 2017-03-16.
 */
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var client = mysql.createConnection({
    'host' : 'localhost',
    'user' : 'root',
    'password' : 'admin',
    'database' : 'musicians'
});

// /musician/
router.get('/', function(request, response) {
    fs.readFile('view/musician/list.ejs', 'utf-8', function(err, data) {
        var query = "select * from musician";

        client.query(query, function(err, results) {
            response.type('text/html');
            response.send(ejs.render(data, {'musicians' : results}));
        })
    });

});
// /musician/add
router.get('/add', function(request,response){
    fs.readFile('view/musician/add.ejs','utf-8', function(error, data) {
    response.type('text/html');
    response.send(ejs.render(data));
});
});
// /musician/add
router.post('/add', function(request,response) {
    var body = request.body;
    console.log(body);
    var query = "insert into musician (name, company) value( ? , ? )";
    client.query(query, [body.name, body.company], function() {
        response.redirect('/musician');
    });
});

// /musician/delete/3
router.get('/delete/:musicianId', function(request, response) {
    var musicianId = request.params.musicianId;
    var query = "delete from musician where id =?";
    client.query(query,[musicianId], function() {
        response.redirect('/musician');
    });
});

// /musician/edit/3
router.get('/edit/:musicianId', function(request,response){});
// /musician/edit/3
router.post('/edit/:musicianId', function(request,response){});

exports.router = router;
