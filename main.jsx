'use strict';

const React = require('react');
const ReactDom = require('react-dom');
const BeaconDevice = require('./components/eddystone-device');
const BeaconConfigPanel = require('./components/eddystone-config-panel');
const { ipcRenderer } = require('electron');

const MainApp = React.createClass({
	getInitialState: function () {
		return {
			url: 'https://goo.gl/Aq18zF'
		};
	},
	hideConfigPanel: function (url) {
		this.refs.configPanel.hide();
		if (url) {
			this.setState({url: url});
			ipcRenderer.send('beacon', url);
		}
	},
	showConfigPanel: function () {
		this.refs.configPanel.show();
	},
	componentDidMount: function () {
		ipcRenderer.send('beacon', this.state.url);
	},
	render: function() {
		return (
			<div>
				<BeaconDevice onClickConfig={this.showConfigPanel}/>
				<BeaconConfigPanel
					ref="configPanel"
					url={this.state.url}
					onExit={this.hideConfigPanel} />
			</div>
		);
	}
});

ReactDom.render(<MainApp/>,
	document.getElementById('container')
);
