/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function (req, res){
		if (!(req.session.authenticated && req.session.User.admin)) {
			res.redirect('/');
			return;
		}
		res.view();
	},

	create: function (req, res){
		if (!(req.session.authenticated && req.session.User.admin)) {
			res.redirect('/');
			return;
		}
		var questionObj = {
			name: req.param("name"),
			answers: []
		};

		var count = 1;
		var answerNum = "answer" + count;
		var answer = req.param(answerNum);
		while (answer != null) {
			if (answer != "") {
				questionObj.answers.push({name: answer, count: 0});	
			}
			count++;
			answerNum = "answer" + count;
			answer = req.param(answerNum);
		}

		Question.create(questionObj, function(err, question) {
			res.redirect('/question');
		});
	},

	index: function(req, res, next) {
		if (!(req.session.authenticated && req.session.User.admin)) {
			res.redirect('/');
			return;
		}
	    // Get an array of all questions in the Question table
	    Question.find().populate('answers').exec(function (err, questions) {
	      if (err) return next(err);
	      // pass the array down to the /question/index.ejs page
	      res.view({
	        questions: questions
	      });
	    });
	},

	show: function(req, res, next) {
		if (req.session.questionsAnswered == null) {
			req.session.questionsAnswered = [];
		}

		var question;
		Question.find().populate('answers').exec(function (err, questions) {
	        if(err) return next(err, false);
	 
	        var rand = Math.floor((Math.random() * questions.length));
	        if(rand < 0) rand = 0;
	 		
	 		if(questions.length == 0){
	 			question = {
	 				name: "Sorry. There Are No Questions In The Database"
	 			};
	 		}
	 		//user has already answered every question in the database
	 		else if (questions.length <= req.session.questionsAnswered.length) {
	 			question = questions[rand];
	 		}
	 		else {
	 			//I know, not the greatest way to prevent user from seeing previous questions
	 			while(req.session.questionsAnswered.indexOf(questions[rand].id) != -1) {
	 				rand = Math.floor((Math.random() * questions.length));
	        		if(rand < 0) rand = 0;
		        }
		        question = questions[rand];  
	    	}
	    	res.view({
	    		question: question
	    	});
	    });

	    
	},

	'saveAnswer': function(req, res, next) {
		Answer.findOne(req.param('answer'), function foundAnswer(err, answer) {
	      if (err) return next(err);

	      if (!answer) return next('Answer doesn\'t exist.');

	      answer.count++;
	      Answer.update(answer.id, answer, function answerUpdated(err){
	      	if(err) res.redirect('/question/show');
	      });

	      if(req.session.authenticated) {
		      User.findOne(req.session.User.id, function foundUser(err, user) {
		      	if(user.questionsAnswered.indexOf(answer.question) == -1) {
		      		user.questionsAnswered.push(answer.question);
		      	}
		      	User.update(user.id, user, function userUpdated(err){
			      	if(err) res.redirect('/question/show');
			    });
		      });
		  }
		  if(req.session.questionsAnswered.indexOf(answer.question) == -1){
		  	req.session.questionsAnswered.push(answer.question);
		  }
	      res.redirect('/');
		});

	}
};

