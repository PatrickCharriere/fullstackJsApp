
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
	posted: {type: Number,default: Date.now},
}, {collection: 'post'});
var PostModel = mongoose.model("PostModel", PostSchema);

// set our port
var port = process.env.PORT || 3000;
//Set up our front end directory
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/blogpost/:id', getPostById);
app.get('/api/blogpost', getAllPosts);
app.post('/api/blogpost', createPost);
app.put('/api/blogpost/:id', updatePost);
app.delete('/api/blogpost/:id', deletePost);

function getAllPosts(req, res) {
	PostModel
	.find()
	.then(function(posts){
		res.json(posts);
	}, function(err){
		res.sendStatus(400);

	})
}
function getPostById(req, res) {
	var postId = req.params.id;
	PostModel
	.find({_id: postId})
	.then(function(post){
		res.json(post[0]);
	}, function(err){
		res.sendStatus(400);

	})
}
function createPost(req, res) {
	var post = req.body
	post.posted = Date.now()
	PostModel
	.create(post)
	.then(
		function(postObj){
			res.sendStatus(200)
		},
		function(error){
			res.sendStatus(400)
		}
	);
}
function updatePost(req, res) {
	var postId = req.params.id
	var post = req.body
	PostModel 
	.update ({_id: postId}, {
		title: post.title,
		body: post.body
	})
	.then(
		function(postObj){
			res.sendStatus(200)
		},
		function(error){
			res.sendStatus(400)
		}
	);
}
function deletePost(req, res) {
	var postId=req.params.id;
	PostModel
	.remove({_id:postId})
	.then(
		function(status){
			res.sendStatus(200)
		},
		function(){
			res.sendStatus(400)
		}
	)
}

app.listen(port, function() {
	console.log('listening on '+port)	
})












