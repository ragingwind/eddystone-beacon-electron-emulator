'use strict';

var React = require('react');
var ipc = require('ipc');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var MainApp = React.createClass({
  url: 'goo.gl/eddy',
  urlHasUnfocused: function (e) {
    this.url = this.state.url.trim();
    this.setState({url: this.url});

		ipc.sendSync('synchronous-message', url);
	},
  urlHasChanged: function (e) {
		this.setState({url: e.target.value});
  },
  urlOnKeyDown: function (e) {
    if (e.which === ESCAPE_KEY) {
			console.log('cancel');
      this.setState({url: this.url});
    } else if (e.which === ENTER_KEY) {
      this.urlHasUnfocused();
    }
  },
  getInitialState: function () {
    return {url: this.url};
  },
	componentDidUpdate: function () {
		console.log('didUpdate', this.url);
		ipc.sendSync('synchronous-message', this.url);
	},
  render: function() {
    return <div>
      <div id="es-activity">
				<img src="components/eddystone_logo.png"></img>
      </div>
      <div id="es-url-input">
        <input className="url-input" type="input"
               value={this.state.url}
               onBlur={this.urlHasUnfocused}
               onChange={this.urlHasChanged}
               onKeyDown={this.urlOnKeyDown}
				/>
      </div>
    </div>;

  }
});

React.render(<MainApp/>,
  document.getElementById('container')
);
