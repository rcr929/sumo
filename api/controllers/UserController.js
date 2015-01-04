/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'new': function (req, res){
		res.locals.flash = _.clone(req.session.flash);
		res.view();
		req.session.flash = {};
	},

	create: function (req, res, next){
		var userObj = {
	        email: req.param('email'),
	        password: req.param('password'),
	        confirmation: req.param('confirmation')
    	};

    	if (userObj.email === "admin@sumo.com") {
    		userObj.admin = true;
    		req.session.User.admin = true;
    	}

		User.create(userObj, function(err, user){
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				return res.redirect('/user/new');
			}

			req.session.User = user;
			req.session.authenticated = true;
			req.session.flash = {};
			res.redirect('/');

			user.online = true;
 		});

	}
};

