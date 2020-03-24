const ROTATESPEED = 125;
const BUTTONDIVWIDTH = 535;
const BUTTONSIZE = 53;
const ICONSIZE = 32;


class Modewidgetmodel {
	// this is meant to store all types of data 
	// related to custom mode widget.
	constructor() {
		//this._logo = logo;
		//this._modeBlock = modeBlock;
		this._locked = false;
		//this._pitch = this._logo.keySignature[0][0];
        this._noteValue = 0.333;
        this._undoStack = [];
        this._playing = false;
        this._selectedNotes = [];
        this._newPattern = [];
        this._modeTableDiv = null;

        this._widgetWindow = null;

        //Buttons used in widget
        this._playButton = null;
        this._exportButton = null;
        this._eraseButton = null;
        this._rotateLeftButton = null;
        this._rotateRightButton = null;
        this._invertButton = null;
        this._restoreButton = null;

        this._row = null;
        this._cell = null;

        this._TableDiv = null;
        this._modePianoDiv = null;

        this._highlightImgs = [
            "images/highlights/sel_c.png",
            "images/highlights/sel_c_sharp.png",
            "images/highlights/sel_d.png",
            "images/highlights/sel_d_sharp.png",
            "images/highlights/sel_e.png",
            "images/highlights/sel_f.png",
            "images/highlights/sel_f_sharp.png",
            "images/highlights/sel_g.png",
            "images/highlights/sel_g_sharp.png",
            "images/highlights/sel_a.png",
            "images/highlights/sel_a_sharp.png",
            "images/highlights/sel_b.png"
        ];

        this._animationImgs = [
            "images/animations/sel_c1.png",
            "images/animations/sel_c_sharp1.png",
            "images/animations/sel_d1.png",
            "images/animations/sel_d_sharp1.png",
            "images/animations/sel_e1.png",
            "images/animations/sel_f1.png",
            "images/animations/sel_f_sharp1.png",
            "images/animations/sel_g1.png",
            "images/animations/sel_g_sharp1.png",
            "images/animations/sel_a1.png",
            "images/animations/sel_a_sharp1.png",
            "images/animations/sel_b1.png"
        ];

        this._startDict = {
            "C♭": 11,
            C: 0,
            "C♯": 1,
            "D♭": 1,
            D: 2,
            "D♯": 3,
            "E♭": 3,
            E: 4,
            "E♯": 5,
            "F♭": 4,
            F: 5,
            "F♯": 6,
            "G♭": 6,
            G: 7,
            "G♯": 8,
            "A♭": 8,
            A: 9,
            "A♯": 10,
            "A♭": 10,
            B: 11,
            "B♯": 0
        };

        this._labels = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11"
        ];
	}

	

	closewidget() {
		this._logo.hideMsgs();
        this._widgetWindow.destroy();
	}

	addPrimaryButtons() {
		this._playButton = this._widgetWindow.addButton("play-button.svg",
		 ICONSIZE,
		 _("Play")
		 );

		this._exportButton = this._widgetWindow.addButton("export-chunk.svg",
            ICONSIZE,
            _("Save")
            );

		this._eraseButton = this._widgetWindow.addButton("erase-button.svg",
            ICONSIZE,
            _("Clear")
            );

		this._rotateLeftButton = this._widgetWindow.addButton("rotate-left.svg",
            ICONSIZE,
            _("Rotate counter clockwise")
            );

		this._rotateRightButton = this._widgetWindow.addButton("rotate-right.svg",
            ICONSIZE,
            _("Rotate clockwise")
            );

        this._invertButton = this._widgetWindow.addButton("invert.svg",
            ICONSIZE,
            _("Invert")
            );        



	}

	renderplayButton() {
		this._logo.resetSynth(0);
		if(this._playingStatus()) {
			this._playing = false;

			this.innerHTML =
                    '&nbsp;&nbsp;<img src="header-icons/play-button.svg" title="' +
                    _("Play all") +
                    '" alt="' +
                    _("Play all") +
                    '" height="' +
                    ICONSIZE +
                    '" width="' +
                    ICONSIZE +
                    '" vertical-align="middle">&nbsp;&nbsp;';
            } else {
                that._playing = true;

                this.innerHTML =
                    '&nbsp;&nbsp;<img src="header-icons/stop-button.svg" title="' +
                    _("Stop") +
                    '" alt="' +
                    _("Stop") +
                    '" height="' +
                    ICONSIZE +
                    '" width="' +
                    ICONSIZE +
                    '" vertical-align="middle">&nbsp;&nbsp;';

                this._playAll();
            }
		

	}

	playingStatus() {
		return this._playing;
	}

	addTable() {
		// The mode table (holds a pie menu and a label)
        this._TableDiv = this.modeTableDiv;
        this._TableDiv.style.display = "inline";
        this._TableDiv.style.visibility = "visible";
        this._TableDiv.style.border = "0px";
        // modeTableDiv.innerHTML = '<table id="modeTable"></table>';
        this._TableDiv.innerHTML = '<div id="meterWheelDiv"></div>';
        this._TableDiv.innerHTML += '<div id="modePianoDiv" class=""></div>';
        this._TableDiv.innerHTML += '<table id="modeTable"></table>';

        this._piemenuMode();

        var table = docById("modeTable");

		// A row for the current mode label
        var row = table.insertRow();
        var cell = row.insertCell();        

		
		cell.innerHTML = "&nbsp;"; 
		cell.style.backgroundColor = platformColor.selectorBackground;
     
	}

	sendTableMsg() {
		this._logo.textMsg(
            _("Click in the circle to select notes for the mode.")
        );
	}

	addButton(row, icon, iconSize, label) {
		this._cell = row.insertCell(-1);
		this._cell.innerHTML =
            '&nbsp;&nbsp;<img src="header-icons/' +
            icon +
            '" title="' +
            label +
            '" alt="' +
            label +
            '" height="' +
            iconSize +
            '" width="' +
            iconSize +
            '" vertical-align="middle" align-content="center">&nbsp;&nbsp;';
        this._cell.style.width = BUTTONSIZE + "px";
        this._cell.style.minWidth = cell.style.width;
        this._cell.style.maxWidth = cell.style.width;
        this._cell.style.height = cell.style.width;
        this._cell.style.minHeight = cell.style.height;
        this._cell.style.maxHeight = cell.style.height;
        this._cell.style.backgroundColor = platformColor.selectorBackground;

        return(this._cell);

	}

	setMode() {
		// Read in the current mode to start.
        var currentModeName = keySignatureToMode(this._logo.keySignature[0]);
        var currentMode = MUSICALMODES[currentModeName[1]];

        // Add the mode name in the bottom row of the table.
        var table = docById("modeTable");
        var n = table.rows.length - 1;

        console.debug(_(currentModeName[1]));
        var name = currentModeName[0] + " " + _(currentModeName[1]);
        table.rows[n].cells[0].innerHTML = name;
        this.widgetWindow.updateTitle(name);

        // Set the notes for this mode.
        var that = this;
        var k = 0;
        var j = 0;
        for (var i = 0; i < 12; i++) {
            if (i === j) {
                this._noteWheel.navItems[i].navItem.show();
                this._selectedNotes[i] = true;
                j += currentMode[k];
                k += 1;
            } else {
                this._noteWheel.navItems[i].navItem.hide();
            }
        }

        if (currentModeName[0] === "C") {
            this._showPiano();
        }
	}

	_showPiano() {
		this._modePianoDiv  = docById("modePianoDiv");
		this._modePianoDiv.style.display = "inline";
        this._modePianoDiv.style.visibility = "visible";
        this._modePianoDiv.style.border = "0px";
        this._modePianoDiv.style.top = "0px";
        this._modePianoDiv.style.left = "0px";
        this._modePianoDiv.innerHTML =
            '<img src="images/piano_keys.png"  id="modeKeyboard" style="top:0px; left:0px; position:relative;">';

        var currentModeName = keySignatureToMode(this._logo.keySignature[0]);
        var letterName = currentModeName[0];
        var modeName = currentModeName[1];

        if (letterName in startDict) {
            var startingPosition = startDict[letterName];
        } else {
            var startingPosition = 0;
        }

        this._modePianoDiv.innerHTML +=
            '<img id="pkey_0" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_1" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_2" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_3" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_4" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_5" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_6" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_7" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_8" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_9" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_10" style="top:404px; left:0px; position:absolute;">';
        this._modePianoDiv.innerHTML +=
            '<img id="pkey_11" style="top:404px; left:0px; position:absolute;">';

	
        for (var i = 0; i < 12; ++i) {
            if (this._selectedNotes[i])
                document.getElementById("pkey_" + i).src =
                    highlightImgs[(i + startingPosition) % 12];
        }
	}

	_invert() {
		if (this._locked) {
            return;
        }

        this._locked = true;

        this._saveState();
        this.__invertOnePair(1);
        var currentModeName = keySignatureToMode(this._logo.keySignature[0]);
        if (currentModeName[0] === "C") {
            this._showPiano();
        }
    
	}

	__invertOnePair(i) {
		var tmp = this._selectedNotes[i];
        this._selectedNotes[i] = this._selectedNotes[12 - i];
        if (this._selectedNotes[i]) {
            this._noteWheel.navItems[i].navItem.show();
        } else {
            this._noteWheel.navItems[i].navItem.hide();
        }

        this._selectedNotes[12 - i] = tmp;
        if (this._selectedNotes[12 - i]) {
            this._noteWheel.navItems[12 - i].navItem.show();
        } else {
            this._noteWheel.navItems[12 - i].navItem.hide();
        }

        if (i === 5) {
            this._saveState();
            this._setModeName();
            var currentModeName = keySignatureToMode(
                this._logo.keySignature[0]
            );
            if (currentModeName[0] === "C") {
                this._showPiano();
            }
            this._locked = false;
        } else {
            var that = this;

            setTimeout(function() {
                that.__invertOnePair(i + 1);
            }, ROTATESPEED);
        }
	}

	_resetNotes() {
        for (var i = 0; i < this._selectedNotes.length; i++) {
            if (this._selectedNotes[i]) {
                this._noteWheel.navItems[i].navItem.show();
            } else {
                this._noteWheel.navItems[i].navItem.hide();
            }

            this._playWheel.navItems[i].navItem.hide();
        }
    }

    _rotateRight() {
        if (this._locked) {
            return;
        }

        this._locked = true;

        this._saveState();
        this._newPattern = [];
        this._newPattern.push(this._selectedNotes[11]);
        for (var i = 0; i < 11; i++) {
            this._newPattern.push(this._selectedNotes[i]);
        }

        this.__rotateRightOneCell(1);
    }

    __rotateRightOneCell(i, cellColors) {
        this._selectedNotes[i] = this._newPattern[i];
        if (this._selectedNotes[i]) {
            this._noteWheel.navItems[i].navItem.show();
        } else {
            this._noteWheel.navItems[i].navItem.hide();
        }

        var that = this;

        if (i === 0) {
            setTimeout(function() {
                if (that._selectedNotes[0]) {
                    // We are done.
                    that._saveState();
                    that._setModeName();
                    var currentModeName = keySignatureToMode(
                        that._logo.keySignature[0]
                    );
                    if (currentModeName[0] === "C") {
                        that._showPiano();
                    }
                    that._locked = false;
                } else {
                    // Keep going until first note is selected.
                    that._locked = false;
                    that._rotateRight();
                }
            }, ROTATESPEED);
        } else {
            setTimeout(function() {
                that.__rotateRightOneCell((i + 1) % 12);
            }, ROTATESPEED);
        }
    }

    _rotateLeft() {
        if (this._locked) {
            return;
        }

        this._locked = true;

        this._saveState();
        this._newPattern = [];
        for (var i = 1; i < 12; i++) {
            this._newPattern.push(this._selectedNotes[i]);
        }

        this._newPattern.push(this._selectedNotes[0]);

        this.__rotateLeftOneCell(11);
    }

    __rotateLeftOneCell(i) {
        this._selectedNotes[i] = this._newPattern[i];
        if (this._selectedNotes[i]) {
            this._noteWheel.navItems[i].navItem.show();
        } else {
            this._noteWheel.navItems[i].navItem.hide();
        }

        var that = this;

        if (i === 0) {
            setTimeout(function() {
                if (that._selectedNotes[0]) {
                    // We are done.
                    that._saveState();
                    that._setModeName();
                    var currentModeName = keySignatureToMode(
                        that._logo.keySignature[0]
                    );
                    if (currentModeName[0] === "C") {
                        that._showPiano();
                    }
                    that._locked = false;
                } else {
                    // Keep going until first note is selected.
                    that._locked = false;
                    that._rotateLeft();
                }
            }, ROTATESPEED);
        } else {
            setTimeout(function() {
                that.__rotateLeftOneCell(i - 1);
            }, ROTATESPEED);
        }
    }

    _playAll() {
        // Play all of the notes in the widget.
        if (this._locked) {
            return;
        }

        this._logo.synth.stop();
        this._locked = true;

        // Make a list of notes to play
        this._notesToPlay = [];
        // Play the mode ascending.
        for (var i = 0; i < 12; i++) {
            if (this._selectedNotes[i]) {
                this._notesToPlay.push(i);
            }
        }

        // Include the octave above the starting note.
        this._notesToPlay.push(12);

        // And then play the mode descending.
        this._notesToPlay.push(12);
        for (var i = 11; i > -1; i--) {
            if (this._selectedNotes[i]) {
                this._notesToPlay.push(i);
            }
        }
        console.debug(this._notesToPlay);
        this._lastNotePlayed = null;
        if (this._playing) {
            this.__playNextNote(0);
        }
    }

    __playNextNote(i) {
    	var startingposition = 0;
        time = this._noteValue + 0.125;
        var that = this;

        var currentKey = keySignatureToMode(this._logo.keySignature[0])[0];
        if (currentKey === "C") {
            if (i > this._notesToPlay.length - 1) {
                setTimeout(function() {
                    // Did we just play the last note?
                    that._playing = false;
                    var note_key = document.getElementById("pkey_" + 0);
                    if (note_key !== null) {
                        note_key.src = highlightImgs[0];
                    }
                    that._playButton.innerHTML =
                        '&nbsp;&nbsp;<img src="header-icons/play-button.svg" title="' +
                        _("Play all") +
                        '" alt="' +
                        _("Play all") +
                        '" height="' +
                        ICONSIZE +
                        '" width="' +
                        ICONSIZE +
                        '" vertical-align="middle">&nbsp;&nbsp;';
                    that._resetNotes();
                    that._locked = false;
                }, 1000 * time);

                return;
            }

            setTimeout(function() {
                if (that._lastNotePlayed !== null) {
                    that._playWheel.navItems[
                        that._lastNotePlayed % 12
                    ].navItem.hide();
                    var note_key = document.getElementById(
                        "pkey_" + (that._lastNotePlayed % 12)
                    );
                    if (note_key !== null) {
                        note_key.src =
                            highlightImgs[
                                (that._lastNotePlayed + startingposition) % 12
                            ];
                    }
                }

                note = that._notesToPlay[i];
                that._playWheel.navItems[note % 12].navItem.show();

                if (note !== 12) {
                    var note_key = document.getElementById(
                        "pkey_" + (note % 12)
                    );
                    if (note_key !== null) {
                        note_key.src =
                            animationImgs[(note + startingposition) % 12];
                    }
                }

                that._lastNotePlayed = note;
                var ks = that._logo.keySignature[0];
                var noteToPlay = getNote(
                    that._pitch,
                    4,
                    note,
                    ks,
                    false,
                    null,
                    that._logo.errorMsg
                );
                that._logo.synth.trigger(
                    0,
                    noteToPlay[0].replace(/♯/g, "#").replace(/♭/g, "b") +
                        noteToPlay[1],
                    that._noteValue,
                    DEFAULTVOICE,
                    null,
                    null
                );

                if (that._playing) {
                    that.__playNextNote(i + 1);
                } else {
                    that._locked = false;
                    setTimeout(that._resetNotes(), 500);
                    return;
                }
            }, 1000 * time);
        } else {
            if (i > this._notesToPlay.length - 1) {
                setTimeout(function() {
                    // Did we just play the last note?
                    that._playing = false;
                    that._playButton.innerHTML =
                        '&nbsp;&nbsp;<img src="header-icons/play-button.svg" title="' +
                        _("Play all") +
                        '" alt="' +
                        _("Play all") +
                        '" height="' +
                        ICONSIZE +
                        '" width="' +
                        ICONSIZE +
                        '" vertical-align="middle">&nbsp;&nbsp;';
                    that._resetNotes();
                    that._locked = false;
                }, 1000 * time);

                return;
            }

            setTimeout(function() {
                if (that._lastNotePlayed !== null) {
                    that._playWheel.navItems[
                        that._lastNotePlayed % 12
                    ].navItem.hide();
                }

                note = that._notesToPlay[i];
                that._playWheel.navItems[note % 12].navItem.show();
                that._lastNotePlayed = note;

                var ks = that._logo.keySignature[0];
                var noteToPlay = getNote(
                    that._pitch,
                    4,
                    note,
                    ks,
                    false,
                    null,
                    that._logo.errorMsg
                );
                that._logo.synth.trigger(
                    0,
                    noteToPlay[0].replace(/♯/g, "#").replace(/♭/g, "b") +
                        noteToPlay[1],
                    that._noteValue,
                    DEFAULTVOICE,
                    null,
                    null
                );
                if (that._playing) {
                    that.__playNextNote(i + 1);
                } else {
                    that._locked = false;
                    setTimeout(that._resetNotes(), 500);
                    return;
                }
            }, 1000 * time);
        }
    	
    }

    _playNote(i) {
        var ks = this._logo.keySignature[0];

        var noteToPlay = getNote(
            this._pitch,
            4,
            i,
            ks,
            false,
            null,
            this._logo.errorMsg
        );
        this._logo.synth.trigger(
            0,
            noteToPlay[0].replace(/♯/g, "#").replace(/♭/g, "b") + noteToPlay[1],
            this._noteValue,
            DEFAULTVOICE,
            null,
            null
        );
    }

    _saveState() {
        state = JSON.stringify(this._selectedNotes);
        if (state !== last(this._undoStack)) {
            this._undoStack.push(JSON.stringify(this._selectedNotes));
        }
    };

    _undo() {
        if (this._undoStack.length > 0) {
            var prevState = JSON.parse(this._undoStack.pop());
            for (var i = 0; i < 12; i++) {
                this._selectedNotes[i] = prevState[i];
            }

            this._resetNotes();
            this._setModeName();
            var currentModeName = keySignatureToMode(
                this._logo.keySignature[0]
            );
            if (currentModeName[0] === "C") {
                this._showPiano();
            }
        }
    }

    _clear() {
        // "Unclick" every entry in the widget.

        this._saveState();

        for (var i = 1; i < 12; i++) {
            this._selectedNotes[i] = false;
        }

        this._resetNotes();
        this._setModeName();
        var currentModeName = keySignatureToMode(this._logo.keySignature[0]);
        if (currentModeName[0] === "C") {
            this._showPiano();
        }
    }

    _calculateMode() {
        var currentMode = [];
        var table = docById("modeTable");
        var j = 1;
        for (var i = 1; i < 12; i++) {
            if (this._selectedNotes[i]) {
                currentMode.push(j);
                j = 1;
            } else {
                j += 1;
            }
        }

        currentMode.push(j);
        return currentMode;
    }

    _setModeName() {
        var table = docById("modeTable");
        var n = table.rows.length - 1;
        var currentMode = JSON.stringify(this._calculateMode());
        var currentKey = keySignatureToMode(this._logo.keySignature[0])[0];

        for (var mode in MUSICALMODES) {
            if (JSON.stringify(MUSICALMODES[mode]) === currentMode) {
                // Update the value of the modename block inside of
                // the mode widget block.
                if (this._modeBlock != null) {
                    for (var i in this._logo.blocks.blockList) {
                        if (this._logo.blocks.blockList[i].name == "modename") {
                            this._logo.blocks.blockList[i].value = mode;
                            this._logo.blocks.blockList[i].text.text = _(mode);
                            this._logo.blocks.blockList[i].updateCache();
                        } else if (
                            this._logo.blocks.blockList[i].name == "notename"
                        ) {
                            this._logo.blocks.blockList[i].value = currentKey;
                            this._logo.blocks.blockList[i].text.text = _(
                                currentKey
                            );
                        }
                    }
                    this._logo.refreshCanvas();
                }

                var name = currentKey + " " + _(mode);
                table.rows[n].cells[0].innerHTML = name;
                this.widgetWindow.updateTitle(name);
                return;
            }
        }

        // console.debug('setModeName:' + 'not found');
        table.rows[n].cells[0].innerHTML = "";
        this.widgetWindow.updateTitle("");
    }

    _save() {
        var table = docById("modeTable");
        var n = table.rows.length - 1;

        // If the mode is not in the list, save it as the new custom mode.
        if (table.rows[n].cells[0].innerHTML === "") {
            customMode = this._calculateMode();
            console.debug("custom mode: " + customMode);
            storage.custommode = JSON.stringify(customMode);
        }

        var modeName = table.rows[n].cells[0].innerHTML;
        if (modeName === "") {
            modeName = _("custom");
        }

        // Save a stack of pitches to be used with the matrix.
        var newStack = [
            [0, ["action", { collapsed: true }], 100, 100, [null, 1, 2, null]],
            [1, ["text", { value: modeName }], 0, 0, [0]]
        ];
        var endOfStackIdx = 0;
        var previousBlock = 0;

        var modeLength = this._calculateMode().length;
        var p = 0;

        for (var i = 0; i < 12; i++) {
            // Reverse the order so that Do is last.
            var j = 11 - i;
            if (!this._selectedNotes[j]) {
                continue;
            }

            p += 1;
            var pitch = NOTESTABLE[(j + 1) % 12];
            var octave = 4;
            console.debug(pitch + " " + octave);

            var pitchidx = newStack.length;
            var notenameidx = pitchidx + 1;
            var octaveidx = pitchidx + 2;

            if (p === modeLength) {
                newStack.push([
                    pitchidx,
                    "pitch",
                    0,
                    0,
                    [previousBlock, notenameidx, octaveidx, null]
                ]);
            } else {
                newStack.push([
                    pitchidx,
                    "pitch",
                    0,
                    0,
                    [previousBlock, notenameidx, octaveidx, pitchidx + 3]
                ]);
            }
            newStack.push([
                notenameidx,
                ["solfege", { value: pitch }],
                0,
                0,
                [pitchidx]
            ]);
            newStack.push([
                octaveidx,
                ["number", { value: octave }],
                0,
                0,
                [pitchidx]
            ]);
            var previousBlock = pitchidx;
        }

        // Create a new stack for the chunk.
        console.debug(newStack);
        this._logo.blocks.loadNewBlocks(newStack);
        this._logo.textMsg(_("New action block generated!"));

        // And save a stack of pitchnumbers to be used with the define mode
        var newStack = [
            [0, "definemode", 150, 120, [null, 1, 3, 2]],
            [1, ["modename", { value: modeName }], 0, 0, [0]],
            [2, "hidden", 0, 0, [0, null]]
        ];
        var endOfStackIdx = 0;
        var previousBlock = 0;

        var modeLength = this._calculateMode().length;
        var p = 0;

        for (var i = 0; i < 12; i++) {
            if (!this._selectedNotes[i]) {
                continue;
            }

            p += 1;
            var idx = newStack.length;

            if (p === modeLength) {
                newStack.push([
                    idx,
                    "pitchnumber",
                    0,
                    0,
                    [previousBlock, idx + 1, null]
                ]);
            } else {
                newStack.push([
                    idx,
                    "pitchnumber",
                    0,
                    0,
                    [previousBlock, idx + 1, idx + 2]
                ]);
            }

            newStack.push([idx + 1, ["number", { value: i }], 0, 0, [idx]]);
            var previousBlock = idx;
        }

        // Create a new stack for the chunk.
        console.debug(newStack);
        var that = this;
        setTimeout(function() {
            // that._logo.blocks.palettes.hide();
            that._logo.blocks.loadNewBlocks(newStack);
        }, 2000);
    }

    _piemenuMode() {
        // pie menu for mode definition

        docById("meterWheelDiv").style.display = "";

        // Use advanced constructor for multiple wheelnavs in the same div.
        // The meterWheel is used to hold the half steps.
        this._modeWheel = new wheelnav("meterWheelDiv", null, 400, 400);
        // The selected notes are shown on this wheel
        this._noteWheel = new wheelnav("_noteWheel", this._modeWheel.raphael);
        // Play wheel is to show which note is playing at any one time.
        this._playWheel = new wheelnav("_playWheel", this._modeWheel.raphael);

        wheelnav.cssMeter = true;

        // Use the mode wheel color scheme
        this._modeWheel.colors = platformColor.modeWheelcolors;

        this._modeWheel.slicePathFunction = slicePath().DonutSlice;
        this._modeWheel.slicePathCustom = slicePath().DonutSliceCustomization();
        this._modeWheel.slicePathCustom.minRadiusPercent = 0.4;
        this._modeWheel.slicePathCustom.maxRadiusPercent = 0.75;
        this._modeWheel.sliceSelectedPathCustom = this._modeWheel.slicePathCustom;
        this._modeWheel.sliceInitPathCustom = this._modeWheel.slicePathCustom;

        // Disable rotation, set navAngle and create the menus
        this._modeWheel.clickModeRotate = false;
        this._modeWheel.navAngle = -90;
        // this._modeWheel.selectedNavItemIndex = 2;
        this._modeWheel.animatetime = 0; // 300;

        
        var noteList = [];
        for (var i = 0; i < 12; i++) {
            noteList.push(this._labels[i]);
        }

        this._modeWheel.createWheel(noteList);

        this._noteWheel.colors = platformColor.noteValueWheelcolors; // modeWheelcolors;
        this._noteWheel.slicePathFunction = slicePath().DonutSlice;
        this._noteWheel.slicePathCustom = slicePath().DonutSliceCustomization();
        this._noteWheel.slicePathCustom.minRadiusPercent = 0.75;
        this._noteWheel.slicePathCustom.maxRadiusPercent = 0.9;
        this._noteWheel.sliceSelectedPathCustom = this._noteWheel.slicePathCustom;
        this._noteWheel.sliceInitPathCustom = this._noteWheel.slicePathCustom;
        this._noteWheel.clickModeRotate = false;
        this._noteWheel.navAngle = -90;
        this._noteWheel.titleRotateAngle = 90;

        var noteList = [" "]; // No X on first note, since we don't want to unselect it.
        this._selectedNotes = [true]; // The first note is always selected.
        for (var i = 1; i < 12; i++) {
            noteList.push("x");
            this._selectedNotes.push(false);
        }

        this._noteWheel.createWheel(noteList);

        this._playWheel.colors = [platformColor.orange];
        this._playWheel.slicePathFunction = slicePath().DonutSlice;
        this._playWheel.slicePathCustom = slicePath().DonutSliceCustomization();
        this._playWheel.slicePathCustom.minRadiusPercent = 0.3;
        this._playWheel.slicePathCustom.maxRadiusPercent = 0.4;
        this._playWheel.sliceSelectedPathCustom = this._playWheel.slicePathCustom;
        this._playWheel.sliceInitPathCustom = this._playWheel.slicePathCustom;
        this._playWheel.clickModeRotate = false;
        this._playWheel.navAngle = -90;
        this._playWheel.titleRotateAngle = 90;

        var noteList = [];
        for (var i = 0; i < 12; i++) {
            noteList.push(" ");
        }

        this._playWheel.createWheel(noteList);

        for (var i = 0; i < 12; i++) {
            this._playWheel.navItems[i].navItem.hide();
        }

        var that = this;

        // If a modeWheel sector is selected, show the corresponding
        // note wheel sector.
        var __setNote = function() {
            var i = that._modeWheel.selectedNavItemIndex;
            that._saveState();
            that._selectedNotes[i] = true;
            that._noteWheel.navItems[i].navItem.show();
            that._playNote(i);
            that._setModeName();
            var currentModeName = keySignatureToMode(
                that._logo.keySignature[0]
            );
            if (currentModeName[0] === "C") {
                that._showPiano();
            }
        };

        // If a noteWheel sector is selected, hide it.
        var __clearNote = function() {
            var i = that._noteWheel.selectedNavItemIndex;
            if (i == 0) {
                return; // Never hide the first note.
            }

            that._noteWheel.navItems[i].navItem.hide();
            that._saveState();
            that._selectedNotes[i] = false;
            that._setModeName();
            var currentModeName = keySignatureToMode(
                that._logo.keySignature[0]
            );
            if (currentModeName[0] === "C") {
                that._showPiano();
            }
        };

        for (var i = 0; i < 12; i++) {
            that._modeWheel.navItems[i].navigateFunction = __setNote;
            that._noteWheel.navItems[i].navigateFunction = __clearNote;
            // Start with all notes hidden.
            that._noteWheel.navItems[i].navItem.hide();
        }
    }


}
