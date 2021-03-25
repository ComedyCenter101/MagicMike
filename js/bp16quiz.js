// A personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt. 
// If a personality trait is considered more introverted, it will have a negative weight.
// If a personlity trait is considered more extroverted, it will have a positive weight.

var prompts = [
{
	prompt: "You like order and control. You want to plan things out, and \"going with the flow\" makes you nervous.",
	weight: -1,
	class: 'group0'
},
{
	prompt: "You're more of a 'class clown' than a 'teacher's pet'.",
	weight: 1,
	class: 'group1'
},
{
	prompt: "You are extremely stubborn. Your way is the right way, and it's not your fault that other people are too stupid to see that.",
	weight: -1,
	class: 'group2'
},
{
	prompt: "You like organization. Buying stationery, especially colored ones, should not be this satisfying.",
	weight: -1,
	class: 'group3'
},
{
	prompt: "You're an optimist who likes to make others laugh.",
	weight: 1,
	class: 'group4'
},
{
	prompt: "You're easily underestimated. You may have a goofy exterior, but you're smarter than you seem.",
	weight: 1,
	class: 'group5'
},
{
	prompt: "You are incredibly ambitious. You know you're destined for greatness, and you're going to get it.",
	weight: -1,
	class: 'group6'
},
{
	prompt: "You like making immature bets and jokes. The world can be a gloomy place, and you want to fill it with humor.",
	weight: 1,
	class: 'group7'
},
{
	prompt: "You have multiple personas and aliases. Your awesomeness is too powerful to be contained under just one name.",
	weight: 1,
	class: 'group8'
},
{
	prompt: "You are very mature, sophisticated but in a casual, approachable way.",
	weight: -1,
	class: 'group9'
},
{
	prompt: "While you have been made fun of for being a \"goody-two shoes,\" you take pride in it. There's nothing wrong with playing by the rules.",
	weight: -1,
	class: 'group10'
},
{
	prompt: "You like music, always drumming up a tune. There's nothing wrong with a little musical pizzazz to spice up the day.",
	weight: 1,
	class: 'group11'
}

]

// This array stores all of the possible values and the weight associated with the value. 
// The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
var prompt_values = [
{
	value: 'Strongly Agree', 
	class: 'btn-default btn-strongly-agree',
	weight: 5
},
{
	value: 'Agree',
	class: 'btn-default btn-agree',
	weight: 3,
}, 
{
	value: 'Neutral', 
	class: 'btn-default btn-neutral',
	weight: 0
},
{
	value: 'Disagree',
	class: 'btn-default btn-disagree',
	weight: -3
},
{ 
	value: 'Strongly Disagree',
	class: 'btn-default btn-strongly-disagree',
	weight: -5
}
]

// For each prompt, create a list item to be inserted in the list group
function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}

// For each possible value, create a button for each to be inserted into each li of the quiz
// function createValueButtons() {
	
// 	for (var li_index = 0; li_index < prompts.length; li_index++) {
// 		for (var i = 0; i < prompt_values.length; i++) {
// 			var val_button = document.createElement('button');
// 			var val_text = document.createTextNode(prompt_values[i].value);

// 			val_button.setAttribute('class', 'value-btn btn ' + prompt_values[i].class);
// 			val_button.appendChild(val_text);

// 			document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
// 		}
// 	}
// }
function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();

// Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;

// Get the weight associated to group number
function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}

// When user clicks a value to agree/disagree with the prompt, display to the user what they selected
$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	// console.log(classList);
	var classArr = classList.split(" ");
	// console.log(classArr);
	var this_group = classArr[0];
	// console.log(this_group);

	// If button is already selected, de-select it when clicked and subtract any previously added values to the total
	// Otherwise, de-select any selected buttons in group and select the one just clicked
	// And subtract deselected weighted value and add the newly selected weighted value to the total
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {
		// $('[class='thisgroup).prop('checked', false);
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
		// console.log($('.'+this_group+'.active').text());
		$('.'+this_group).removeClass('active');

		// console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
		// $(this).prop('checked', true);
		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {
	// After clicking submit, add up the totals from answers
	// For each group, find the value that is active
	$('.results').removeClass('hide');
	$('.results').addClass('show');
	
	if(total > 30) {
		// document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
		// console.log(document.getElementById('intro-bar').style.width);
		// document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
		document.getElementById('results').innerHTML = "<h3>You are Andy Dwyer!</h3><br>\
		<h5>\"I have no idea what I’m doing but I know I do it really, really well.\"</h5> \
		<br>\ There's no goofball as lovable as Andy. The human equivalent of a golden retriever, Andy is naive and often clueless but has one of the biggest hearts. Like Andy, you have a natural charm and an easygoing exterior. You don't have a bad bone in your body, even if it doesn't seem like it at first, but you may need help getting off your feet. You're a big teddy bear, and while there's a 30% chance you'll die without other people's support, you give <i>a lot</i> of love and affection in return.\
		";
	} else if(total > 0) {
		document.getElementById('results').innerHTML = "<h3>You are Jake Peralta!</h3><br>\
		<h5>\"I wasn't hurt that badly. The doctor said all my bleeding was internal. That's where the blood's supposed to be.\"</h5> \
		<br>\ Jake Peralta is undoubtedly one of the best detectives; the only puzzle he hasn't solved is how to grow up. As Peralta, you have a laid-back and charming personality; however, your goofy and often childish behavior may make people underestimate your intelligence. Nonetheless, you are incredibly competent and smarter than you give yourself credit for. You may have trouble expressing your emotions and thus may deflect with humor and jokes.  However, at your core, you are inherently a good person and would go through hell to help the people you care about.  \
		";
	} else if(total < -30) {
		document.getElementById('results').innerHTML = "<h3>You are Leslie Knope!</h3><br>\
		<h5>\"What I hear when I'm being yelled at is people caring loudly at me.\"</h5> \
		<br>\ An inspiration to girls everywhere, Leslie Knope is the type of politician and person the world needs. As Leslie, you have the biggest heart and always look for the best in everyone. Determined and profoundly hard-working, you have ambitions and goals and are incredibly dedicated to achieving them. However, you are also the most selfless person and greatly value your morals over your own aspirations. You can be irrationally stubborn at times, but you are also astonishingly motivated and passionate about your cause. You <i>truly</i> want to help the world, and there's nothing more admirable than that.  \
		";
	} else if(total < 0) {
		document.getElementById('results').innerHTML = "<h3>You are Amy Santiago!</h3><br>\
		<h5>\"It's not that weird to say, 'May I have some cocaine?.'\"</h5> \
		<br>\ Like Amy, you may have been the worst fourth-grader ever and failed recess (\"TeAcHeRs nEeD a BrEaK tOo\"); however, it only shows your dedication to learning. You're innovative and creative, and while there are several roadblocks and challenges, you know you were born to lead. You deeply value rules and authority and have a deep respect for your superiors.  You're perfectionistic almost to a fault, but you're also highly competent with a kind heart and wouldn't hesitate to help those around you. \
		";
	} else {
		document.getElementById('results').innerHTML = "<h3>You are Ben Wyatt!</h3><br>\
		<h5>\"I don’t even have time to tell you how wrong you are. Actually, it’s gonna bug me if I don’t.\"</h5> \
		<br>\ The king of the nerds himself, Ben might be one of the more normal characters on <i>Parks and Rec</i>. As Ben, you have definitely made your fair share of mistakes in the past. However, you strive to grow from the experience, as humiliating as it may be, and become a better person. You may come off as introverted and stern, but once you're with the people you're comfortable with, you loosen up and allow yourself to have fun. Your passions may come off as different or weird, but you should embrace your individuality. \
		"
	}

	// Hide the quiz after they submit their results
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})