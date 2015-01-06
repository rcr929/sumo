var answersDiv = $('#answers');
var answers = 1;

$('#addAnswer').click(function(e) {
	e.preventDefault();
	console.log("adding");
	answers++;
	answersDiv.append('<input type="text" class="form-control answer" placeholder="Answer' + answers + '" name="answer' + answers + '">');
	$('.answer:last').focus();
});