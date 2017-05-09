
const express = require('express');
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
//const MongoClient = require('mongodb').MongoClient
const app = express();

// Configure database
var dbConfig = require('./config/db');
mongoose.connect(dbConfig.url);
var PostSchema = mongoose.Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	tag: { type: String, enum: ['ListAllTagAccteptedHere','POLITICS','ECONOMY','ETC']},
	posted: {type: Date,default: Date.now},
}, {collection: 'post'});
var PostModel = mongoose.model("PostModel", PostSchema);

// set our port
var port = process.env.PORT || 3000;
//Set up our front end directory
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/api/blogpost', (req, res, next) => {
	PostModel
	.find()
	.then(function(posts){
		res.json(posts);
	}, function(err){
		res.sendStatus(400);

	})
})

app.post('/api/blogpost', (req, res) => {
	var post = req.body
	console.log(post)
	PostModel
	.create(post)
	.then(
		function(postObj){
			res.json(postObj)
		},
		function(error){
			res.sendStatus(400)
		}
	);
})


app.listen(port, function() {
	console.log('listening on '+port)	
})












