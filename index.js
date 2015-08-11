'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
var XpcConnection = require('xpc-connection');

// report crashes to the Electron project
require('crash-reporter').start();

// enable debug window
require('electron-debug')();

// prevent window being GC'd
let mainWindow = null;

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({
		width: 192,
		height: 192,
		resizable: true
	});

	mainWindow.loadUrl(`file://${__dirname}/index.html`);

	mainWindow.on('closed', function () {
		// deref the window
		// for multiple windows store them in an array
		mainWindow = null;
	});
});


// ipc.on('synchronous-message', function(event, arg) {
//   console.log('recv url', arg);
//   EddystoneBeacon.advertiseUrl(arg);
// });
