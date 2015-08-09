'use strict'

var React = require('react');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

module.exports = React.createClass({
	url: '',
	submit: function (e) {
		var val = this.state.url.trim();
		if (val) {
			this.props.onSave(val);
			this.setState({url: val});
		} else {
			// this.props.onDestroy();
		}
	},
	change: function (e) {
		console.log(e);
		this.setState({url: e.target.value})
	},
	keydown: function (e) {
		if (e.which === ESCAPE_KEY) {
			// this.props.onCancel(e);
		} else if (e.which === ENTER_KEY){
			console.log('submit', this.url);
			this.submit(e);
		}
	},
	getInitialState: function () {
		return {url: 'asdasd'};
	},
	render: function() {
		return <input className="url"
								type="input"
								value={this.state.url}
								onBlur={this.submit}
								onChange={this.change}
								onKeyDown={this.keydown}
								/>
	}
});
