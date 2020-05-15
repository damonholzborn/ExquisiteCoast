var headerArea;
var menuButton;
var firstRun = true;

var hasVisited = localStorage.hasVisited;
if (hasVisited === undefined) {
	localStorage.setItem('hasVisited', JSON.stringify(true));
}
else {
	firstRun = false;
}

var arrow1;
var arrow2;
var patchNameField;
var authorField;
var patchNotesField;
var shareButton;
var clockSpeedField;
var clockSpeedTypeField;
var midiBLFOSpeedField;
var midiBLFOSpeedTypeField;
var knobFields = {};
var jackFields = {};
var plusButtons = {};
var workingPatch = {};

window.onload = function() {

	// ********* Header Setup *********

	headerArea = document.getElementById('header');
	menuButton = document.getElementById('menu_button');
	menuButton.addEventListener('touch', openMenu);
	menuButton.addEventListener('click', openMenu);
	function openMenu(event) {
		event.preventDefault()
		if (!menuButton.classList.contains('open')) {
			menuButton.classList.add('open');
			headerArea.style.height = (document.getElementById('welcome_message').clientHeight + 130) + 'px';
		}
		else {
			menuButton.classList.remove('open');
			headerArea.style.height = 'var(--headerheight)';
		}
	}

	// ********* Get Elements *********

	arrow1 = document.getElementById('arrow1');
	arrow2 = document.getElementById('arrow2');

	patchNameField = document.getElementById('patch_name');
	authorField = document.getElementById('author');
	patchNotesField = document.getElementById('patch_notes');
	this.shareButton = document.getElementById('share_button');

	clockSpeedField = document.getElementById('clock_speed');
	clockSpeedTypeField = document.getElementById('clock_speed_type');
	midiBLFOSpeedField = document.getElementById('midi_b_speed');
	midiBLFOSpeedTypeField = document.getElementById('midi_b_speed_type');

	var allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
		var element = allSelects[i];
		if (element.classList.contains('knobs')) {
			knobFields[element.id] = document.getElementById(element.id);
		}
		else if (element.classList.contains('jacks')) {
			jackFields[element.id] = document.getElementById(element.id);
		}
	}

	var allJacksPlusButtons = document.getElementsByClassName('plus');
	for (var i = 0; i < allJacksPlusButtons.length; i++) {
		var element = allJacksPlusButtons[i];
		plusButtons[element.id] = document.getElementById(element.id);
	}

	// ********* First Run or Load Patch *********

	var savedWorkingPatchName;
	var sharedPatchCode = window.location.search.replace('?patch=', '');

	if (firstRun && !sharedPatchCode) {
		setTimeout(function() {
			menuButton.click();
		}, 1200);
		makeNewPatch('Untitled 1');
	}
	else {

		if (sharedPatchCode !== '') {
			var sharedPatchUncompressed = LZString.decompressFromEncodedURIComponent(sharedPatchCode);
			var sharedPatchObject = JSON.parse(sharedPatchUncompressed);

			savedWorkingPatchName = sharedPatchObject.patchName;
			var cancelLoad = false;
			while (Object.keys(localStorage).indexOf(savedWorkingPatchName) !== -1 && !cancelLoad) {
				var newPatchName = prompt('You already have a patch named ' + savedWorkingPatchName + '. Enter a new name for the shared patch.', savedWorkingPatchName);
				if (newPatchName === null) {
					cancelLoad = true;
				}
				else if (newPatchName !== '') {
					savedWorkingPatchName = newPatchName;
				}
			}

			if (!cancelLoad) {
				sharedPatchObject.patchName = savedWorkingPatchName;
				localStorage.setItem('workingPatchName', savedWorkingPatchName);
				localStorage.setItem(savedWorkingPatchName, JSON.stringify(sharedPatchObject));
				history.pushState(sharedPatchCode, '', '/');
			}
			else {
				savedWorkingPatchName = localStorage['workingPatchName'];
				history.pushState(sharedPatchCode, '', '/');
			}

		}
		else {
			savedWorkingPatchName = localStorage['workingPatchName'];
		}

		if (savedWorkingPatchName) {
			workingPatch = JSON.parse(localStorage[savedWorkingPatchName]);

			var allLocalStorage = Object.keys(localStorage);
			allLocalStorage.sort();
			for (var i = 0; i < allLocalStorage.length; i++) {
				var name = allLocalStorage[i];
				if (name !== 'hasVisited' && name !== 'workingAuthor' && name !== 'workingPatchName') {
					addPatchNameToSelect(name, false);
				}
			}

			loadSavedPatch();
		}
		else {
			makeNewPatch('Untitled 1');
		}
	}

	// ********* Event Listenters *********

	patchNameField.addEventListener('change', function() {
		var value = patchNameField.value;

		if (value === 'New Patch') {
			var newPatchName = prompt('Enter a name for the new patch.');
			if (newPatchName === null || newPatchName === '') {
				patchNameField.value = workingPatch.patchName;
			}
			else {
				makeNewPatch(newPatchName);
			}
		}
		else if (value === 'Save As...') {
			var newPatchName = prompt('Enter a new name for the patch copy.', workingPatch.patchName);
			if (newPatchName === null || newPatchName === '') {
				patchNameField.value = workingPatch.patchName;
			}
			else {
				makeNewPatch(newPatchName, true);
			}
		}
		else if (value === 'Rename') {
			var newPatchName = prompt('Enter a new name for your patch.', workingPatch.patchName);
			if (newPatchName === null || newPatchName === '') {
				patchNameField.value = workingPatch.patchName;
			}
			else {
				localStorage.removeItem(workingPatch.patchName);
				workingPatch.patchName = newPatchName;
				localStorage.setItem('workingPatchName', newPatchName);
				savePatch();
				location.reload();
			}
		}
		else if (value === 'Delete') {
			var confirmation = confirm('Press OK to delete the currently select patch. THIS CANNOT BE UNDONE!');
			if (confirmation == true) {
				localStorage.removeItem(workingPatch.patchName);
				var allLocalStorage = Object.keys(localStorage);
				for (var i = 0; i < allLocalStorage.length; i++) {
					var name = allLocalStorage[i];
					if (name !== 'hasVisited' && name !== 'workingAuthor' && name !== 'workingPatchName') {
						localStorage.setItem('workingPatchName', name);
						break;
					}
				}
				location.reload();
			}
			else {
				patchNameField.value = workingPatch.patchName;
			}
		}
		else if (value === '---------') {

		}
		else {
			localStorage.setItem('workingPatchName', value);
			location.reload();
		}
	});

	authorField.addEventListener('keyup', function() {
		workingPatch.author = author.value;
		localStorage.setItem('workingAuthor', author.value);
		savePatch();
	});

	patchNotesField.addEventListener('keyup', function() {
		workingPatch.patch_notes = patchNotesField.value;
		savePatch();
	});

	shareButton.addEventListener('touch', function() { sharePatch() });
	shareButton.addEventListener('click', function() { sharePatch() });
	function sharePatch() {
		var workingPatchCompressed = LZString.compressToEncodedURIComponent(JSON.stringify(workingPatch));
		console.log(LZString.decompressFromEncodedURIComponent(workingPatchCompressed));
		var copyPatchURL = prompt('Copy the link below to share.', 'http://exquisitecoast.rustle.works/?patch=' + workingPatchCompressed);
	}

	clockSpeedField.addEventListener('keyup', function() { saveClock(clockSpeedField, true) });
	clockSpeedTypeField.addEventListener('change', function() { saveClock(clockSpeedTypeField) });;
	midiBLFOSpeedField.addEventListener('keyup', function() { saveClock(midiBLFOSpeedField, true) });;
	midiBLFOSpeedTypeField.addEventListener('change', function() { saveClock(midiBLFOSpeedTypeField) });;

	for (const key in knobFields) {
		const field = knobFields[key];
		field.addEventListener('change', function() { saveKnob(field) });
	}

	for (const key in jackFields) {
		const field = jackFields[key];
		field.addEventListener('change', function() { saveJack(field) });
	}

	for (const key in plusButtons) {
		const field = plusButtons[key];
		field.addEventListener('touch', function() { newJackConnection(key) });
		field.addEventListener('click', function() { newJackConnection(key) });
	}

	rotatePeriod();
}

// ***************************   Functions   ***************************


// ********* Saving Fields to workingPatch *********

function saveClock(field, changeactive) {
	workingPatch[field.id] = field.value;
	if (changeactive) {
		changeActive(field);
	}
	savePatch();
}

function saveKnob(field) {
	if (!workingPatch.knobs) {
		workingPatch.knobs = {};
	}
	workingPatch.knobs[field.id] = field.value;

	changeActive(field);
	savePatch();
}

function saveJack(field) {
	if (!workingPatch.jacks) {
		workingPatch.jacks = {};
	}

	var jackName = field.id.replace(/_[0-9]/, '');
	var connectionNumber = field.id.replace(/.*_/, '');

	if (workingPatch.jacks[jackName]) {
		workingPatch.jacks[jackName][connectionNumber] = field.value;
	}
	else {
		workingPatch.jacks[jackName] = [field.value]
	}

	if (parseInt(connectionNumber) === 0) {
		changeActive(field);
	}

	savePatch();
}

// ********* Save & Load Data *********

function savePatch() {
	localStorage.setItem(workingPatch.patchName, JSON.stringify(workingPatch));
}

function loadSavedPatch() {
	patchNameField.value = workingPatch.patchName;
	if (workingPatch.author) {
		authorField.value = workingPatch.author;
	}
	if (workingPatch.patch_notes) {
		patchNotesField.value = workingPatch.patch_notes;
	}

	if (workingPatch.clock_speed) {
		clockSpeedField.value = workingPatch.clock_speed;
		changeActive(clockSpeedField);
	}
	clockSpeedTypeField.value = workingPatch.clock_speed_type;
	if (workingPatch.midi_b_speed) {
		midiBLFOSpeedField.value = workingPatch.midi_b_speed;
		changeActive(midiBLFOSpeedField);
	}
	midiBLFOSpeedTypeField.value = workingPatch.midi_b_speed_type;

	for (const key in workingPatch.knobs) {
		knobFields[key].value = workingPatch.knobs[key];
		changeActive(knobFields[key]);
	}

	for (const key in workingPatch.jacks) {
		var connections = workingPatch.jacks[key];
		for (var i = 0; i < connections.length; i++) {
			var jackSelect = jackFields[key + '_' + i];
			if (!jackSelect) {
				newJackConnection(key + '_plus');
				jackSelect = document.getElementById(key + '_' + i)
			}
			jackSelect.value = connections[i];
			if (i === 0) {
				changeActive(jackSelect);
			}
		}
	}
}

function makeNewPatch(name, shouldcopy) {
	if (!shouldcopy) {
		workingPatch = {}
	}
	workingPatch.patchName = name;

	var savedAuthor = localStorage.getItem('workingAuthor');
	if (savedAuthor) {
		workingPatch.author = savedAuthor;
		if (name === 'Untitled 1') {
			authorField.value = savedAuthor
		}
	}

	workingPatch.clock_speed_type = 'bpm';
	workingPatch.midi_b_speed_type = 'bpm';
	workingPatch.knobs = {'slope_cycle_illuminated_button': 'off'};
	workingPatch.jacks = {};

	localStorage.setItem('workingPatchName', name);
	localStorage.setItem(workingPatch.patchName, JSON.stringify(workingPatch));

	addPatchNameToSelect('Untitled 1', true);

	if (name !== 'Untitled 1') {
		location.reload();
	}
}

// ********* Interface Manipulation *********

function changeActive(field) {
	var grandparentDiv = field.parentNode.parentNode;
	if (field.value === '' || field.value === 'off'){
		grandparentDiv.classList.remove('active');
	}
	else {
		grandparentDiv.classList.add('active');
	}
}

function newJackConnection(id) {
	var jackName = id.replace('_plus', '')

	var grandparentDiv = document.getElementById(id).parentNode;
	var numberOfConnections = parseInt(grandparentDiv.dataset.connections);

	grandparentDiv.dataset.connections = numberOfConnections + 1;

	var jackContainerID = jackName + '_container' + numberOfConnections;
	var jackSelectID = jackName +'_' + numberOfConnections;

	var div1 = document.createElement('div');
	var div2 = document.createElement('div');
	div2.innerHTML = '<div></div><div id="' + jackContainerID + '"><select id="' + jackSelectID + '" class="jacks"><option value="na"></option><option value="TEMPO Input">TEMPO Input</option><option value="Voltage MATH: Channel 1 Input">Voltage MATH: Channel 1 Input</option><option value="Voltage MATH: Channel 2 Input">Voltage MATH: Channel 2 Input</option><option value="Oscillator: 1/V OCTave Input">Oscillator: 1/V OCTave Input</option><option value="Oscillator: Linear FM Input">Oscillator: Linear FM Input</option><option value="Overtone: CV Input">Overtone: CV Input</option><option value="Multiply: CV Input">Multiply: CV Input</option><option value="Slope: Rise/Fall Time CV Input">Slope: Rise/Fall Time CV Input</option><option value="Slope: Trigger Input">Slope: Trigger Input</option><option value="Contour: Decay Time CV Input">Contour: Decay Time CV Input</option><option value="Contour: Gate Input">Contour: Gate Input</option><option value="Balance: Channel External Input">Balance: Channel External Input</option><option value="Balance: CV Input">Balance: CV Input</option><option value="Dynamics CV Input">Dynamics CV Input</option></select></div><div></div>';
	var div3 = document.createElement('div');


	while (div1.firstChild) {
		grandparentDiv.appendChild(div1.firstChild);
	}
	while (div2.firstChild) {
		grandparentDiv.appendChild(div2.firstChild);
	}
	while (div3.firstChild) {
		grandparentDiv.appendChild(div3.firstChild);
	}

	const field = document.getElementById(jackSelectID);
	field.addEventListener('change', function() { saveJack(field, 'jacks') });

}


function addPatchNameToSelect(name, selected) {
	var option = document.createElement('option');
	option.textContent = name;
	option.value = name;
	if (selected) {
		option.selected = true;
	}
	patchNameField.add(option);
}

function rotateArrows() {
	arrow1.style.transform = 'rotate(' + ((Math.random() * 100) - 50) + 'deg)';
	arrow2.style.transform = 'rotate(' + ((Math.random() * 100) + 300) + 'deg)';
}

function rotatePeriod() {
	setTimeout(function() {
		rotateArrows();
		rotatePeriod();
	}, (Math.random() * 10000) + 15000);
}