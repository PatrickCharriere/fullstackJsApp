
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

// config files
var dbConfig = require('./config/db');
// set our port
var port = process.env.PORT || 3000;
//Set up our front end directory
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/api/getPosts', (req, res, next) => {
	var cursor = db.collection('posts').find().toArray(function(err, results) {
		var DataFromMongo = results;
		res.send(DataFromMongo);
	})
})

app.post('/api/savePost', (req, res) => {
	db.collection('posts').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('Write in database')
		//res.redirect('/')
		res.json(req.body)
	})
})


MongoClient.connect(dbConfig.url, (err, database) => {
	if (err) return console.log(err)
	db=database
	app.listen(port, function() {
		console.log('listening on '+port)	
	})
})