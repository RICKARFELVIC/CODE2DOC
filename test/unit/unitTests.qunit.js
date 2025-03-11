/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"yit/CODE2DOC/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
