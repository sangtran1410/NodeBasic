var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var url = require('url');
var database = require( './db.js' );

//use for request.body
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
console.log('server started !')

//get
app.get('/api', function(request, response) {
	if (request.query) {
		console.log('req.query', request.query)
	}

    response.send(database);
});

//post
app.post('/api', function(request, response) {
	if (request && request.body) {
		database.push(request.body);
	}

	response.send(database);
});

//put
app.put('/api', function(request, response) {
	//check request params
    if (request.body && request.body.id && request.body.name) {
    	//change db with params
    	for (var i=0, dbLeng = database.length; i<dbLeng; i++) {
    		if (database[i] && database[i].id == request.body.id) {
    			database[i].name = request.body.name;
    		}
    	}
    }

    response.send(database);
});

//delete
app.delete('/api', function(request, response) {
	//check params
    if (request.body && request.body.id) {
    	//delete db with params
    	for (var i=0, dbLeng = database.length; i<dbLeng; i++) {
    		if (database[i] && database[i].id == request.body.id) {
    			console.log('name was deleted ')
    			delete database[i];
    		}
    	}
    }

    response.send(database);
});


// 	methods will be called when enter url
app.get('/home', function(req, res) {
    console.log('in')
    res.sendfile('./views/home.html');
});
 
app.get('/about', function(req, res) {
	console.log('req.query', req.query)
    res.sendfile('./views/about.html');
});
 
app.get('/article', function(req, res) {
    res.sendfile('./views/article.html');
});

app.get('/contact', function(req, res) {
    res.sendfile('./views/contact.html');
});

app.listen(8800);