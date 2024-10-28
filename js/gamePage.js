

/**
 * 15-puzzle.js
 */
	//Main variables are the state-whether the game is orderly or messy
	// and the puzzle-the creation of the board
	var state = 1;
	var puzzle = document.getElementById('puzzle');
	var timer1;
	var countStep=0;
	//Creating an event - saving the username throughout the game
	document.getElementById('namePlayer').innerHTML += " " + sessionStorage.getItem('name');
	// Creates solved puzzle
	onload= solve();
	
	// Activating the E-event function when a button is pressed
	puzzle.addEventListener('click', function (e) {
		if (state == 1) {
			//If the board is not arranged - running a sliding animation
			puzzle.className = 'animate';
			moveBtn(e.target);
		}
	});

	//Activating the mixing function
	document.getElementById('scramble').addEventListener('click', scramble);

	// Creates solved puzzle
	function solve() {
		//back if a solved board
		if (state == 0) {
			return;
		}
		//creating the buttons
		var n = 1;
		for (var i = 0; i <= 3; i++) {
			for (var j = 0; j <= 3; j++) {
				//reset the buttons
				var btn = document.createElement('span');
				//The location of the buttons - according to i and j
				btn.id = 'btn-' + i + '-' + j;
				btn.style.left = (j * 129 + 1 * i + 1) + 'px';
				btn.style.top = (i * 132 + 1 * j + 1) + 'px';
				//filling the buttonfs
				if (n <= 15) {
					btn.classList.add('number');
					//The distribution of the buttons - according to chess
					btn.classList.add((i % 2 == 0 && j % 2 > 0 || i % 2 > 0 && j % 2 == 0) ? 'dark' : 'light');
					btn.innerHTML = (n++);
				}
				//last button is empty
				else {
					btn.className = 'empty';
				}
				//link the button to the game board
				puzzle.appendChild(btn);
			}
		}

	}
	//function to move number
	function moveBtn(btn) {
		// checks if in selected button has number
		if (btn.clasName != 'empty') {
			//chack whether there is an empty button near the selected button
			var emptybtn = checkEmpty(btn);
			//if an empty button is found	
			if (emptybtn) {
				//variable helped to copy the dat of the button
				var tmp = { style: btn.style.cssText, id: btn.id };
				// Exchanges id and style values
				btn.style.cssText = emptybtn.style.cssText;
				btn.id = emptybtn.id;
				emptybtn.style.cssText = tmp.style;
				emptybtn.id = tmp.id;
				//count the num of steps
				countStep++;
				var steps=document.getElementById('stepId');
				steps.innerHTML=countStep;
				//if the game is over
				if (state == 1) {
					// Checks the order of numbers
					setTimeout(checkOrder, 150);
				}
			}
		}

	}
	//Function to set the ID value of the button
	function getBtn(row, col) {
		return document.getElementById('btn-' + row + '-' + col);
	}
	//function that returns the empty button
	function getEmptyId() {
		//Returning only the button whose ID=empty
		return puzzle.querySelector('.empty');
	}
	//A function to check for an empty place in the near places array
	function checkEmpty(btn) {

		// Gets all nearPlaces btns
		var nearPlaces = getNearBtn(btn);

		// Searches for empty btn
		for (var i = 0; i < nearPlaces.length; i++) {
			if (nearPlaces[i].className == 'empty') {
				//Returning the empty space if any
				return nearPlaces[i];
			}
		}
		// Empty nearPlaces btn was not found
		return false;

	}
	//function that finds the near buttons
	function getNearBtn(btn) {
		//separating the id
		var id = btn.id.split('-');
		//gets button indexes
		var row = parseInt(id[1]);
		var col = parseInt(id[2]);
		//Creating an array for the near places
		var nearPlaces = [];
		//filling the array in the possible and near places
		if (row < 3) { nearPlaces.push(getBtn(row + 1, col)); }
		if (row > 0) { nearPlaces.push(getBtn(row - 1, col)); }
		if (col < 3) { nearPlaces.push(getBtn(row, col + 1)); }
		if (col > 0) { nearPlaces.push(getBtn(row, col - 1)); }
		return nearPlaces;
	}

	//Chechs if the order of numbers is correct
	function checkOrder() {

		// Checks if the empty btn is in correct place
		if (getBtn(3, 3).className != 'empty') {
			return;
		}
		var n = 1;
		// Goes through all btns and checks numbers
		for (var i = 0; i <= 3; i++) {
			for (var j = 0; j <= 3; j++) {
				if (n <= 15 && getBtn(i, j).innerHTML != n.toString()) {
					// Order is not correct
					return;
				}
				n++;
			}
		}
		//If there was no exit - a sign that the arrangement is correct - activation of a victory message
		openModal(true);
		//Reset the timer
		clearInterval(timer1);
	}

	//function that mixing the board
	function scramble() {
		//Mixing option only once
		document.getElementById('scramble').disabled=true
		//If the board is arranged - there is no start of the game
		if (state == 0) {
			return;
		}
		//Resetting the class addresses
		puzzle.removeAttribute('class');
		state = 0;
		//Creating a previos button 
		var previousbtn;
		var i = 1;
		//Activating setInterval the function for 5 seconds
		var interval = setInterval(function () {
			//Doing the mixing 100 times
			if (i <= 100) {
				//Getting the array of nearby places - by running the 2 functions
				var nearPlaces = getNearBtn(getEmptyId());
				//As long as the previous button is full
				if (previousbtn) {
					//A loop that goes from the end of the array to its beginning
					for (var j = nearPlaces.length - 1; j >= 0; j--) {
						//Checking where the replaced place is
						if (nearPlaces[j].innerHTML == previousbtn.innerHTML) {
							//Removing the place from the array
							nearPlaces.splice(j, 1);
						}
					}
				}
				//Filling the previous button randomly in one of the adjacent places
				previousbtn = nearPlaces[rand(0, nearPlaces.length - 1)];
				//Replacing the button by activating the function
				moveBtn(previousbtn);
				//Promotion of I up to 100
				i++;
				//reset the steps
				countStep=-1;
				//After 100 times the function stops
			} else {
				clearInterval(interval);
				//Turning the state into 1
				state = 1;
			}
		}, 5);

	}

	//A function that rand the place of the exchange
	function rand(from, to) {
		return Math.floor(Math.random() * (to - from + 1)) + from;

	}

   //function for the timer
	function startTimer(duration, display) {
		//Creating variables
		var timer = duration, minutes, seconds;
		//Activating the function
		 timer1=setInterval(function () {
			//Division into minutes and seconds
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			display.textContent = minutes + ":" + seconds;
	//Checking if the timer is over
			if (--timer < 0) {
				//Activating a loss message
				openModal(false);
				//Reset the timer
				clearInterval(timer1);
			}
		}, 1000);
	}
	//Activating the timer
	function time () {
		//for 3 minutes
		var threeMinutes = 60*3;
			display = document.querySelector('#timer');
		startTimer(threeMinutes, display);
	};

	 //A function to create a win and loss message  
	function openModal(wimorloose){
		var p1,p2,src;
		//The function receives a boolean variable that is true when there is a win and false when there is a loss
		if(wimorloose){
			//Presentation of victory messages + photo
			p1="you win!    well done!    let's do it again..."  ;
            p2="your steps:"+countStep;
			src='../images/Winner.png';
			//Playing the audio file
			var audio = new Audio('../audio/little_robot_sound_factory_Jingle_Win_Synth_00.mp3');
			audio.playbackRate=1;
		audio.play();
		}
		else{
			//Presentation of lost messages + photo
			p1="you lost    not bad..   maybe next time...";
			p2="your steps:"+countStep;
			src='../images/sadFace.png';
			//Playing the audio file
			var audio = new Audio('../audio/esm_8_bit_game_over_2_arcade_80s_simple_alert_notification_game.mp3');
			audio.playbackRate=1;
		audio.play();
		}
		//receiving values from html
	var modal=	document.getElementById('modal-header')
	var modalImage=	document.getElementById('modal-imge')
	//Updating the values
	modal.childNodes[1].innerHTML=p1;
	modal.childNodes[3].innerHTML=p2;
		modalImage.childNodes[1].src=src;
		var modal =document.getElementById('myModal');
		//Displaying the message
		modal.style.display="block";
	}