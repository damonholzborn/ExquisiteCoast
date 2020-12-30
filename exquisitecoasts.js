var patchNameField;
var authorField;
var patchNotesField;
var shareButton;

var clockSpeedField;
var clockSpeedTypeField;
var clockSpeedMultiplierField
var midiALFOSpeedField;
var midiALFOSpeedTypeField;
var midiALFOSpeedMultiplierField;
var midiBLFOSpeedField;
var midiBLFOSpeedTypeField;
var midiBLFOSpeedMultiplierField;

var instrument0CoastCheckbox;
var instrumentWerkstattCheckbox;
var instrumentPassiveRackCheckbox;
var instrumentExternalCVCheckbox;

var instrument0Coast;
var instrumentWerkstatt;
var instrumentPassiveRack;
var instrumentExternalCV;
var noInstruments;

var coastExpressLinkImage;
var coastExpressLinkAnchor;
var coastExpressShareLinkInput;

var knobFields = {};
var jackFields = {};
var midiFields = {};
var plusButtons = {};
var workingPatch = {};

var jackDestinations = {
	'0-Coast': ['TEMPO Input', 'Voltage MATH: Channel 1 Input', 'Voltage MATH: Channel 2 Input', 'Oscillator: 1/V OCTave Input', 'Oscillator: Linear FM Input', 'Overtone: CV Input', 'Multiply: CV Input', 'Slope: Rise/Fall Time CV Input', 'Slope: Trigger Input', 'Contour: Decay Time CV Input', 'Contour: Gate Input', 'Balance: Channel External Input', 'Balance: CV Input', 'Dynamics: CV Input'],
	'Werkstatt': ['VCA CV In', 'VCF CV In', 'VCO Lin FM In', 'VCO Exp FM In', 'LFO FM In', 'Gate In', 'VCF Aud In'],
	'Passive Rack': ['Attenuator 1: In', 'Attenuator 2: In', 'Attenuator 3: In', 'LPG 1: Signal In', 'LPG 1: CV In', 'LPG 2: Signal In', 'LPG 2: CV In', 'LPG 1: CV In', 'Ring Mod 1: Signal In', 'Ring Mod 1: Carrier In', 'Ring Mod 2: Signal In', 'Ring Mod 2: Carrier In'],
	'External CV': ['Sync In'],
	'System': ['Audio Out']
}

window.onload = function() {

	// ***************************   Header   ***************************

	// ********* Menu *********

	var headerArea = document.getElementById('header');
	var menuButton = document.getElementById('menu_button');
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

	// ********* Arrows *********

	var arrow1 = document.getElementById('arrow1');
	var arrow2 = document.getElementById('arrow2');

	function rotateArrows() {
		setTimeout(function() {
			arrow1.style.transform = 'rotate(' + ((Math.random() * 100) - 50) + 'deg)';
			arrow2.style.transform = 'rotate(' + ((Math.random() * 100) + 300) + 'deg)';
			rotateArrows();
		}, (Math.random() * 10000) + 15000);
	}
	rotateArrows();

	// ***************************   Patch Info   ***************************

	patchNameField = document.getElementById('patch_name');
	authorField = document.getElementById('author');
	patchNotesField = document.getElementById('patch_notes');
	shareButton = document.getElementById('get_share_link');

	instrument0CoastCheckbox = document.getElementById('instrument_checkbox_0coast');
	instrumentWerkstattCheckbox = document.getElementById('instrument_checkbox_werkstatt');
	instrumentPassiveRackCheckbox = document.getElementById('instrument_checkbox_passiverack');
	instrumentExternalCVCheckbox = document.getElementById('instrument_checkbox_externalcv');

	instrument0CoastCheckbox.addEventListener('change', function() { saveInstrument(instrument0CoastCheckbox); collapseInstruments() });
	instrumentWerkstattCheckbox.addEventListener('change', function() { saveInstrument(instrumentWerkstattCheckbox); collapseInstruments() });
	instrumentPassiveRackCheckbox.addEventListener('change', function() { saveInstrument(instrumentPassiveRackCheckbox); collapseInstruments() });
	instrumentExternalCVCheckbox.addEventListener('change', function() { saveInstrument(instrumentExternalCVCheckbox); collapseInstruments() });

	instrument0Coast = document.getElementById('instrument_0coast');
	instrumentWerkstatt = document.getElementById('instrument_werkstatt');
	instrumentPassiveRack = document.getElementById('instrument_passiverack');
	instrumentExternalCV = document.getElementById('instrument_externalcv');
	noInstruments = document.getElementById('no_instruments');

	// ********* Patch Name Menu *********

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
					if (name !== 'workingAuthor' && name !== 'workingPatchName' && name !== 'legacyPatches') {
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

	// ********* Author Info *********

	authorField.addEventListener('keyup', function() {
		workingPatch.author = author.value;
		localStorage.setItem('workingAuthor', author.value);
		savePatch();
	});

	// ********* Patch Notes *********

	patchNotesField.addEventListener('keyup', function() {
		workingPatch.patchNotes = patchNotesField.value;
		savePatch();
	});

	// ********* Sharing *********

	shareButton.addEventListener('touch', function() { sharePatch() });
	shareButton.addEventListener('click', function() { sharePatch() });

	// ***************************   Selects: Jack, Knob, MIDI Input   ***************************

	var allSelects = document.getElementsByTagName('select');
	for (var i = 0; i < allSelects.length; i++) {
		var element = allSelects[i];

		if (element.classList.contains('knobs')) {
			knobFields[element.id] = document.getElementById(element.id);
		}
		else if (element.classList.contains('jacks')) {
			jackFields[element.id] = document.getElementById(element.id);
		}
		else if (element.classList.contains('midi')) {
			midiFields[element.id] = document.getElementById(element.id);
		}
	}

	for (const key in knobFields) {
		const field = knobFields[key];
		field.addEventListener('change', function() { saveKnob(field) });
	}

	for (const key in jackFields) {
		const field = jackFields[key];
		field.addEventListener('change', function() { saveJack(field) });
	}

	for (const key in midiFields) {
		const field = midiFields[key];
		field.addEventListener('change', function() { saveMIDI(field) });
	}

	// ***************************   Plus Buttons   ***************************

	var allJacksPlusButtons = document.getElementsByClassName('plus');
	for (var i = 0; i < allJacksPlusButtons.length; i++) {
		var element = allJacksPlusButtons[i];
		plusButtons[element.id] = document.getElementById(element.id);
	}

	for (const key in plusButtons) {
		const field = plusButtons[key];
		field.addEventListener('touch', function() { newJackConnection(key) });
		field.addEventListener('click', function() { newJackConnection(key) });
	}

	// ***************************   Special Fields   ***************************

	// ********* 0-Coast clock *********

	clockSpeedField = document.getElementById('nocoast_clock_speed');
	clockSpeedTypeField = document.getElementById('nocoast_clock_speed_type');
	clockSpeedMultiplierField = document.getElementById('nocoast_clock_speed_multiplier');
	midiALFOSpeedField = document.getElementById('nocoast_midi_a_speed');
	midiALFOSpeedTypeField = document.getElementById('nocoast_midi_a_speed_type');
	midiALFOSpeedMultiplierField = document.getElementById('nocoast_midi_a_multiplier');
	midiBLFOSpeedField = document.getElementById('nocoast_midi_b_speed');
	midiBLFOSpeedTypeField = document.getElementById('nocoast_midi_b_speed_type');
	midiBLFOSpeedMultiplierField = document.getElementById('nocoast_midi_b_multiplier');

	clockSpeedField.addEventListener('keyup', function() { saveClock(clockSpeedField, true) });
	clockSpeedTypeField.addEventListener('change', function() { saveClock(clockSpeedTypeField, false, clockSpeedMultiplierField) });
	clockSpeedMultiplierField.addEventListener('change', function() { saveClock(clockSpeedMultiplierField, false) });
	midiBLFOSpeedField.addEventListener('keyup', function() { saveClock(midiBLFOSpeedField, true) });;
	midiBLFOSpeedTypeField.addEventListener('change', function() { saveClock(midiBLFOSpeedTypeField, false, midiBLFOSpeedMultiplierField) });
	midiBLFOSpeedMultiplierField.addEventListener('change', function() { saveClock(midiBLFOSpeedMultiplierField, false) });

	// ********* Coast Express *********

	var coastExpressHelp = document.getElementById('coast_express_help');
	var coastExpressHelpToggle = document.getElementById('coast_express_help_toggle');
	coastExpressHelpToggle.addEventListener('click', function() {
		if (coastExpressHelp.classList.contains('collapse')) {
			coastExpressHelp.classList.remove('collapse');
			coastExpressHelpToggle.classList.add('open');
		}
		else {
			coastExpressHelp.classList.add('collapse');
			coastExpressHelpToggle.classList.remove('open');
		}
	});

	coastExpressLinkImage = document.getElementById('coast_express_link');
	coastExpressLinkAnchor = document.getElementById('coast_express_link_anchor');
	coastExpressShareLinkInput = document.getElementById('coast_express_share_link');

	coastExpressShareLinkInput.addEventListener('focus', function() {
		var promptText = 'Paste Share Link from ce.rustle.works here.'
		var promptDefault = '';
		if (workingPatch.midiInput && workingPatch.midiInput.coastExpressLink) {
			promptText += ' Remove the link below if you wish to remove the previously shared link.';
			promptDefault = workingPatch.midiInput.coastExpressLink;
		}

		var link = prompt(promptText, promptDefault);
		coastExpressShareLinkInput.blur();

		if (link === '' && promptDefault !== '') {
			delete workingPatch.midiInput['coastExpressLink'];
			savePatch();
			insertCoastExpressShareLink();
		}
		else if (link || link === '') {
			var compressedPatch = link.split('/?patch=')[1];

			if (!compressedPatch) {
				alert('The text entered does not seem to ba a Coast Express Share Link. Please try again.')
				coastExpressShareLinkInput.focus();
			}
			else {
				if (!workingPatch.midiInput) {
					workingPatch.midiInput = {}
				}
				workingPatch.midiInput.coastExpressLink = compressedPatch;
				savePatch();
				insertCoastExpressShareLink();
			}
		}
	});

	// ***************************   First Run or Load Share or Load Patch   ***************************

	var savedWorkingPatchName;

	var sharedPatchCode = window.location.search.replace('?patch=', '');
	var sharedPatchUncompressed = LZString.decompressFromEncodedURIComponent(sharedPatchCode);
	var sharedPatchUncompressedObject;

	if (sharedPatchUncompressed) {
		stringCodes.forEach(code => {
			var regex = new RegExp(code[0], 'g');
			sharedPatchUncompressed = sharedPatchUncompressed.replace(regex, code[1]);
		});
		try {
			sharedPatchUncompressedObject = JSON.parse(sharedPatchUncompressed);
			console.log(sharedPatchUncompressedObject);
		} catch (error) {
			alert('The patch appears to be invalid. Please check the URL and try again');
		}
		if (sharedPatchUncompressedObject) {
			// savedWorkingPatchName = loadSharedPatch(sharedPatchCode, sharedPatchUncompressedObject);

			savedWorkingPatchName = sharedPatchUncompressedObject.patchName;
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
				sharedPatchUncompressedObject.patchName = savedWorkingPatchName;
				localStorage.setItem('workingPatchName', savedWorkingPatchName);
				localStorage.setItem(savedWorkingPatchName, JSON.stringify(sharedPatchUncompressedObject));
			}
			else {
				savedWorkingPatchName = undefined;
			}

			history.pushState(sharedPatchCode, '', window.location.pathname);
		}
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
			if (name !== 'workingAuthor' && name !== 'workingPatchName' && name !== 'legacyPatches') {
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

} // *** /window.onload


// ***************************   Save & Load Patches   ***************************

function savePatch() {
	localStorage.setItem(workingPatch.patchName, JSON.stringify(workingPatch));
}

function loadSavedPatch() {
	if (workingPatch.version) {
		patchNameField.value = workingPatch.patchName;
		if (workingPatch.author) {
			authorField.value = workingPatch.author;
		}
		if (workingPatch.patchNotes) {
			patchNotesField.value = workingPatch.patchNotes;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('0-Coast') !== -1) {
			instrument0CoastCheckbox.checked = true;
		}
		else {
			instrument0CoastCheckbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('Werkstatt') !== -1) {
			instrumentWerkstattCheckbox.checked = true;
		}
		else {
			instrumentWerkstattCheckbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('Passive Rack') !== -1) {
			instrumentPassiveRackCheckbox.checked = true;
		}
		else {
			instrumentPassiveRackCheckbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('External CV') !== -1) {
			instrumentExternalCVCheckbox.checked = true;
		}
		else {
			instrumentExternalCVCheckbox.checked = false;
		}


		if (workingPatch.clockSpeeds) {
			if (workingPatch.clockSpeeds.nocoast_clock_speed) {
				clockSpeedField.value = workingPatch.clockSpeeds.nocoast_clock_speed;
				changeActive(clockSpeedField);
			}
			clockSpeedTypeField.value = workingPatch.clockSpeeds.nocoast_clock_speed_type;
			toggleMultiplierFieldVisibility(clockSpeedTypeField, clockSpeedMultiplierField)
			if (workingPatch.clockSpeeds.nocoast_clock_speed_multiplier) {
				clockSpeedMultiplierField.value = workingPatch.clockSpeeds.nocoast_clock_speed_multiplier;
			}

			if (workingPatch.clockSpeeds.nocoast_midi_b_speed) {
				midiBLFOSpeedField.value = workingPatch.clockSpeeds.nocoast_midi_b_speed;
				changeActive(midiBLFOSpeedField);
			}
			midiBLFOSpeedTypeField.value = workingPatch.clockSpeeds.nocoast_midi_b_speed_type;
			toggleMultiplierFieldVisibility(midiBLFOSpeedTypeField, midiBLFOSpeedMultiplierField)
			if (workingPatch.clockSpeeds.nocoast_midi_b_multiplier) {
				midiBLFOSpeedMultiplierField.value = workingPatch.clockSpeeds.nocoast_midi_b_multiplier;
			}
		}

		for (const key in workingPatch.knobs) {
			knobFields[key].value = workingPatch.knobs[key];
			changeActive(knobFields[key]);
		}

		for (const key in workingPatch.midiInput) {
			if (key !== 'coastExpressLink') {
				midiFields[key].value = workingPatch.midiInput[key];
				changeActive(midiFields[key]);
			}
		}

		collapseInstruments();
		insertAllJackDestinations();
		selectAllJacks();
		insertCoastExpressShareLink();
	}
	else {
		convertOnePointOhPatch();
	}

}

function selectAllJacks() {
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
		workingPatch.version = "2.0"
	}
	workingPatch.patchName = name;

	var savedAuthor = localStorage.getItem('workingAuthor');
	if (savedAuthor) {
		workingPatch.author = savedAuthor;
		if (name === 'Untitled 1') {
			authorField.value = savedAuthor
		}
	}

	localStorage.setItem('workingPatchName', name);
	savePatch();

	addPatchNameToSelect('Untitled 1', true);

	if (name !== 'Untitled 1') {
		location.reload();
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

// ***************************   Saving Fields to workingPatch   ***************************

function saveInstrument(field) {
	var instrumentGuide = {
		'instrument_checkbox_0coast': '0-Coast',
		'instrument_checkbox_werkstatt': 'Werkstatt',
		'instrument_checkbox_passiverack': 'Passive Rack',
		'instrument_checkbox_externalcv': 'External CV'
	}
	if (!workingPatch.instruments) {
		workingPatch.instruments = [];
	}
	if (field.checked) {
		if (workingPatch.instruments.indexOf(field.id) === -1) {
			workingPatch.instruments.push(instrumentGuide[field.id])
		}
	}
	else {
		var index = workingPatch.instruments.indexOf(instrumentGuide[field.id]);
		if (index !== -1) {
			workingPatch.instruments.splice(index, 1);
		}
	}

	insertAllJackDestinations();
	selectAllJacks();
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

function saveClock(field, changeactive, mulitiplierfield) {
	if (!workingPatch.clockSpeeds) {
		workingPatch.clockSpeeds = {};
	}

	workingPatch.clockSpeeds[field.id] = field.value;

	if (changeactive) {
		changeActive(field);
	}
	if (mulitiplierfield) {
		toggleMultiplierFieldVisibility(field, mulitiplierfield);
	}

	savePatch();
}

function toggleMultiplierFieldVisibility(field, mulitiplierfield) {
	if (field.value === 'bpm') {
		mulitiplierfield.classList.remove('hidden')
	}
	else {
		mulitiplierfield.classList.add('hidden')
	}
}

function saveMIDI(field) {
	if (!workingPatch.midiInput) {
		workingPatch.midiInput = {};
	}
	workingPatch.midiInput[field.id] = field.value;

	changeActive(field);
	savePatch();
}

// ***************************   Interface Manipulation   ***************************

function collapseInstruments() {
	var instrumentsSelected = false;

	if (instrument0CoastCheckbox.checked) {
		instrument0Coast.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrument0Coast.classList.add('collapse');
	}

	if (instrumentWerkstattCheckbox.checked) {
		instrumentWerkstatt.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentWerkstatt.classList.add('collapse');
	}

	if (instrumentPassiveRackCheckbox.checked) {
		instrumentPassiveRack.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentPassiveRack.classList.add('collapse');
	}

	if (instrumentExternalCVCheckbox.checked) {
		instrumentExternalCV.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentExternalCV.classList.add('collapse');
	}

	if (!instrumentsSelected) {
		noInstruments.classList.remove('collapse');
	}
	else {
		noInstruments.classList.add('collapse');
	}

}

function insertAllJackDestinations() {
	var jackSelects = document.getElementsByClassName("jacks");
	for (var i = 0; i < jackSelects.length; i++) {
		var jackSelect = jackSelects[i];

		if (jackSelect.tagName === 'SELECT') {
			jackSelect.innerHTML = '';
			insertJackDestinations(jackSelect);
		}
	}
}

function insertJackDestinations(jackselect) {
	var jackOption = document.createElement('option');
	jackOption.value = '';
	jackOption.text = '';
	jackselect.appendChild(jackOption);
	var allDestinations = ['System'];
	if (workingPatch.instruments) {
		allDestinations.unshift(...workingPatch.instruments);
	}
	allDestinations.forEach(instrument => {
		var instrumentDestinations = jackDestinations[instrument];
		for (var i = 0; i < instrumentDestinations.length; i++) {
			var jackOption = document.createElement('option');
			jackOption.value = instrument + ': ' + instrumentDestinations[i];
			jackOption.text = instrument + ': ' + instrumentDestinations[i];
			jackselect.appendChild(jackOption);
		}
	});

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

	// if (!document.getElementById(id) && window.location.href.indexOf('/drone.html') === -1) {
	// 	window.location.replace(window.location.href + 'drone.html')
	// }
	if (jackName) {
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
		insertJackDestinations(field);
		field.addEventListener('change', function() { saveJack(field, 'jacks') });
	}

}

function insertCoastExpressShareLink() {
	if (workingPatch.midiInput && workingPatch.midiInput.coastExpressLink) {
		coastExpressShareLinkInput.value = workingPatch.midiInput.coastExpressLink;
		coastExpressLinkAnchor.href = 'https://ce.rustle.works/?patch=' + workingPatch.midiInput.coastExpressLink;;
		coastExpressLinkImage.classList.remove('hidden');
	}
	else {
		coastExpressShareLinkInput.value = '';
		coastExpressLinkImage.classList.add('hidden');
	}
}

function sharePatch() {
	var workingPatchString = JSON.stringify(workingPatch);
	stringCodes.forEach(code => {
		var regex = new RegExp(code[1], 'g');
		workingPatchString = workingPatchString.replace(regex, code[0]);
	});
	workingPatchString = LZString.compressToEncodedURIComponent(workingPatchString);

	var copyPatchURL = prompt('Your patch is encoded in the URL below. To share your patch, copy the link (make sure to get the whole thing). You can then paste the URL in an email to send to a friend, share at the Exquisite Coast thread on llllllll.co, or post on social media.', window.location.href + '?patch=' + workingPatchString);

}

// ***************************   Convert Legacy Patch   ***************************

function convertOnePointOhPatch() {
	if (!localStorage.getItem('legacyPatches')) {
		var allPatches = [];
		var allLocalStorage = Object.keys(localStorage);
		for (var i = 0; i < allLocalStorage.length; i++) {
			var name = allLocalStorage[i];
			if (name !== 'workingAuthor' && name !== 'workingPatchName') {
				allPatches.push(localStorage.getItem(name));
			}
		}
		localStorage.setItem('legacyPatches', allPatches);
	}

	var tempWorkingPatch = { 'version': '2.0', 'instruments': ['0-Coast'] };

	if (workingPatch.author) {
		tempWorkingPatch.author = workingPatch.author;
	}
	if (workingPatch.patchName) {
		tempWorkingPatch.patchName = workingPatch.patchName;
	}
	if (workingPatch.patch_notes) {
		tempWorkingPatch.patchNotes = workingPatch.patch_notes;
	}

	var knobs = workingPatch.knobs;
	if (knobs) {
		tempWorkingPatch.knobs = {};
		for (var key in knobs) {
			tempWorkingPatch.knobs['nocoast_' + key] = knobs[key];
		}
	}

	var jacks = workingPatch.jacks;
	if (jacks) {
		tempWorkingPatch.jacks = {};
		for (var key in jacks) {
			var indexOfDynamicsCVInput = jacks[key].indexOf('Dynamics CV Input');
			if (indexOfDynamicsCVInput !== -1) {
				jacks[key][indexOfDynamicsCVInput] = 'Dynamics: CV Input'
			}
			for (let i = 0; i < jacks[key].length; i++) {
				jacks[key][i] = '0-Coast: ' + jacks[key][i];

			}
			tempWorkingPatch.jacks['nocoast_' + key] = jacks[key];
		}
	}

	tempWorkingPatch.clockSpeeds = {}
	if (workingPatch.clock_speed) {
		tempWorkingPatch.clockSpeeds['nocoast_' + 'clock_speed'] = workingPatch.clock_speed;
	}
	if (workingPatch.clock_speed_multiplier) {
		tempWorkingPatch.clockSpeeds['nocoast_' + 'clock_speed_multiplier'] = workingPatch.clock_speed_multiplier;
	}
	if (workingPatch.clock_speed_type) {
		tempWorkingPatch.clockSpeeds['nocoast_' + 'clock_speed_type'] = workingPatch.clock_speed_type;
	}
	if (workingPatch.midi_b_speed) {
		tempWorkingPatch.clockSpeeds['nocoast_' + 'midi_b_speed'] = workingPatch.midi_b_speed;
	}
	if (workingPatch.midi_b_multiplier) {
		tempWorkingPatch.clockSpeeds['nocoast_' + 'midi_b_multiplier'] = workingPatch.midi_b_multiplier;
	}
	if (workingPatch.midi_b_speed_type) {
		tempWorkingPatch.clockSpeeds['nocoast_' + 'midi_b_speed_type'] = workingPatch.midi_b_speed_type;
	}

	if (Object.keys(tempWorkingPatch.clockSpeeds).length === 0) {
		delete tempWorkingPatch.clockSpeeds;
	}

	workingPatch = tempWorkingPatch;
	savePatch();
	location.reload();
}