'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');
const beacon = require('eddystone-beacon');

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
	
	mainWindow.setContentSize(192, 192);

	mainWindow.loadUrl(`file://${__dirname}/index.html`);

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});

ipc.on('beacon', function(event, url) {
	console.log('URL for advertising has been updated to', url);
	
	beacon.advertiseUrl(url);
});