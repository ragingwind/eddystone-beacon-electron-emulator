'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const beacon = require('eddystone-beacon');

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

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});

ipcMain.on('beacon', function(event, url) {
	console.log('URL for advertising has been updated to', url);

	beacon.advertiseUrl(url);
});
