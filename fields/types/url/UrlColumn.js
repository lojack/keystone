import React from 'react';
import ItemsTableCell from '../../../admin/src/components/ItemsTableCell';
import ItemsTableValue from '../../../admin/src/components/ItemsTableValue';

var UrlColumn = React.createClass({
	displayName: 'UrlColumn',
	propTypes: {
		col: React.PropTypes.object,
		data: React.PropTypes.object,
	},
	renderValue () {
		var value = this.props.data.fields[this.props.col.path];
		if (!value) return;

		// if the value doesn't start with a prototcol, assume http for the href
		var href = value;
		if (href && !/^(mailto\:)|(\w+\:\/\/)/.test(href)) {
			href = 'http://' + value;
		}

		// strip the protocol from the link if it's http(s)
		var label = value.replace(/^https?\:\/\//i, '');

		return (
			<ItemsTableValue href={href} padded exterior field={this.props.col.type}>
				{label}
			</ItemsTableValue>
		);
	},
	render () {
		let value = this.props.data.fields[this.props.col.path];
		return (
			<ItemsTableCell>
				{this.renderValue()}
			</ItemsTableCell>
		);
	}
});

module.exports = UrlColumn;
