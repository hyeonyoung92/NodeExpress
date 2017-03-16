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


// /3
router.get('/:musicianId', function(request, response) {
    fs.readFile('view/music/list.ejs', 'utf-8', function(err, data) {
        var musicianId = request.params.musicianId;
        var query = "select * from music where musician_id=?";
        client.query(query,[musicianId], function(err, results) {
            response.type('text/html');
            response.send(ejs.render(data, {'musicianId':musicianId, 'music' : results}));
        })
    });
});

// /3/add
router.get('/:musicianId/add', function(request,response){
    var musicianId = request.params.musicianId;
    fs.readFile('view/music/add.ejs','utf-8', function(error, data) {
        response.type('text/html');
        response.send(ejs.render(data, {'musicianId':musicianId}));
    });

});
// /3/add
router.post('/:musicianId/add', function(request,response){
    var musicianId = request.params.musicianId;
    var body = request.body;

    var uploadFile = request.files.albumPost;
    console.log(uploadFile);
    console.log(body);
    var query = "insert into music(name, musician_id, like_cnt, album_post, album_name) value(?,?,0,?,?)";
    client.query(query,[body.name, musicianId,
    body.albumPost, body.albumName], function() {
        response.redirect('/music/'+musicianId);
    });
});
// /3/delete/1
router.get('/:musicianId/delete/:musicId', function(request, response) {});
// /3/edit/1
router.get('/:musicianId/edit/:musicId', function(request,response){});
// /3/edit/1
router.post('/:musicianId/edit/:musicId', function(request,response){});

exports.router = router;
