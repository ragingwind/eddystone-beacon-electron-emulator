'use strict';
const React = require('react');
const ReactAddon = require('react/addons');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="beacon-device">
				<div className="beacon-config" onClick={this.props.onClickConfig}></div>
			</div>
		);
  }
});
