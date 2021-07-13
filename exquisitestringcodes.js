var stringCodes = [['~a0', '"version":'], ['~b0', '"patchName":'], ['~c0', '"author":'], ['~d0', '"patch_notes":'], ['~e0', '"instruments":'], ['~f0', '"0-Coast"'], ['~g0', '"Werkstatt"'], ['~h0', '"Passive Rack"'], ['~i0', '"External CV"'], ['~j0', '"jacks":{'], ['~k0', '"knobs":{'], ['~l0', '"clockSpeeds":{'], ['~m0', '"midiInput":{'], ['~n0', '"coastExpressLink":'], ['~o0', '"Keyboard Note"'], ['~p0', '"Keyboard Velocity"'], ['~q0', '"Keyboard Gate"'], ['~r0', '"Sequencer Note"'], ['~s0', '"Sequencer Velocity"'], ['~t0', '"Sequencer Gate"'], ['~u0', '"Mod Wheel"'], ['~v0', '"LFO"'], ['~w0', '"min"'], ['~x0', '"max"'], ['~y0', '"odd"'], ['~z0', '"even"'], ['~a1', '"7:00"'], ['~b1', '"7:30"'], ['~c1', '"8:00"'], ['~d1', '"8:30"'], ['~e1', '"9:00"'], ['~f1', '"9:30"'], ['~g1', '"10:00"'], ['~h1', '"10:30"'], ['~i1', '"11:00"'], ['~j1', '"11:30"'], ['~k1', '"12:00"'], ['~l1', '"12:30"'], ['~m1', '"1:00"'], ['~n1', '"1:30"'], ['~o1', '"2:00"'], ['~p1', '"2:30"'], ['~q1', '"3:00"'], ['~r1', '"3:30"'], ['~s1', '"4:00"'], ['~t1', '"4:30"'], ['~u1', '"5:00"'], ['~v1', '"nocoast_clock_speed"'], ['~w1', '"nocoast_clock_speed_type"'], ['~x1', '"nocoast_clock_speed_multiplier"'], ['~y1', '"nocoast_midi_b_speed"'], ['~z1', '"nocoast_midi_b_speed_type"'], ['~a2', '"nocoast_midi_b_multiplier"'], ['~b2', '"nocoast_voltage_math_channel_attenuverter"'], ['~c2', '"nocoast_oscillator_pitch_panel_control"'], ['~d2', '"nocoast_oscillator_linear_fm_input_attenuator"'], ['~e2', '"nocoast_overtone_panel_control"'], ['~f2', '"nocoast_overtone_cv_input_attenuator"'], ['~g2', '"nocoast_multiply_panel_control"'], ['~h2', '"nocoast_multiply_cv_input_attenuverter"'], ['~i2', '"nocoast_slope_cycle_illuminated_button"'], ['~j2', '"nocoast_slope_rise_panel_control"'], ['~k2', '"nocoast_slope_fall_panel_control"'], ['~l2', '"nocoast_slope_variresponse"'], ['~m2', '"nocoast_countour_onset_panel_control"'], ['~n2', '"nocoast_contour_sustain_panel_control"'], ['~o2', '"nocoast_contour_decay_panel_control"'], ['~p2', '"nocoast_contour_variresponse"'], ['~q2', '"nocoast_balance_attenuator"'], ['~r2', '"nocoast_dynamic_attenuator"'], ['~s2', '"nocoast_clock_clock"'], ['~t2', '"nocoast_clock_stepped_random"'], ['~u2', '"nocoast_midi_b_cv"'], ['~v2', '"nocoast_midi_b_gate"'], ['~w2', '"nocoast_voltage_math_channel_one"'], ['~x2', '"nocoast_voltage_math_channel_two"'], ['~y2', '"nocoast_oscillator_triangle_wave"'], ['~z2', '"nocoast_oscillator_square_wave"'], ['~a3', '"nocoast_slope_eoc_gate"'], ['~b3', '"nocoast_slope_cv"'], ['~c3', '"nocoast_contour_eon"'], ['~d3', '"nocoast_contour_cv"'], ['~e3', '"nocoast_dynamics_dynamics"'], ['~f3', '"nocoast_headphone_line_out"'], ['~g3', '"nocoast_midi_input_a_cv"'], ['~h3', '"nocoast_midi_input_a_gate"'], ['~i3', '"nocoast_midi_input_b_cv"'], ['~j3', '"nocoast_midi_input_b_gate"'], ['~k3', '"werkstatt_vco_freq"'], ['~l3', '"werkstatt_vco_wave"'], ['~m3', '"werkstatt_vco_pwm"'], ['~n3', '"werkstatt_vcf_cutoff"'], ['~o3', '"werkstatt_vco_res"'], ['~p3', '"werkstatt_vca_mode"'], ['~q3', '"werkstatt_vco_mod_source"'], ['~r3', '"werkstatt_vco_mod_amount"'], ['~s3', '"werkstatt_vco_mod_dest"'], ['~t3', '"werkstatt_vcf_mod_source"'], ['~u3', '"werkstatt_vcf_mod_amount"'], ['~v3', '"werkstatt_vcf_mod_polarity"'], ['~w3', '"werkstatt_lfo_rate"'], ['~x3', '"werkstatt_lfo_wave"'], ['~y3', '"werkstatt_envelope_sustain"'], ['~z3', '"werkstatt_envelope_attack"'], ['~a4', '"werkstatt_envelope_decay"'], ['~b4', '"werkstatt_keyboard_glide"'], ['~c4', '"werkstatt_kb_cv_out"'], ['~d4', '"werkstatt_gate_out"'], ['~e4', '"werkstatt_eg_out"'], ['~f4', '"werkstatt_lfo_out"'], ['~g4', '"werkstatt_vcf_out"'], ['~h4', '"werkstatt_vco_out"'], ['~i4', '"werkstatt_vco_out"'], ['~j4', '"rack_voltage_math_attenuator_one"'], ['~k4', '"rack_voltage_math_attenuator_two"'], ['~l4', '"rack_voltage_math_attenuator_three"'], ['~m4', '"rack_attenuator_one"'], ['~n4', '"rack_attenuator_two"'], ['~o4', '"rack_attenuator_three"'], ['~p4', '"rack_lpg_one"'], ['~q4', '"rack_lpg_two"'], ['~t4', '"externalcv_note_one"'], ['~u4', '"externalcv_velocity_one"'], ['~v4', '"externalcv_aftertouch_one"'], ['~w4', '"externalcv_gate_one"'], ['~x4', '"externalcv_modwheel_one"'], ['~y4', '"externalcv_sync_one"'], ['~z4', '"externalcv_note_two"'], ['~a5', '"externalcv_velocity_two"'], ['~b5', '"externalcv_aftertouch_two"'], ['~c5', '"externalcv_gate_two"'], ['~d5', '"externalcv_modwheel_two"'], ['~e5', '"externalcv_sync_two"'], ['~f5', '"externalcv_note_three"'], ['~g5', '"externalcv_velocity_three"'], ['~h5', '"externalcv_aftertouch_three"'], ['~i5', '"externalcv_gate_three"'], ['~j5', '"externalcv_modwheel_three"'], ['~k5', '"externalcv_sync_three"'], ['~l5', '"externalcv_note_four"'], ['~m5', '"externalcv_velocity_four"'], ['~n5', '"externalcv_aftertouch_four"'], ['~o5', '"externalcv_gate_four"'], ['~p5', '"externalcv_modwheel_four"'], ['~q5', '"externalcv_sync_four"'], ['~r5', '"0-Coast: TEMPO Input"'], ['~s5', '"0-Coast: Voltage MATH: Channel 1 Input"'], ['~t5', '"0-Coast: Voltage MATH: Channel 2 Input"'], ['~u5', '"0-Coast: Oscillator: 1/V OCTave Input"'], ['~v5', '"0-Coast: Oscillator: Linear FM Input"'], ['~w5', '"0-Coast: Overtone: CV Input"'], ['~x5', '"0-Coast: Multiply: CV Input"'], ['~y5', '"0-Coast: Slope: Rise/Fall Time CV Input"'], ['~z5', '"0-Coast: Slope: Trigger Input"'], ['~a6', '"0-Coast: Contour: Decay Time CV Input"'], ['~b6', '"0-Coast: Contour: Gate Input"'], ['~c6', '"0-Coast: Balance: Channel External Input"'], ['~d6', '"0-Coast: Balance: CV Input"'], ['~e6', '"0-Coast: Dynamics: CV Input"'], ['~f6', '"Werkstatt: VCA CV In"'], ['~g6', '"Werkstatt: VCF CV In"'], ['~h6', '"Werkstatt: VCO Lin FM In"'], ['~i6', '"Werkstatt: VCO Exp FM In"'], ['~j6', '"Werkstatt: LFO FM In"'], ['~k6', '"Werkstatt: Gate In"'], ['~l6', '"Werkstatt: VCF Aud In"'], ['~m6', '"Expanded Rack: Attenuator 1: In"'], ['~n6', '"Expanded Rack: Attenuator 2: In"'], ['~o6', '"Expanded Rack: Attenuator 3: In"'], ['~p6', '"Expanded Rack: LPG 1: Signal In"'], ['~q6', '"Expanded Rack: LPG 1: CV In"'], ['~r6', '"Expanded Rack: LPG 2: Signal In"'], ['~s6', '"Expanded Rack: LPG 2: CV In"'], ['~u6', '"Expanded Rack: Ring Mod 1: Signal In"'], ['~v6', '"Expanded Rack: Ring Mod 1: Carrier In"'], ['~w6', '"Expanded Rack: Ring Mod 2: Signal In"'], ['~x6', '"Expanded Rack: Ring Mod 2: Carrier In"'], ['~y6', '"External CV: Sync In"'], ['~z6', '"System: Audio Out"'], ['~a7', '"rack_attoff_attenuator_one"'], ['~b7', '"rack_attoff_offset_one"'], ['~c7', '"rack_attoff_one_container"'], ['~d7', '"expandedrack_disting_a"'], ['~e7', '"expandedrack_disting_b"'], ['~d8', '"expandedrack_disting2_a"'], ['~e8', '"expandedrack_disting2_b"'], ['~f7', '"expandedrack_tp8_topleft"'], ['~g7', '"expandedrack_tp8_topright"'], ['~h7', '"expandedrack_tp8_leftdiamond"'], ['~i7', '"expandedrack_tp8_middleleft"'], ['~j7', '"expandedrack_tp8_middleright"'], ['~k7', '"expandedrack_tp8_bottomdiamond"'], ['~l7', '"expandedrack_tp8_bottomleft"'], ['~m7', '"expandedrack_tp8_bottomright"'], ['~n7', '"Att-Off', '1:', 'In"'], ['~o7', '"Expanded Rack: Disting: Z"'], ['~p7', '"Expanded Rack: Disting: X"'], ['~q7', '"Expanded Rack: Disting: Y"'], ['~f8', '"Expanded Rack: Disting 2: Z"'], ['~g8', '"Expanded Rack: Disting 2: X"'], ['~h8', '"Expanded Rack: Disting 2: Y"'], ['~r7', '"Expanded Rack: TP8: Top Left"'], ['~s7', '"Expanded Rack: TP8: Top Right"'], ['~t7', '"Expanded Rack: TP8: Top Diamond"'], ['~u7', '"Expanded Rack: TP8: Middle Left"'], ['~v7', '"Expanded Rack: TP8: Middle Right"'], ['~w7', '"Expanded Rack: TP8: Bottom Expanded Rack: Diamond"'], ['~x7', '"Expanded Rack: TP8: Bottom Left"'], ['~y7', '"Expanded Rack: TP8: Bottom Right"'], ['~z7', '"rack_sandh_signal_out_one"'], ['~a8', '"Expanded Rack: Sample & Hold: Signal In"'], ['~b8', '"Expanded Rack: Sample & Hold: T&H"'], ['~c8', '"Expanded Rack: Sample & Hold: S&H"'], ['~i8', '"Filter: Audio In"'], ['~j8', '"Filter: Freq CV"'], ['~k8', '"Filter: Freq CV (attenuated)"']];




