'use strict'

var React = require('react');
var url = require('url');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

function isValidBeaconURL(beaconURL) {
	var protocol = url.parse(beaconURL).protocol;
	return protocol && beaconURL.slice(protocol.length + 2).length <= 18;
}

module.exports = React.createClass({
	getInitialState: function () {
		return {
			url: this.props.url,
			show: false
		};
	},
	componentDidMount: function () {
		var input = React.findDOMNode(this.refs.urlInput);
		if (input) {
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		}
	},
	handleBlur: function () {
		this.setState({url: this.props.url});
		this.props.onExit();
	},
	handleKeyDown: function (e) {
		if (e.which === ESCAPE_KEY) {
			this.handleBlur();
		} else if (e.which === ENTER_KEY) {			
			if (isValidBeaconURL(this.state.url)) {
				this.props.onExit(this.state.url);
			} else {
				alert('Input URL is invalid Beacon URL.\n\nIt must be started with http/s and under length of 18');
			}
		}
	},
	handleChange: function (e) {
		this.setState({url: e.target.value});
	},
	hide: function () {
		this.setState({show: false});
	},
	show: function () {
		this.setState({
			show: true,
			url: this.props.url
		});
	},
	render: function() {
		var view = (<div></div>);
		if (this.state.show) {
		view = (
			<div className="config-panel" key="1" onClick={this.onBlur}>
			<label>URL for Advertising</label>
				<input style={{width: '15em'}}
					ref="urlInput"
					value={this.state.url}
					onBlur={this.handleBlur}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</div>
		);
	}

	return (
		<ReactCSSTransitionGroup transitionName="slide">
		{view}
		</ReactCSSTransitionGroup>
		);
	}
});