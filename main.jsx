'use strict';

const React = require('react');
const BeaconDevice = require('./components/eddystone-device');
const BeaconConfigPanel = require('./components/eddystone-config-panel');
const ipc = require('ipc');

const MainApp = React.createClass({
  getInitialState: function () {
    return {
      url: 'http://goo.gl/eddy'
    };
  },
	hideConfigPanel: function (url) {
    this.refs.configPanel.hide();
    if (url) {
      this.setState({url: url});
      ipc.send('beacon', url);
    }
	},
  showConfigPanel: function () {
    this.refs.configPanel.show();
  },
  componentDidMount: function () {
    ipc.send('beacon', this.state.url);
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

React.render(<MainApp/>,
  document.getElementById('container')
);
