// Create web server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var Comment = mongoose.model('Comment', {
    text: String
});

// GET /comments
app.get('/comments', function(req, res) {
    console.log('GET /comments');
    Comment.find(function(err, comments) {
        if (err) return console.error(err);
        console.log(comments);
        res.send(comments);
    });
});

// POST /comments
app.post('/comments', function(req, res) {
    console.log('POST /comments');
    console.log(req.body);

    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) return console.error(err);
        console.log(comment);
        res.status(201).send(comment);
    });
});

// GET /comments/:id
app.get('/comments/:id', function(req, res) {
    console.log('GET /comments/' + req.params.id);
    Comment.findById(req.params.id, function(err, comment) {
        if (err) return console.error(err);
        console.log(comment);
        res.send(comment);
    });
});

// PUT /comments/:id
app.put('/comments/:id', function(req, res) {
    console.log('PUT /comments/' + req.params.id);
    console.log(req.body);

    Comment.findByIdAndUpdate(req.params.id, req.body, function(err, comment) {
        if (err) return console.error(err);
        console.log(comment);
        res.send(comment);
    });
});

// DELETE /comments/:id
app.delete('/comments/:id', function(req, res) {
    console.log('DELETE /comments/' + req.params.id);

    Comment.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) return console.error(err);
        console.log(comment);
        res.send(comment);
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});