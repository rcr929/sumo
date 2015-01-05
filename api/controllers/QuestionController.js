/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function (req, res){
		res.view();
	},

	create: function (req, res){

		var questionObj = {
			name: req.param("name"),
			answers: []
		};

		var count = 1;
		var answerNum = "answer" + count;
		var answer = req.param(answerNum);
		while (answer != null) {
			questionObj.answers.push({name: answer, count: 0});
			count++;
			answerNum = "answer" + count;
			answer = req.param(answerNum);
		}

		Question.create(questionObj, function(err, question) {
			res.redirect('/question');
		});

		Question.count().exec(function countQuestion(error, found) {
			console.log(found);
		});
		User.count().exec(function countQuestion(error, found) {
			console.log(found);
		});
	}
};

