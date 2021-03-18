// A personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt. 
// If a personality trait is considered more introverted, it will have a negative weight.
// If a personlity trait is considered more extroverted, it will have a positive weight.

var prompts = [
{
	prompt: "Sometimes I'll start a sentence, and I don't even know where it's going.",
	weight: -1,
	class: 'group0'
},
{
	prompt: "Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing.",
	weight: 1,
	class: 'group1'
},
{
	prompt: "I like to be liked. I enjoy being liked. I have to be liked.",
	weight: -1,
	class: 'group2'
},
{
	prompt: 'I value loyalty, and I will go wherever they value loyalty the most.',
	weight: 1,
	class: 'group3'
},
{
	prompt: 'I think that Wikipedia is the best thing ever',
	weight: -1,
	class: 'group4'
},
{
	prompt: 'I am fast, somewhere between a snake and a mongoose… and a panther.',
	weight: 1,
	class: 'group5'
},
{
	prompt: 'I’m wise and I have worms',
	weight: -1,
	class: 'group6'
},
{
	prompt: 'Through concentration, I can raise and lower my cholesterol at will.',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'I have declared bankrupcy',
	weight: -1,
	class: 'group8'
},
{
	prompt: 'I think that it’s better to be hurt by someone you know, accidentally, than by a stranger, on purpose',
	weight: 1,
	class: 'group9'
},
{
	prompt: 'I love inside jokes and hope to be a part of one someday.',
	weight: -1,
	class: 'group10'
},
{
	prompt: 'I have seventy cousins, each one better than the last',
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
	
	if(total < 0) {
		// document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
		// console.log(document.getElementById('intro-bar').style.width);
		// document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
		document.getElementById('results').innerHTML = "<h3>You are Michael Scott!</h3><br>\
		<h5>\"I am Beyoncé, always.\"</h5> \
		<br>\One of the main reasons why the show is so successful and memorable, Steve Carell definitely nailed his part of the World's Best Boss! Someone who is incredibly lovable—even if you might want to punch him in the face a couple of times, Michael really puts the <i>super</i> back in <i>superintendent</i>!\
		<br><br>\ As Michael, you enjoy being the center of attention, thrive under it even, and might get a little petty if the world isn't revolving around you. However, while you might tend to be a little dramatic at times, you have the best intentions and the biggest heart. You know what it's like to be forgotten, and with so much love to give, you might come off as a little overbearing or over-enthusiastic. While you have lots of thoughts and opinions and aren't afraid to share them, you secretly and desperately long for approval and acceptance, sometimes searching in the world places to find them, but don't worry! There's a Holly somewhere out there perfect for your Michael, someone who accepts and loves your weird quirks and traits!\
		<br>\ Now, Michael Scott is defitely a complex character and so are you! Both a good-natured friend and an immature goofball, his personality, like an onion, has lots of layers, and having some Michael Scott in you is just one of yours. Nonetheless, definitely relish in this title because not everyone can be this iconic character. And maybe quickly thank and apologize to everyone in your life because, well, you're Michael. \
		";
	} else if(total > 0) {
		document.getElementById('results').innerHTML = "<h3>You are Dwight Schrute!</h3><br>\
		<h5>\"Nothing stresses me out. Except having to seek the approval of my inferiors.\"</h5> \
		<br>\ Dwight Kurt Schrute has such a distinct and unique personality that it's hard for him not to be memorable! No one could have played the Assistant (to the) District Manager as well as Rainn Wilson, who nailed that aloof, cutthroat weirdo so perfectly that his character has a special place in our hearts. \
		<br><br>\ As Dwight, you are <i>incredibly</i> ambitious. You know you're destined for greatness, and you're going to do everything you need to to get it.  You have a strong personality and somewhat offbeat opinions, and you aren't afraid to express them. You march to the beat of a different drum, a <i>very</i> different drum, and you know that your weirdness is just a side effect of being awesome. However, while you know your strengths, you have a strong distaste for weakness, especially those who are lazy and unmotivated. You're strong-willed and confident, which might come off as stubborn and arrogant, and would make a powerful leader. Underneath that cutthroat exterior, though, is a true softie who would do anything for the ones you love. \
		";
	} else {
		document.getElementById('results').innerHTML = "<h3>You are neither!</h3><br>\
		<h5>\"This is the smallest amount of power I’ve ever seen go to someone’s head.\"</h5> \
		Congrats! You are neither. Michael and Dwight are certainly two extremities on different sides of the personality spectrums, and while they are both <i>very</i> entertaining to watch on the screen, being worked to interact with them in real life would be... exhausting, to say the least. So yup, relish in your normalcy and the fact that you, unfortunately, are not a TV show character (or at the very least, aren't these two).\
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