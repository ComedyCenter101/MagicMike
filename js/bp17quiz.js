// A personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt. 
// If a personality trait is considered more introverted, it will have a negative weight.
// If a personlity trait is considered more extroverted, it will have a positive weight.

var prompts = [
{
	prompt: "You're more of a realist than an optimist or a pessimist.",
	weight: 1,
	class: 'group0'
},
{
	prompt: "You enjoy your alone time. Human interaction tends to be tiring.",
	weight: 1,
	class: 'group1'
},
{
	prompt: "You like gifts, and you really like receiving them.",
	weight: -1,
	class: 'group2'
},
{
	prompt: "People say that you can be stoic. You have a lot of emotions, but you don't usually show them.",
	weight: 1,
	class: 'group3'
},
{
	prompt: "You like games and hands-on activites.",
	weight: -1,
	class: 'group4'
},
{
	prompt: "At a party, you could be seen bouncing around group to group, interacting with as many people as you can.",
	weight: -1,
	class: 'group5'
},
{
	prompt: "You don't really care about other people's opinion. You're sure of yourself and your abilities.",
	weight: 1,
	class: 'group6'
},
{
	prompt: "You enjoy having a personal connection with your employees and coworkers. The office should feel like a family.",
	weight: -1,
	class: 'group7'
},
{
	prompt: "You geniunely enjoy going to work. It's your life, but like, in a fun way.",
	weight: -1,
	class: 'group8'
},
{
	prompt: "You love kids. They're adorable and just bundles of joy and innocence.",
	weight: -1,
	class: 'group9'
},
{
	prompt: "You prefer to work by yourself than with other people.",
	weight: 1,
	class: 'group10'
},
{
	prompt: "You're a closed book. The less people know about your life, the better.",
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
		document.getElementById('results').innerHTML = "<h3>You are Ron Swanson!</h3><br>\
		<h5>\"Give a man a fish and you feed him for a day. Don't teach a man how to fish and you feed yourself. He's a grown man, fishing's not that hard.\"</h5> \
		<br>\ Deadpan and the manliest man there is, Ron Swanson leads without trying to. Like Ron, you can be a little terrifying, but you command the respect and admiration of your peers easily and understandably. Stern but strong, you have so much wisdom and give great advice. You may seem closed off, but you have a soft spot for your friends, even if you don't show it. \
		";
	} else if(total > 0) {
		document.getElementById('results').innerHTML = "<h3>You are Raymond Holt!</h3><br>\
		<h5>\"When people say, 'Good morning,' they mean, 'Hello.' When people say, 'How are you?' they mean, 'Hello.' When people say, 'What's up?' they mean, 'I am a person not worth talking to.'\"</h5> \
		<br>\ Captain Holt may have started the show as an unfeeling robot, but he quickly earned his title of \"Captain Dad.\" Like Holt, you may seem stoic and unfeeling, but you secretly care a lot, even if you don't show affection as obviously as everyone else. You're a strong leader with sound morals and beliefs, and you're determined to make this world a better place. You may be wise and responsible, but you also have the biggest and warmest heart and would do anything for your loved ones. \
		";
	} else if(total < -30) {
		document.getElementById('results').innerHTML = "<h3>You are Michael Scott!</h3><br>\
		<h5>\"Would I rather be feared or loved? Easy – both. I want people to be afraid of how much they love me.\"</h5> \
		<br>\ While he may be the \"World's Best Boss,\" Michael doesn't seem to take his leadership position seriously. And like Michael, you too want everyone to like you. You're naturally friendly and a social butterfly, and with too much love to give, you treat everyone around you like family. It certainly is an unconventional method of leading, but it works. Once you prove that you'd do anything for your friends, they too would give you the world. \
		";
	} else if(total < 0) {
		document.getElementById('results').innerHTML = "<h3>You are Leslie Knope!</h3><br>\
		<h5>\"Winning is every girl's dream. But it's my destiny and my dream.\"</h5> \
		<br>\ An inspiration to girls everywhere, Leslie Knope is the type of politician and leader the world needs. As Leslie, you have the biggest heart, and you genuinely want to change the world for the better. You're a selfless person who values your morals more than your personal achievements, and you won't hesitate to stand up for what's right. Your motivation and compassion promise success and fulfillment, and your natural goodness makes people want to listen to what you have to say. \
		";
	} else {
		document.getElementById('results').innerHTML = "<h3>You are Terry Jeffords!</h3><br>\
		<h5>\"I was born ready. And then I was not ready for a while. Now I'm back to being born ready.\"</h5> \
		<br>\ A natural leader, Terry is 110% the mom friend. Like Terry, you're dedicated and hardworking, willing to face any challenges in your way. You're always a very sweet and dependable person who gives great advice and warm hugs. And after seeing and helping your friends grow, you can't help but feel like a proud mama hen whose baby chicks have learned to fly! \
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