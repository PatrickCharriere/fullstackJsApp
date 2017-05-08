
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://kitepat:kitepat@ds129651.mlab.com:29651/kitepat', (err, database) => {
	if (err) return console.log(err)
	db=database
	app.listen(3000, function() {
		console.log('listening on 3000')	
	})
})

app.get('/getMongoData', (req, res, next) => {
	console.log('SERVER REQUESTED')
	var cursor = db.collection('quotes').find().toArray(function(err, results) {
		console.log(results)
		var DataFromMongo = results;
		// send HTML file populated with quotes here
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