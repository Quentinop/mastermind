// var
var random_color, // random color storage for building combination
		selected_color, // clicked color by user
		cases_index    = 0, // try index
		combination    = [], // storage for final solution
		colors         = ['red', 'green', 'blue', 'orange', 'yellow', 'violet', 'pink', 'cyan'] // possible colors
		cases          = document.querySelectorAll('.case'), // storage for cases
		color_picker   = document.querySelectorAll('.color'), // storage for colors
		validation_btn = document.querySelector('.validation'); // verify btn


// make a random combination based on color without dupes
function randomCombination()
{
	// create 4 colors
	for(var i = 0; i < 4; i++)
	{
		random_color = colors[Math.round(Math.random()*7)];
		// check them with others
		for(var j = 0; j < 4; j++)
		{
			while(random_color == combination[j] || random_color == combination[j+1] || random_color == combination[j+2] || random_color == combination[j+3])
			{
				random_color = colors[Math.round(Math.random()*7)];
			}
		}
		// push in final combination after verification
		combination.push(random_color);
	}
}

// select color function
function colorPicker()
{
	// add event listener on each color
	for(var i = 0; i < color_picker.length; i++)
	{
		color_picker[i].addEventListener('click', function()
		{
			// add selected view design
			for(var j = 0; j < color_picker.length; j++)
			{
				color_picker[j].classList.remove('selected-color');
			}

			this.classList.add('selected-color');

			// set selected color based on clicked element
			selected_color = this.classList[1];
		});
	}
}

// select combination
function selectCombination()
{
	// add event listener on each cases & check if no dupes
	for(var i = cases_index; i < cases_index + 4; i++)
	{
		cases[i].addEventListener('click', duplicateColor);
	}
}

// check duplicated color
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
		// clicked element = selected color
		e.target.style.backgroundColor = selected_color;
	}
}

// compare selected combination with random combination
function verifyCombination()
{
	validation_btn.addEventListener('click', function()
	{
		for(var i = cases_index; i < cases_index + 4; i++)
		{
			for(var j = 0; j < 4; j++)
			{
				// same color
				if(cases[i].style.backgroundColor == combination[j])
				{
					// same color and same pos
					if(i == j + cases_index)
					{
					}
				}
			}
		}
		resetEventListener();
	});
}

// remove event listener and add the fourth next
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