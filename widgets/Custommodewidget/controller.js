
class Modewidgetcontroller() {

	constructor(Modewidgetmodel) {

		var widgetWindow = window.widgetWindows.windowFor(this, "custom mode");
        this._model._widgetWindow = widgetWindow;
		
		this._view = widgetWindow;
		this._model = Model; 
		
		this._view.clear();
		this._view.show();
		
		this.generateWidget();
		
	}

	generateWidget() {
		this._model._modeTableDiv = document.createElement("div");
		this._view.getWidgetBody().append(this._model._modeTableDiv);
		
		this._model.addPrimaryButtons();
		this._model.addTable();

		this._model._setMode();
		this._model.sendTableMsg();
            
		this._view.sendToCenter();

	}

	this._view.onclose = function() {
		this._model.closewidget();
	}

	this._model._playButton.onclick = function() {
		this._model.renderplayButton();
	}
	
	this._model._exportButton.onclick = function() {
		this._model._save();
	}

	this._model._eraseButton.onclick = function() {
		this._model._clear();
	}

	this._model._restoreButton.onclick = function() {
		this._model._undo();
	}

	this._model._invertButton.onclick = function() {
		this._model._invert();
	}

	this._model._rotateLeftButton.onclick = function() {
		this._model._rotateLeft();
	}

	this._model._rotateRightButton.onclick = function() {
		this._model._rotateRight();
	}

	this._model._cell.ommouseover = function() {
		this._view.style.backgroundColor = platformColor.selectorBackgroundHOVER;
    }

    this._model._cell.onmouseout = function() {
    	this._view.style.backgroundColor = platformColor.selectorBackground;
    }



}