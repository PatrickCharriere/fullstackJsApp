
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


app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(dbConfig.url, (err, database) => {
	if (err) return console.log(err)
	db=database
	app.listen(port, function() {
		console.log('listening on '+port)	
	})
})

app.get('/getMongoData', (req, res, next) => {
	var cursor = db.collection('quotes').find().toArray(function(err, results) {
		var DataFromMongo = results;
		res.send(DataFromMongo);
	})
})


app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('saved to database')
		res.redirect('/')
	})
})