
const express	= require('express'),
bodyParser 		= require('body-parser'),
mongoose		= require('mongoose'),
morgan			= require('morgan'),
passport		= require('passport'),
dbConfig		= require('./config/database'), 		// get db config file
User			= require('../public/models/user'), 	// get the mongoose model
port			= process.env.PORT || 3000,
jwt				= require('jwt-simple');
var app 		= express();

//app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//mongoose.connect(dbConfig.local_url);
app.use(morgan('dev'));
app.use(passport.initialize());

require('./config/passport')(passport);
var apiRoutes = express.Router();
apiRoutes.post('/signup', function(req, res) {
	if (!req.body.name || !req.body.password) {
		res.json({success: false, msg: 'Please pass name and password.'});
	} else {
		var newUser = new User({
			name: req.body.name,
			password: req.body.password
		});
		// save the user
		newUser.save(function(err) {
			if (err) {
				return res.json({success: false, msg: 'Username already exists.'});
			}
			res.json({success: true, msg: 'Successful created new user.'});
		});
	}
});

apiRoutes.post('/login', function(req, res) {
	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;
 
		if (!user) {
			res.send({success: false, msg: 'Authentication failed. User not found.'});
		} else {
			// check if password matches
			user.comparePassword(req.body.password, function (err, isMatch) {
				if (isMatch && !err) {
					// if user is found and password is right create a token
					var token = jwt.encode(user, dbConfig.secret);
					// return the information including token as JSON
					res.json({success: true, token: 'JWT ' + token});
				} else {
					res.send({success: false, msg: 'Authentication failed. Wrong password.'});
				}
			});
		}
	});
});

apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
	var token = getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, dbConfig.secret);
		User.findOne({
			name: decoded.name
		}, function(err, user) {
			if (err) throw err;

			if (!user) {
				return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
			} else {
				res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
			}
		});
	} else {
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});
 
getToken = function (headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

app.get('/', function(req, res) {
	res.sendFile();
});
app.use('/api', apiRoutes);

/************** BLOG CONTROLLER *******************/
var PostSchema = mongoose.Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	tag: { type: String, enum: ['ListAllTagAccteptedHere','POLITICS','ECONOMY','ETC']},
	posted: {type: Number,default: Date.now},
}, {collection: 'post'});
var PostModel = mongoose.model("PostModel", PostSchema);

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
/************** BLOG CONTROLLER *******************/


mongoose.connect(dbConfig.remote_url, function(error){
	if(error) console.log(error);
	console.log("Connection successful on DB");
	app.listen(port, function() {
		console.log('listening on '+port)	
	})
});













