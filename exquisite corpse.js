


var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var knobValues = ['', 'min', 'max', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', 'on', 'off', 'odd', '¡¡', 'even', '!!'];

var knobLabels = ['slope_cycle_illuminated_button', 'voltage_math_channel_attenuverter', 'oscillator_pitch_panel_control', 'oscillator_linear_fm_input_attenuator', 'overtone_panel_control', 'overtone_cv_input_attenuator', 'multiply_panel_control', 'multiply_cv_input_attenuverter', 'slope_rise_panel_control', 'slope_fall_panel_control', 'slope_variresponse', 'countour_onset_panel_control', 'contour_sustain_panel_control', 'contour_decay_panel_control', 'contour_variresponse', 'balance_attenuator', 'dynamic_attenuator'];

var jackLabels = ['midi_b_cv', 'midi_b_gate', 'clock_clock', 'clock_stepped_random', 'voltage_math_channel_one', 'voltage_math_channel_two', 'oscillator_triangle_wave', 'oscillator_square_wave', 'slope_eoc_gate', 'slope_cv', 'contour_eon', 'contour_cv', 'dynamics_dynamics', 'rack_oscillator', 'rack_filter', 'rack_lfo', 'rack_envelope_generator', 'rack_keyboard_cv', 'rack_keyboard_gate', 'rack_attenuator_one', 'rack_attenuator_two', 'rack_attenuator_three', 'rack_attenuator_four', 'rack_attenuator_four', 'rack_vca', 'rack_lpg1', 'rack_lpg2']; // includes drone labels

var droneDestinations = ['0-Coast Signal Out', 'Rack: Osc: Exponential FM Input', 'Rack: Osc: Linear FM Input', 'Rack: Filter: Audio Input', 'Rack: Filter: FM Input', 'Rack: VCA: Signal Input', 'Rack: VCA: CV Input', 'Rack: LPG 1: Signal Input', 'Rack: LPG 1: CV Input', 'Rack: LPG 2: Signal Input', 'Rack: LPG 2: CV Input', 'Rack: EG: Gate Input', 'Rack: EG: Trigger Input', 'Rack: LFO: FM Input', 'Rack: Attenuator Input 1', 'Rack: Attenuator Input 2', 'Rack: Attenuator Input 3', 'Rack: Attenuator Input 4', 'Rack: Attenuator Input 5', 'Rack: Signal Out'];

var combinedDestinationsForSharing = ['', 'TEMPO Input', 'Voltage MATH: Channel 1 Input', 'Voltage MATH: Channel 2 Input', 'Oscillator: 1/V OCTave Input', 'Oscillator: Linear FM Input', 'Overtone: CV Input', 'Multiply: CV Input', 'Slope: Rise/Fall Time CV Input', 'Slope: Trigger Input', 'Contour: Decay Time CV Input', 'Contour: Gate Input', 'Balance: Channel External Input', 'Balance: CV Input', 'Dynamics CV Input', 'Rack: Osc: Exponential FM Input', 'Rack: Osc: Linear FM Input', 'Rack: Filter: Audio Input', 'Rack: Filter: FM Input', 'Rack: LFO: FM Input', 'Rack: EG: Gate Input', 'Rack: EG: Trigger Input', 'Rack: VCA: CV Input', 'Rack: Attenuator Input 1', 'Rack: Attenuator Input 2', 'Rack: Attenuator Input 3', 'Rack: Attenuator Input 4', 'Rack: Attenuator Input 5', 'Rack: VCA: Signal Input', '0-Coast Signal Out', 'Rack: Signal Out', 'Rack: LPG 1: Signal Input', 'Rack: LPG 1: CV Input', 'Rack: LPG 2: Signal Input', 'Rack: LPG 2: CV Input'];

window.onload = function() {




	// ********* Get Elements *********







}

// ***************************   Functions   ***************************








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
		minifiedObject.j = workingPatch.clock_speed_multiplier;
	}
	if (workingPatch.midi_b_speed) {
		minifiedObject.f = workingPatch.midi_b_speed;
	}
	if (workingPatch.midi_b_speed_type) {
		minifiedObject.g = workingPatch.midi_b_speed_type;
		minifiedObject.k = workingPatch.midi_b_multiplier;
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
			minifiedConnections.push(combinedDestinationsForSharing.indexOf(connections[i]))
		}
		minifiedObject.i[jackLabels.indexOf(key)] = minifiedConnections;
	}

	var minifiedPatchCompressed = LZString.compressToEncodedURIComponent(JSON.stringify(minifiedObject));
	var copyPatchURL = prompt('Your patch is encoded in the URL below. To share your patch, copy the link (make sure to get the whole thing). You can then paste the URL in an email to send to a friend, share at the Exquisite Coast thread on llllllll.co, or post on social media.', window.location.href + '?patch=' + minifiedPatchCompressed);
}

function loadSharedPatch(sharedpatchcode, sharedpatchobject) {
	var unMinifiedObject;
	console.log(sharedpatchcode);
	console.log(sharedpatchobject);

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

	console.log(unMinifiedObject);
	history.pushState(sharedpatchcode, '', window.location.pathname);
	return savedWorkingPatchName
}

