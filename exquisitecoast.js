var headerArea;
var menuButton;

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

/*

//

'Rack: Oscillator',
'Rack: LFO',
'Rack: Filter',
'Rack: Keyboard CV',
'Rack: Attenuator: Output 1',
'Rack: Attenuator: Output 2',
'Rack: Attenuator: Output 3'



//
'Rack: Oscillator: Linear FM Input',
'Rack: Oscillator: Exponential FM Input',

'Rack: LFO: FM Input',

'Rack: Filter: FM Input',

'Rack: Attenuator Input 1',
'Rack: Attenuator Output 2',
'Rack: Attenuator Output 3'

'Rack: Audio Out',
*/

var knobValues = ['', 'min', 'max', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', 'on', 'off', 'odd', '¡¡', 'even', '!!'];
var knobLabels = ['slope_cycle_illuminated_button', 'voltage_math_channel_attenuverter', 'oscillator_pitch_panel_control', 'oscillator_linear_fm_input_attenuator', 'overtone_panel_control', 'overtone_cv_input_attenuator', 'multiply_panel_control', 'multiply_cv_input_attenuverter', 'slope_rise_panel_control', 'slope_fall_panel_control', 'slope_variresponse', 'countour_onset_panel_control', 'contour_sustain_panel_control', 'contour_decay_panel_control', 'contour_variresponse', 'balance_attenuator', 'dynamic_attenuator'];

var jackDestinations = ['', 'TEMPO Input', 'Voltage MATH: Channel 1 Input', 'Voltage MATH: Channel 2 Input', 'Oscillator: 1/V OCTave Input', 'Oscillator: Linear FM Input', 'Overtone: CV Input', 'Multiply: CV Input', 'Slope: Rise/Fall Time CV Input', 'Slope: Trigger Input', 'Contour: Decay Time CV Input', 'Contour: Gate Input', 'Balance: Channel External Input', 'Balance: CV Input', 'Dynamics CV Input'];
var jackLabels = ['midi_b_cv', 'midi_b_gate', 'clock_clock', 'clock_stepped_random', 'voltage_math_channel_one', 'voltage_math_channel_two', 'oscillator_triangle_wave', 'oscillator_square_wave', 'slope_eoc_gate', 'slope_cv', 'contour_eon', 'contour_cv', 'dynamics_dynamics'];
var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var droneDestinations = ['Rack: Oscillator: Exponential FM Input', 'Rack: Oscillator: Linear FM Input', 'Rack: Filter: Audio Input', 'Rack: Filter: FM Input', 'Rack: LFO: FM Input', 'Rack: Envelope Generator: Gate Input', 'Rack: Envelope Generator: Trigger Input', 'Rack: VCA: CV Input', 'Rack: Attenuator Input 1', 'Rack: Attenuator Input 2', 'Rack: Attenuator Input 3']

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

	// ********* Insert Output Jack Pulldown Menus *********

	var jackSelects = document.getElementsByClassName("jacks");

	for (var i = 0; i < jackSelects.length; i++) {
		var jackSelect = jackSelects[i];

		if (jackSelect.tagName === 'SELECT') {
			insertJackOptions(jackSelect);
		}
	}

	// ********* Get Elements *********

	arrow1 = document.getElementById('arrow1');
	arrow2 = document.getElementById('arrow2');

	patchNameField = document.getElementById('patch_name');
	authorField = document.getElementById('author');
	patchNotesField = document.getElementById('patch_notes');
	shareButton = document.getElementById('get_share_link');

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
	var sharedPatchUncompressed = LZString.decompressFromEncodedURIComponent(sharedPatchCode);
	var sharedPatchUncompressedObject;
	try {
		sharedPatchUncompressedObject = JSON.parse(sharedPatchUncompressed);
	} catch (error) {
		alert('The patch appears to be invalid. Please check the URL and try again');
	}

	if (sharedPatchUncompressedObject) {
		savedWorkingPatchName = loadSharedPatch(sharedPatchCode, sharedPatchUncompressedObject);
	}

	if (!savedWorkingPatchName)  {
		savedWorkingPatchName = localStorage['workingPatchName'];
	}

	if (savedWorkingPatchName) {
		workingPatch = JSON.parse(localStorage[savedWorkingPatchName]);

		var allLocalStorage = Object.keys(localStorage);
		allLocalStorage.sort();
		for (var i = 0; i < allLocalStorage.length; i++) {
			var name = allLocalStorage[i];
			if (name !== 'workingAuthor' && name !== 'workingPatchName') {
				addPatchNameToSelect(name, false);
			}
		}

		loadSavedPatch();
	}
	else {
		makeNewPatch('Untitled 1');
		setTimeout(function() {
			menuButton.click();
		}, 1100);
	}

	// ********* Event Listenters *********

	patchNameField.addEventListener('change', function() {
		var value = patchNameField.value;

		if (value === 'New Patch') {
			var newPatchName = '';
			var foundDuplicate = false;
			var message = 'Enter a name for the new patch';

			while (newPatchName === '' || foundDuplicate) {
				newPatchName = prompt(message);
				if (newPatchName === '') {
					message = 'Patch name cannot be blank. Enter a name for the new patch or press Cancel to abort.';
				}
				else {
					foundDuplicate = Object.keys(localStorage).indexOf(newPatchName) !== -1;
					message = 'There is already a patch named ' + newPatchName + '. Enter a new name for the new patch or press Cancel to abort.';
				}
			}
			if (newPatchName === null) {
				patchNameField.value = workingPatch.patchName;
			}
			else {
				makeNewPatch(newPatchName);
			}
		}
		else if (value === 'Save As...') {
			var newPatchName = '';
			var defaultName = workingPatch.patchName + ' copy';
			var foundDuplicate = false;
			var message = 'Enter a name for the patch copy';

			while (newPatchName === '' || foundDuplicate) {
				newPatchName = prompt(message, defaultName);
				if (newPatchName === '') {
					message = 'Patch name cannot be blank. Enter a name for the patch copy or press Cancel to abort.';
				}
				else {
					foundDuplicate = Object.keys(localStorage).indexOf(newPatchName) !== -1;
					message = 'There is already a patch named ' + newPatchName + '. Enter a new name for the patch copy or press Cancel to abort.';
					defaultName = newPatchName;
				}
			}
			if (newPatchName === null) {
				patchNameField.value = workingPatch.patchName;
			}
			else {
				makeNewPatch(newPatchName, true);
			}
		}
		else if (value === 'Rename') {
			var newPatchName = '';
			var defaultName = workingPatch.patchName;
			var foundDuplicate = false;
			var message = 'Enter a new name for the patch.';

			while (newPatchName === '' || foundDuplicate) {
				newPatchName = prompt(message, defaultName);
				if (newPatchName === '') {
					message = 'Patch name cannot be blank. Enter a new name for the patch or press Cancel to abort.';
				}
				else {
					foundDuplicate = Object.keys(localStorage).indexOf(newPatchName) !== -1;
					message = 'There is already a patch named ' + newPatchName + '. Enter a new name for the patch or press Cancel to abort.';
					defaultName = newPatchName;
				}
			}
			if (newPatchName === null) {
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
			var confirmation = confirm('Press OK to delete ' + workingPatch.patchName + '. THIS CANNOT BE UNDONE!');
			if (confirmation == true) {
				localStorage.removeItem(workingPatch.patchName);
				var allLocalStorage = Object.keys(localStorage);
				var foundAPatch = false;
				for (var i = 0; i < allLocalStorage.length; i++) {
					var name = allLocalStorage[i];
					if (name !== 'workingAuthor' && name !== 'workingPatchName') {
						localStorage.setItem('workingPatchName', name);
						foundAPatch = true;
						break;
					}
				}
				if (!foundAPatch) {
					makeNewPatch('Untitled 1');
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
		if (field.value !== '') {
			workingPatch.jacks[jackName][connectionNumber] = field.value;
		}
		else {
			workingPatch.jacks[jackName].splice(connectionNumber, 1);
		}
	}
	else {
		workingPatch.jacks[jackName] = [field.value]
	}

	if (parseInt(connectionNumber) === 0) {
		if ((field.value === '' && !workingPatch.jacks[jackName].length) || field.value !== '') {
			changeActive(field);
		}
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

	workingPatch.knobs = {'slope_cycle_illuminated_button': 'off'};
	workingPatch.jacks = {};

	localStorage.setItem('workingPatchName', name);
	localStorage.setItem(workingPatch.patchName, JSON.stringify(workingPatch));

	addPatchNameToSelect('Untitled 1', true);

	if (name !== 'Untitled 1') {
		location.reload();
	}
}

// ********* Patch Sharing *********

function sharePatch() {
	var minifiedObject = {
		'a': workingPatch.patchName,
	};
	if (workingPatch.author) {
		minifiedObject.b = workingPatch.author;
	}
	if (workingPatch.patch_notes) {
		minifiedObject.c = workingPatch.patch_notes;
	}
	if (workingPatch.clock_speed) {
		minifiedObject.d = workingPatch.clock_speed;
	}
	if (workingPatch.clock_speed_type) {
		minifiedObject.e = workingPatch.clock_speed_type;
	}
	if (workingPatch.midi_b_speed) {
		minifiedObject.f = workingPatch.midi_b_speed;
	}
	if (workingPatch.midi_b_speed_type) {
		minifiedObject.g = workingPatch.midi_b_speed_type;
	}

	minifiedObject.h = {};
	var knobs = workingPatch.knobs;
	for (var key in knobs) {
		minifiedObject.h[knobLabels.indexOf(key)] = knobValues.indexOf(knobs[key]);
	}

	minifiedObject.i = {};
	var jacks = workingPatch.jacks;
	for (var key in jacks) {
		var connections = jacks[key];
		var minifiedConnections = [];
		for (var i = 0; i < connections.length; i++) {
			minifiedConnections.push(jackDestinations.indexOf(connections[i]))
		}
		minifiedObject.i[jackLabels.indexOf(key)] = minifiedConnections;
	}

	var minifiedPatchCompressed = LZString.compressToEncodedURIComponent(JSON.stringify(minifiedObject));
	var copyPatchURL = prompt('Your patch is encoded in the URL below. To share your patch, copy the link (make sure to get the whole thing). You can then paste the URL in an email to send to a friend, share at the Exquisite Coast thread on llllllll.co, or post on social media.', window.location.href + '?patch=' + minifiedPatchCompressed);
}

function loadSharedPatch(sharedpatchcode, sharedpatchobject) {
	var unMinifiedObject;

	if (sharedpatchobject.patchName) {
		unMinifiedObject = sharedpatchobject;
	}
	else {
		unMinifiedObject = {
			"patchName": sharedpatchobject.a,
		}
		if (sharedpatchobject.b) {
			unMinifiedObject.author = sharedpatchobject.b;
		}
		if (sharedpatchobject.c) {
			unMinifiedObject.patch_notes = sharedpatchobject.c;
		}
		if (sharedpatchobject.d) {
			unMinifiedObject.clock_speed = sharedpatchobject.d;
		}
		if (sharedpatchobject.e) {
			unMinifiedObject.clock_speed_type = sharedpatchobject.e;
		}
		if (sharedpatchobject.f) {
			unMinifiedObject.midi_b_speed = sharedpatchobject.f;
		}
		if (sharedpatchobject.g) {
			unMinifiedObject.midi_b_speed_type = sharedpatchobject.g;
		}

		unMinifiedObject.knobs = {};
		var knobs = sharedpatchobject.h;
		for (var key in knobs) {
			unMinifiedObject.knobs[knobLabels[key]] = knobValues[knobs[key]];
		}

		unMinifiedObject.jacks = {};
		var jacks = sharedpatchobject.i;
		for (var key in jacks) {
			var connections = jacks[key];
			var unMinifiedConnections = [];
			for (var i = 0; i < connections.length; i++) {
				unMinifiedConnections.push(jackDestinations[connections[i]])
			}
			unMinifiedObject.jacks[jackLabels[key]] = unMinifiedConnections;
		}
	}

	var savedWorkingPatchName = unMinifiedObject.patchName;
	var cancelLoad = false;
	while (Object.keys(localStorage).indexOf(savedWorkingPatchName) !== -1 && !cancelLoad) {
		var newPatchName = prompt('You already have a patch named ' + savedWorkingPatchName + '. Please enter a new name for the shared patch.', savedWorkingPatchName);
		if (newPatchName === null) {
			cancelLoad = true;
		}
		else if (newPatchName !== '') {
			savedWorkingPatchName = newPatchName;
		}
	}

	if (!cancelLoad) {
		unMinifiedObject.patchName = savedWorkingPatchName;
		localStorage.setItem('workingPatchName', savedWorkingPatchName);
		localStorage.setItem(savedWorkingPatchName, JSON.stringify(unMinifiedObject));
	}
	else {
		savedWorkingPatchName = undefined;
	}

	history.pushState(sharedpatchcode, '', window.location.pathname);
	return savedWorkingPatchName
}

// ********* Interface Manipulation *********

function insertJackOptions(jackselect) {
	for (var j = 0; j < jackDestinations.length; j++) {
		var jackOption = document.createElement('option');
		jackOption.value = jackDestinations[j];
		jackOption.text = jackDestinations[j];
		jackselect.appendChild(jackOption);
	}

	if (window.location.href.indexOf('/drone.html') !== -1) {
		for (var j = 0; j < droneDestinations.length; j++) {
			var jackOption = document.createElement('option');
			jackOption.value = droneDestinations[j];
			jackOption.text = droneDestinations[j];
			jackselect.appendChild(jackOption);
		}
	}
}

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
	var jackName = id.replace('_plus', '');

	if (!document.getElementById(id)) {
		window.location.replace(window.location.href + 'drone.html')
	}
	else if (jackName) {
		var grandparentDiv = document.getElementById(id).parentNode;
		var numberOfConnections = parseInt(grandparentDiv.dataset.connections);

		grandparentDiv.dataset.connections = numberOfConnections + 1;

		var jackContainerID = jackName + '_container' + numberOfConnections;
		var jackSelectID = jackName +'_' + numberOfConnections;

		var div1 = document.createElement('div');
		var div2 = document.createElement('div');
		div2.innerHTML = '<div></div><div></div><div id="' + jackContainerID + '"><select id="' + jackSelectID + '" class="jacks"></select></div><div></div>';
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
		insertJackOptions(field);
		field.addEventListener('change', function() { saveJack(field, 'jacks') });
	}

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