var patchNameField;
var authorField;
var patchNotesField;
var shareButton;
var pedalboardPresetField;
var pedalboardPresetSaveButton;


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
var instrumentStregaCheckbox;
var instrument0CTRLCheckbox;
var instrumentDFAMCheckbox;
var instrumentMavisCheckbox;
var instrumentMother32Checkbox;
var instrumentSubharmoniconCheckbox;
var instrumentWerkstattCheckbox;
var instrumentExpandedRackCheckbox;
var instrumentLyra4Checkbox;
var instrumentExternalCVCheckbox;

var instrument0Coast;
var instrumentStrega;
var instrument0CTRL;
var instrumentDFAM;
var instrumentMavis;
var instrumentMother32;
var instrumentSubharmonicon;
var instrumentWerkstatt;
var instrumentExpandedRack;
var instrumentLyra4;
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

var superTopSecretCode = localStorage.getItem('superTopSecretCode');

var jackDestinations = {
	'0-Coast': ['TEMPO Input', 'Voltage MATH: Channel 1 Input', 'Voltage MATH: Channel 2 Input', 'Oscillator: 1/V OCTave Input', 'Oscillator: Linear FM Input', 'Overtone: CV Input', 'Multiply: CV Input', 'Slope: Rise/Fall Time CV Input', 'Slope: Trigger Input', 'Contour: Decay Time CV Input', 'Contour: Gate Input', 'Balance: Channel External Input', 'Balance: CV Input', 'Dynamics: CV Input'],
	'Strega': ['External: Substance In', 'Activation: CV In', 'Tonic: Tonic Modulation Interference Input', 'Tones: CV In', 'Tones: 1V/ Octave', 'Time/Filter: Time Modulation Input', 'Time/Filter: Time CV In', 'Time/Filter: Time Unity CV In', 'Time/Filter: Decay CV In', 'Time/Filter: Absorb CV In', 'Time/Filter: Blend CV In', 'Time/Filter: Filter CV In', 'Agitation Generator: Begin and End In', 'Agitation Generator: Speed CV In'],
	'0-CTRL': ['Clock Input', 'Dynamic Reset Input', 'Stop Input', 'Direction Input', 'Strength CV Input', 'Time CV Input'],
	'DFAM': ['Trigger', 'VCA CV', 'Velocity', 'VCA Decay', 'Ext Audio', 'VCF Decay', 'Noise Level', 'VCO Decay', 'VCF Mod', 'VCO 1 CV', 'VCO 2 CV', '1⭢2 FM Amount', 'Tempo', 'Run/Stop', 'Adv/Clock'],
	'Mavis': ['Fold In', '1V/Oct', 'PWM', 'One (-5)', 'LFO Rate', 'Cutoff', 'Gate', 'VCA CV', 'TWO', 'S+H (VCO)', 'S+H Gate (LFO)', 'Attn (+5)', 'Mult'],
	'Mother 32': ['Ext. Audio', 'Mix CV', 'VCA CV', 'VCF Cutoff', 'VCF Res.', 'VCO 1V/Oct', 'CVO Lin FM'],
	'Subharmonicon': ['VCO 1', 'VCO 1 Sub', 'VCO 1 PWM', 'VCA', 'VCO 2', 'VCO 2 Sub', 'VCO 2 PWM', 'Cutoff', 'Play', 'Reset', 'Trigger', 'Rhythm 1', 'Rhythm 2', 'Rhythm 3', 'Rhythm 4', 'Clock'],
	'Werkstatt': ['VCA CV In', 'VCF CV In', 'VCO Lin FM In', 'VCO Exp FM In', 'LFO FM In', 'Gate In', 'VCF Aud In'],
	'Expanded Rack': ['RoAT: Clock In', 'Plaits: Timbre', 'Plaits: Morph', 'Plaits: Level', 'Plaits: Model', 'Plaits: FM', 'Plaits: Harm', 'Plaits: Trig', 'Plaits: V/Oct', 'Filter: Audio In', 'Filter: Freq CV', 'Filter: Freq CV (attenuated)', 'Drive: Low/1', 'Drive: High/2', 'Mimeophon: L (Mono) Input', 'Mimeophon: R Input', 'Mimeophon: Repeats: CV Input', 'Mimeophon: Zone: CV Input', 'Mimeophon: Mix: CV Input', 'Mimeophon: Rate: CV Input', 'Mimeophon: Rate: µ Input', 'Mimeophon: Halo: CV Input', 'Mimeophon: Color: CV Input', 'Mimeophon: Tempo: Input', 'Mimeophon: Flip: Input', 'Mimeophon: Hold: Input', 'Disting 1: Z', 'Disting 1: X', 'Disting 1: Y', 'Disting 2: Z', 'Disting 2: X', 'Disting 2: Y', 'Sample & Hold: Signal In', 'Sample & Hold: S&H', 'Sample & Hold: T&H', 'Slew 1: Signal In', 'Mix-B: o', 'Mix-B: oo', 'Mix-B: ooo', 'Piezo Amp: In', 'Attenuator 1: In', 'Attenuator 2: In', 'Attenuator 3: In', 'Att-Off 1: In', 'Att-Off 2: In', "Att-Vert 1: In", 'LPG 1: Signal In', 'LPG 1: CV In', 'LPG 2: Signal In', 'LPG 2: CV In', 'TP8: Top Left', 'TP8: Top Right', 'TP8: Top Diamond', 'TP8: Middle Left', 'TP8: Middle Right', 'TP8: Bottom Diamond', 'TP8: Bottom Left', 'TP8: Bottom Right', 'Pedalboard: Pedal 1', 'Pedalboard: Pedal 2', 'Pedalboard: Pedal 3', 'Pedalboard: Pedal 4'],
	'Lyra-4': ['CV Voice', 'CV Delay'],
	'External CV': ['Sync In'],
	'System': ['Audio Out']
}

window.onload = function() {
	if (location.href.indexOf('localhost') !== -1) {
		var liveScript = document.createElement('script');
		liveScript.src = 'https://livejs.com/live.js';
		document.head.appendChild(liveScript);
	}

	if (location.search.indexOf('supertopsecret') !== -1) {
		localStorage.setItem('superTopSecretCode', true);
	}

	setTimeout(() => {
		if (screen.width < 768 && window.innerHeight > window.innerWidth) {
			alert("Please rotate your phone. Exqusite Coast only displays well on phones when in landscape mode.");
		}
	}, 2000);

	if (location.href.indexOf('localhost') === -1 && location.protocol !== 'https:') {
		location.replace(`https:${location.href.substring(location.protocol.length)}`);
	}
	else {
		if (superTopSecretCode) {
			document.getElementById('secretcheckboxes').classList.remove('supertopsecret');
			document.getElementById('secretwerkstattkey').classList.remove('supertopsecret');
		}

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
				headerArea.style.height = (document.getElementById('welcome_message').clientHeight + 48) + 'px';
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
			// }, (Math.random() * 10000) + 15000);
			}, 3400);
	}
		rotateArrows();

		// ***************************   Patch Info   ***************************

		patchNameField = document.getElementById('patch_name');
		authorField = document.getElementById('author');
		patchNotesField = document.getElementById('patch_notes');
		pedalboardPresetField = document.getElementById('pedalboard_preset');
		distingParamsField = document.getElementById('disting_params');
		disting2ParamsField = document.getElementById('disting2_params');
		pedalboardPresetSaveButton = document.getElementById('pedalboard_preset_save_button');
		shareButton = document.getElementById('get_share_link');

		instrument0CoastCheckbox = document.getElementById('instrument_checkbox_0coast');
		instrumentStregaCheckbox = document.getElementById('instrument_checkbox_strega');
		instrument0CTRLCheckbox = document.getElementById('instrument_checkbox_0ctrl');
		instrumentDFAMCheckbox = document.getElementById('instrument_checkbox_dfam');
		instrumentMavisCheckbox = document.getElementById('instrument_checkbox_mavis');
		instrumentMother32Checkbox = document.getElementById('instrument_checkbox_mother32');
		instrumentSubharmoniconCheckbox = document.getElementById('instrument_checkbox_subharmonicon');
		instrumentWerkstattCheckbox = document.getElementById('instrument_checkbox_werkstatt');
		instrumentExpandedRackCheckbox = document.getElementById('instrument_checkbox_expandedrack');
		instrumentLyra4Checkbox = document.getElementById('instrument_checkbox_lyra4');
		instrumentExternalCVCheckbox = document.getElementById('instrument_checkbox_externalcv');

		instrument0CoastCheckbox.addEventListener('change', function() { saveInstrument(instrument0CoastCheckbox); collapseInstruments() });
		instrumentStregaCheckbox.addEventListener('change', function() { saveInstrument(instrumentStregaCheckbox); collapseInstruments() });
		instrument0CTRLCheckbox.addEventListener('change', function() { saveInstrument(instrument0CTRLCheckbox); collapseInstruments() });
		instrumentDFAMCheckbox.addEventListener('change', function() { saveInstrument(instrumentDFAMCheckbox); collapseInstruments() });
		instrumentMavisCheckbox.addEventListener('change', function() { saveInstrument(instrumentMavisCheckbox); collapseInstruments() });
		instrumentMother32Checkbox.addEventListener('change', function() { saveInstrument(instrumentMother32Checkbox); collapseInstruments() });
		instrumentSubharmoniconCheckbox.addEventListener('change', function() { saveInstrument(instrumentSubharmoniconCheckbox); collapseInstruments() });
		instrumentWerkstattCheckbox.addEventListener('change', function() { saveInstrument(instrumentWerkstattCheckbox); collapseInstruments() });
		instrumentExpandedRackCheckbox.addEventListener('change', function() { saveInstrument(instrumentExpandedRackCheckbox); collapseInstruments() });
		instrumentLyra4Checkbox.addEventListener('change', function() { saveInstrument(instrumentLyra4Checkbox); collapseInstruments() });
		instrumentExternalCVCheckbox.addEventListener('change', function() { saveInstrument(instrumentExternalCVCheckbox); collapseInstruments() });

		instrument0Coast = document.getElementById('instrument_0coast');
		instrumentStrega = document.getElementById('instrument_strega');
		instrument0CTRL = document.getElementById('instrument_0ctrl');
		instrumentDFAM = document.getElementById('instrument_dfam');
		instrumentMavis = document.getElementById('instrument_mavis');
		instrumentMother32 = document.getElementById('instrument_mother32');
		instrumentSubharmonicon = document.getElementById('instrument_subharmonicon');
		instrumentWerkstatt = document.getElementById('instrument_werkstatt');
		instrumentExpandedRack = document.getElementById('instrument_expandedrack');
		instrumentLyra4 = document.getElementById('instrument_lyra4');
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
						if (name !== 'workingAuthor' && name !== 'workingPatchName' && name !== 'legacyPatches' && name !== 'superTopSecretCode') {
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

		// ********* Disting Params *********

		distingParamsField.addEventListener('keyup', function() {
			workingPatch.distingParams = distingParamsField.value;
			savePatch();
		});

		disting2ParamsField.addEventListener('keyup', function() {
			workingPatch.disting2Params = disting2ParamsField.value;
			savePatch();
		});

		// ********* Pedalboard Preset *********

		pedalboardPresetField.ondragover = function() {
			this.className = 'hover';
			return false;
		};
		pedalboardPresetField.ondragend = function() {
			this.className = '';
			return false;
		};
		pedalboardPresetField.ondrop = function(e) {
			this.className = '';
			e.preventDefault();

			var file = e.dataTransfer.files[0],
				reader = new FileReader();
			reader.onload = function(event) {
				pedalboardPresetField.value = event.target.result;
				workingPatch.pedalboardPreset = pedalboardPresetField.value;
				changeActive(pedalboardPresetField);
				savePatch();
			};
			reader.readAsText(file);

			return false;
		};

		pedalboardPresetSaveButton.addEventListener('click', function() {
			var presetFile = new Blob([pedalboardPresetField.value], {type: 'text/plain'});
			var tempAnchor = document.createElement("a"),
			tempAnchorURL = URL.createObjectURL(presetFile);
			tempAnchor.href = tempAnchorURL;
			tempAnchor.download = workingPatch.patchName + '_pedalboard_preset';
			document.body.appendChild(tempAnchor);
			tempAnchor.click();
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

		// *** Forget select positions if Firefox
		if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
			Array.from(document.getElementsByTagName('select')).forEach(element => {
				const classes = element.classList;
				if (classes.contains('knobs') || classes.contains('clocks')) {
					element.value = '';
				}
			});
			document.getElementById('nocoast_clock_speed').value = '';
			document.getElementById('nocoast_midi_b_speed').value = '';
		}

		var savedWorkingPatchName;

		var sharedPatchCode = window.location.search.replace('?patch=', '');
		var sharedPatchUncompressed = LZString.decompressFromEncodedURIComponent(sharedPatchCode);
		var sharedPatchUncompressedObject;

		if (sharedPatchUncompressed && sharedPatchUncompressed.indexOf('"a":"') !== -1) {
			try {
				sharedPatchUncompressedObject = JSON.parse(sharedPatchUncompressed);
			} catch (error) {
				alert('The shared patch appears to be invalid. Please check the URL and try again');
				history.pushState(sharedPatchCode, '', window.location.pathname);
			}
			savedWorkingPatchName = loadLegacyShareLink(sharedPatchCode, sharedPatchUncompressedObject);
		}
		else if (sharedPatchUncompressed) {
			stringCodes.forEach(code => {
				var regex = new RegExp(code[0], 'g');
				sharedPatchUncompressed = sharedPatchUncompressed.replace(regex, code[1]);
			});
			try {
				sharedPatchUncompressedObject = JSON.parse(sharedPatchUncompressed);
			} catch (error) {
				console.log(sharedPatchUncompressed);
				console.log(error);
				alert('The shared patch appears to be invalid. Please check the URL and try again');
				history.pushState(sharedPatchCode, '', window.location.pathname);
			}

			if (sharedPatchUncompressedObject)  {

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
				if (name !== 'workingAuthor' && name !== 'workingPatchName' && name !== 'legacyPatches' && name !== 'superTopSecretCode') {
					addPatchNameToSelect(name, false);
				}
			}

			loadSavedPatch();
		}
		else {
			makeNewPatch('Untitled 1');
			if (!appIsSavedToHomescreen()) {
				setTimeout(function() {
					menuButton.click();
				}, 1100);
			}
		}

		setTimeout(() => {
			var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
			var isSafari = navigator.userAgent.indexOf("Safari") > -1;
			var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
			var isIPad = navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2;
			var isPersistent;
			if (navigator.storage && navigator.storage.persist) {
				navigator.storage.persist().then((persistent) => {
					if (persistent) {
						isPersistent = true;
					} else {
						isPersistent = false;
					}

					if (isIOS || isIPad) {
						if (window.navigator.standalone !== true) {
							alert('The use of the Safari browser is strongly discouraged for Exquisite Coasts. Safari deletes local storage data after seven days so you are at risk of losing all your saved patches. To safely use Exquisite Coasts on your iPhone or iPad you must save the website to your homescreen. To do so, tap the share icon in the Safari menu bar and select "Add to Homescreen."');
						}
					}
					else if (isSafari) {
						if (!isChrome && !isPersistent) {
							alert('The use of the Safari browser is strongly discouraged for Exquisite Coasts. Safari deletes local storage data after seven days so you are at risk of losing all your saved patches. To safely use Exquisite Coasts with Safari, with macOS Sonoma (10.14) and later you may save the website as an app. To do so, click the share icon in the Safari toolbar and select "Add to Dock." \n\nFirefox or Chrome browsers are otherwise recommended for all macOS users.');
						}
					}
				});
			}
		}, 1500);
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

		if (workingPatch.distingParams) {
			distingParamsField.value = workingPatch.distingParams;
		}
		if (workingPatch.disting2Params) {
			disting2ParamsField.value = workingPatch.disting2Params;
		}

		if (workingPatch.pedalboardPreset) {
			pedalboardPresetField.value = workingPatch.pedalboardPreset;
			changeActive(pedalboardPresetField);
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('0-Coast') !== -1) {
			instrument0CoastCheckbox.checked = true;
		}
		else {
			instrument0CoastCheckbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('Strega') !== -1) {
			instrumentStregaCheckbox.checked = true;
		}
		else {
			instrumentStregaCheckbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('0-CTRL') !== -1) {
			instrument0CTRLCheckbox.checked = true;
		}
		else {
			instrument0CTRLCheckbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('DFAM') !== -1) {
			instrumentDFAMCheckbox.checked = true;
		}
		else {
			instrumentDFAMCheckbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('Mavis') !== -1) {
			instrumentMavisCheckbox.checked = true;
		}
		else {
			instrumentMavisCheckbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('Mother 32') !== -1) {
			instrumentMother32Checkbox.checked = true;
		}
		else {
			instrumentMother32Checkbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('Subharmonicon') !== -1) {
			instrumentSubharmoniconCheckbox.checked = true;
		}
		else {
			instrumentSubharmoniconCheckbox.checked = false;
		}

		if (workingPatch.instruments && workingPatch.instruments.indexOf('Werkstatt') !== -1) {
			instrumentWerkstattCheckbox.checked = true;
		}
		else {
			instrumentWerkstattCheckbox.checked = false;
		}

		if (superTopSecretCode) {
			if (workingPatch.instruments && workingPatch.instruments.indexOf('Expanded Rack') !== -1) {
				instrumentExpandedRackCheckbox.checked = true;
			}
			else {
				instrumentExpandedRackCheckbox.checked = false;
			}

			if (workingPatch.instruments && workingPatch.instruments.indexOf('Lyra-4') !== -1) {
				instrumentLyra4Checkbox.checked = true;
			}
			else {
				instrumentLyra4Checkbox.checked = false;
			}

			if (workingPatch.instruments && workingPatch.instruments.indexOf('External CV') !== -1) {
				instrumentExternalCVCheckbox.checked = true;
			}
			else {
				instrumentExternalCVCheckbox.checked = false;
			}
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
			if (workingPatch.knobs[key] === '7:00') {
				workingPatch.knobs[key] = 'min';
				savePatch();
			}
			else if (workingPatch.knobs[key] === '5:00') {
				workingPatch.knobs[key] = 'max';
				savePatch();
			}
			else if (workingPatch.knobs[key] === '') {
				delete workingPatch.knobs[key];
				savePatch();
			}

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

	shareButton.innerHTML = 'Get Share Link';
}

function selectAllJacks(update) {
	for (const key in workingPatch.jacks) {
		var connections = workingPatch.jacks[key];

		if (!workingPatch.jacks[key].length) {
			delete workingPatch.jacks[key];
			savePatch();
		}

		for (var i = 0; i < connections.length; i++) {

			if (connections[i].indexOf('Disting:') !== -1) {
				connections[i] = connections[i].replace('Disting:', 'Disting 1:');
			}
			var jackSelect = jackFields[key + '_' + i];
			if (!jackSelect) {
				if (!update) {
					newJackConnection(key + '_plus');
				}
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
		'instrument_checkbox_strega': 'Strega',
		'instrument_checkbox_0ctrl': '0-CTRL',
		'instrument_checkbox_dfam': 'DFAM',
		'instrument_checkbox_mavis': 'Mavis',
		'instrument_checkbox_mother32': 'Mother 32',
		'instrument_checkbox_subharmonicon': 'Subharmonicon',
		'instrument_checkbox_werkstatt': 'Werkstatt',
		'instrument_checkbox_expandedrack': 'Expanded Rack',
		'instrument_checkbox_lyra4': 'Lyra-4',
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
	selectAllJacks(true);
	savePatch();
}

function saveKnob(field) {
	if (!workingPatch.knobs) {
		workingPatch.knobs = {};
	}

	if (field.value === '') {
		delete workingPatch.knobs[field.id];
		savePatch();
	}
	else {
		workingPatch.knobs[field.id] = field.value;
	}

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
			const isNotLastItem = connectionNumber < workingPatch.jacks[jackName].length - 1;
			workingPatch.jacks[jackName].splice(connectionNumber, 1);
			if (isNotLastItem) {
				location.reload();
			}
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

	if (!workingPatch.jacks[jackName].length) {
		delete workingPatch.jacks[jackName];
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

	if (instrumentStregaCheckbox.checked) {
		instrumentStrega.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentStrega.classList.add('collapse');
	}

	if (instrument0CTRLCheckbox.checked) {
		instrument0CTRL.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrument0CTRL.classList.add('collapse');
	}

	if (instrumentDFAMCheckbox.checked) {
		instrumentDFAM.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentDFAM.classList.add('collapse');
	}

	if (instrumentMavisCheckbox.checked) {
		instrumentMavis.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentMavis.classList.add('collapse');
	}

	if (instrumentMother32Checkbox.checked) {
		instrumentMother32.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentMother32.classList.add('collapse');
	}

	if (instrumentSubharmoniconCheckbox.checked) {
		instrumentSubharmonicon.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentSubharmonicon.classList.add('collapse');
	}

	if (instrumentWerkstattCheckbox.checked) {
		instrumentWerkstatt.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentWerkstatt.classList.add('collapse');
	}

	if (instrumentExpandedRackCheckbox.checked) {
		instrumentExpandedRack.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentExpandedRack.classList.add('collapse');
	}

	if (instrumentLyra4Checkbox.checked) {
		instrumentLyra4.classList.remove('collapse');
		instrumentsSelected = true;
	}
	else {
		instrumentLyra4.classList.add('collapse');
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
	if (field.value === ''){
		grandparentDiv.classList.remove('active');
	}
	else {
		grandparentDiv.classList.add('active');
	}
}

function newJackConnection(id) {
	var jackName = id.replace('_plus', '');

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
		coastExpressLinkAnchor.href = 'http://ce.rustle.works/?patch=' + workingPatch.midiInput.coastExpressLink;;
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
	shareButton.innerHTML = 'Link Copied to Clipboard';

	navigator.clipboard.writeText(window.location.href + '?patch=' + workingPatchString);

	setTimeout(() => {
		shareButton.innerHTML = 'Get Share Link';
	}, 5000);
}

// ***************************   Convert Legacy Patches   ***************************

function convertOnePointOhPatch() {
	if (!localStorage.getItem('legacyPatches')) {
		var allPatches = [];
		var allLocalStorage = Object.keys(localStorage);
		for (var i = 0; i < allLocalStorage.length; i++) {
			var name = allLocalStorage[i];
			if (name !== 'workingAuthor' && name !== 'workingPatchName' && name !== 'legacyPatches' && name !== 'superTopSecretCode') {
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

function loadLegacyShareLink(sharedpatchcode, sharedpatchobject) {
	var knobValues = ['', 'min', 'max', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', 'on', 'off', 'odd', '¡¡', 'even', '!!'];


	var knobLabels = ['slope_cycle_illuminated_button', 'voltage_math_channel_attenuverter', 'oscillator_pitch_panel_control', 'oscillator_linear_fm_input_attenuator', 'overtone_panel_control', 'overtone_cv_input_attenuator', 'multiply_panel_control', 'multiply_cv_input_attenuverter', 'slope_rise_panel_control', 'slope_fall_panel_control', 'slope_variresponse', 'countour_onset_panel_control', 'contour_sustain_panel_control', 'contour_decay_panel_control', 'contour_variresponse', 'balance_attenuator', 'dynamic_attenuator'];

	var jackLabels = ['midi_b_cv', 'midi_b_gate', 'clock_clock', 'clock_stepped_random', 'voltage_math_channel_one', 'voltage_math_channel_two', 'oscillator_triangle_wave', 'oscillator_square_wave', 'slope_eoc_gate', 'slope_cv', 'contour_eon', 'contour_cv', 'dynamics_dynamics', 'rack_oscillator', 'rack_filter', 'rack_lfo', 'rack_envelope_generator', 'rack_keyboard_cv', 'rack_keyboard_gate', 'rack_attenuator_one', 'rack_attenuator_two', 'rack_attenuator_three', 'rack_attenuator_four', 'rack_attenuator_four', 'rack_vca', 'rack_lpg1', 'rack_lpg2']; // includes drone labels

	var droneDestinations = ['0-Coast Signal Out', 'Rack: Osc: Exponential FM Input', 'Rack: Osc: Linear FM Input', 'Rack: Filter: Audio Input', 'Rack: Filter: FM Input', 'Rack: VCA: Signal Input', 'Rack: VCA: CV Input', 'Rack: LPG 1: Signal Input', 'Rack: LPG 1: CV Input', 'Rack: LPG 2: Signal Input', 'Rack: LPG 2: CV Input', 'Rack: EG: Gate Input', 'Rack: EG: Trigger Input', 'Rack: LFO: FM Input', 'Rack: Attenuator Input 1', 'Rack: Attenuator Input 2', 'Rack: Attenuator Input 3', 'Rack: Attenuator Input 4', 'Rack: Attenuator Input 5', 'Rack: Signal Out'];

	var combinedDestinationsForSharing = ['', 'TEMPO Input', 'Voltage MATH: Channel 1 Input', 'Voltage MATH: Channel 2 Input', 'Oscillator: 1/V OCTave Input', 'Oscillator: Linear FM Input', 'Overtone: CV Input', 'Multiply: CV Input', 'Slope: Rise/Fall Time CV Input', 'Slope: Trigger Input', 'Contour: Decay Time CV Input', 'Contour: Gate Input', 'Balance: Channel External Input', 'Balance: CV Input', 'Dynamics CV Input', 'Rack: Osc: Exponential FM Input', 'Rack: Osc: Linear FM Input', 'Rack: Filter: Audio Input', 'Rack: Filter: FM Input', 'Rack: LFO: FM Input', 'Rack: EG: Gate Input', 'Rack: EG: Trigger Input', 'Rack: VCA: CV Input', 'Rack: Attenuator Input 1', 'Rack: Attenuator Input 2', 'Rack: Attenuator Input 3', 'Rack: Attenuator Input 4', 'Rack: Attenuator Input 5', 'Rack: VCA: Signal Input', '0-Coast Signal Out', 'Rack: Signal Out', 'Rack: LPG 1: Signal Input', 'Rack: LPG 1: CV Input', 'Rack: LPG 2: Signal Input', 'Rack: LPG 2: CV Input'];

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
			toggleMultiplierFieldVisibility(clockSpeedTypeField, clockSpeedMultiplierField)
			unMinifiedObject.clock_speed_multiplier = sharedpatchobject.j;
		}
		if (sharedpatchobject.f) {
			unMinifiedObject.midi_b_speed = sharedpatchobject.f;
		}
		if (sharedpatchobject.g) {
			unMinifiedObject.midi_b_speed_type = sharedpatchobject.g;
			toggleMultiplierFieldVisibility(midiBLFOSpeedTypeField, midiBLFOSpeedMultiplierField)
			unMinifiedObject.midi_b_multiplier = sharedpatchobject.k;
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
				unMinifiedConnections.push(combinedDestinationsForSharing[connections[i]])
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

function appIsSavedToHomescreen() {
	// For iOS Safari
	if (window.navigator.standalone !== undefined) {
	  return window.navigator.standalone;
	}

	// For Android browsers
	if (window.matchMedia('(display-mode: standalone)').matches) {
	  return true;
	}

	// If none of the above, it's not standalone
	return false;
 }