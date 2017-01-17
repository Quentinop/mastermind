// combination making vars
var random_color,
		selected_color,
		combination = [],
		colors      = ['red', 'green', 'blue', 'orange', 'yellow', 'violet', 'pink', 'cyan'];

// gamer var
var cases_index    = 0,
		cases          = document.querySelectorAll('.case'),
		color_picker   = document.querySelectorAll('.color'),
		validation_btn = document.querySelector('.validation');


function randomCombination()
{
	for(var i = 0; i < 4; i++)
	{
		random_color = colors[Math.round(Math.random()*7)];

		for(var j = 0; j < 4; j++)
		{
			while(random_color == combination[j] || random_color == combination[j+1] || random_color == combination[j+2] || random_color == combination[j+3])
			{
				random_color = colors[Math.round(Math.random()*7)];
			}
		}
		combination.push(random_color);
		console.log(combination);
	}
}

function colorPicker()
{
	for(var i = 0; i < color_picker.length; i++)
	{
		color_picker[i].addEventListener('click', function()
		{
			for(var j = 0; j < color_picker.length; j++)
			{
				color_picker[j].classList.remove('selected-color');
			}

			this.classList.add('selected-color');

			selected_color = this.classList[1];
		});
	}
}

function selectCombination()
{
	for(var i = cases_index; i < cases_index + 4; i++)
	{
		cases[i].addEventListener('click', duplicateColor);
	}
}

function duplicateColor(e)
{	
	if(selected_color == cases[cases_index].style.backgroundColor 
	|| selected_color == cases[cases_index+1].style.backgroundColor 
	|| selected_color == cases[cases_index+2].style.backgroundColor 
	|| selected_color == cases[cases_index+3].style.backgroundColor)
	{
		// do nothing if color is already selected
	} 
	else
	{
		e.target.style.backgroundColor = selected_color;
	}
}

function verifyCombination()
{
	validation_btn.addEventListener('click', function()
	{
		for(var i = cases_index; i < cases_index + 4; i++)
		{
			for(var j = 0; j < 4; j++)
			{
				console.log(i);
					console.log(j);
				if(cases[i].style.backgroundColor == combination[j])
				{
					console.log('couleur');
					if(i == j + cases_index)
					{
						console.log('pos');
					}
				}
			}
		}
		console.log('----------');
		resetEventListener();
	});
}

function resetEventListener()
{
	for(var i = cases_index; i < cases_index + 4; i++)
	{	
		cases[i].removeEventListener('click', duplicateColor);
	}

	cases_index += 4;

	selectCombination();
}

randomCombination();
colorPicker();
selectCombination();
verifyCombination();