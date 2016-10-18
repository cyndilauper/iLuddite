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

router.get('/:userid/edit', function(req, res){
	mongoose.model('Users').findById(req.id, function(err, user){
		if(err){
			console.log('You have a GET Error: There was a problem getting:' + err);
		} else {
			console.log('GET retrived ID:' + user._id);
		}
	}) 
})



module.exports = router;