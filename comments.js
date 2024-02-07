/// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.get('/comments', function(req, res){
    fs.readFile(commentsPath, function(err, data){
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments', function(req, res){
    fs.readFile(commentsPath, function(err, data){
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(commentsPath, JSON.stringify(comments, null, 4), function(err){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(comments));
        });
    });
});

app.listen(3000);
console.log('Server is running on port 3000');
