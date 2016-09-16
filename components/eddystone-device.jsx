'use strict';
const React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="beacon-device">
				<div className="beacon-config" onClick={this.props.onClickConfig}></div>
			</div>
		);
  }
});
