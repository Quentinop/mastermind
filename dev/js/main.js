// combination making vars
var colors      = ['red', 'green', 'blue', 'orange', 'yellow', 'violet', 'pink', 'cyan'],
	combination = [],
	random_color;

// gamer var
var color_picker    = document.querySelectorAll('.color'),
	cases           = document.querySelectorAll('.case'),
	validation_btn  = document.querySelector('.validation'),
	starting_cases = 0;

function choose_combination()
{
	for(var i = starting_cases; i < starting_cases + 4; i++)
	{
		cases[i].addEventListener('click', function()
		{
			console.log(selected_color);
			this.style.backgroundColor = selected_color;
		});
	}
}

for(var i = 0; i < color_picker.length; i++)
{
	color_picker[i].addEventListener('click', function()
	{
		selected_color = this.classList[1];
	});
}

function random_combination()
{
	for(var i = 0; i < 4; i++)
	{

		random_color = colors[Math.round(Math.random()*7)];

		for(var j = 0; j <= 4; j++)
		{
			if(random_color == combination[j])
			{
				random_color = colors[Math.round(Math.random()*7)];
			}
		}
		combination.push(random_color);
	}
	console.log(combination);
}

validation_btn.addEventListener('click', function()
{
	console.log('test');
	starting_cases += 4;
	choose_combination();

});

random_combination();
choose_combination();