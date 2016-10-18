var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		var method = req.body._method
		delete req.body._method
		return method
	}
}))

router.get('/:userid/edit', function(req, res) {
	mongoose.model('Users').findById(req.id, function(err, user) {
		if (err) {
			console.log('You have a GET Error: There was a problem getting:' + err);
		} else {
			console.log('GET retrived ID:' + user._id);
		}
	})
})

router.put('/:userid/', function(req, res) {
	var username = req.body.username;
	var currentBook = req.body.currentBook;
	var bookQueue = req.body.bookQueue;
	var friendsList = req.body.friendsList;
	var favoriteBooks = req.body.favoriteBooks;

	mongoose.model('Users').findById(req.id, function(error, user) {
		user.update({
			username: username,
			currentBook: currentBook,
			bookQueue: bookQueue,
			favoriteBooks: favoriteBooks
		}, function(err, userId) {
			if (err) {
				res.send("There was a problem updating the information to the database:"
					err);
			} else {
				res.format({
					html: function() {
						res.redirect('/user/' + user._id);
					},
					json: function() {
						res.json(user)
					}
				})
			}
		})
	})
})


router.delete('/:id/edit', function(req, res) {
	mongoose.model('Users').findById(req.id, function(err, user) {
		if (err) {
			return console.error(err);
		} else {
			user.remove(function(err, user) {
				if (err) {
					return console.error(err)
				} else {
					console.log('DELETE removed ID: ' + user._id)
					res.format({
						html: function() {
							res.redirect('/users');
						},
						json: function() {
							res.json({
								message: 'deleted',
								item: user
							});
						}
					});
				}
			});
		}
	});
});


module.exports = router;