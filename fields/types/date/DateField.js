var _ = require('underscore'),
	React = require('react'),
	cx = require('classnames'),
	PureRenderMixin = require('react/addons').PureRenderMixin,
	DateTimePicker = require('react-widgets').DateTimePicker,
	moment = require('moment'),
	Field = require('../Field');

module.exports = Field.create({

	mixins: [PureRenderMixin],
	
	focusTargetRef: 'datePicker',

	inputFormat: 'yyyy-MM-dd',

	getDefaultProps: function() {
		return { 
			formatString: 'Do MMM YYYY'
		};
	},

	_change: function(newValue) {
		this.props.onChange({
			path: this.props.path,
			value: newValue === null ? newValue : newValue.toISOString()
		});
	},

	_today: function(event) {
		var today = moment().toDate();
		this._change(today);
	},

	renderValue: function() {
		var value = this.props.value ? moment(this.props.value).format(this.props.formatString) : 'No Date';
		return <div className="field-value">{value}</div>;
	},
	
	renderField: function() {
		var value = this.props.value ? moment(this.props.value).toDate() : null;
		return (
			<div ref="wrapper">
				<input type="hidden" ref="value" name={this.props.path} value={this.props.value} />
				<DateTimePicker ref="datePicker" value={value} format={this.inputFormat} onChange={this._change} time={false} />
					<button type="button" className="btn btn-default btn-set-today" onClick={this._today}>Today</button>
			</div>
		);
	},
	
	renderUI: function() {
		var wrapperClassName = cx('field', 'field-type-' + this.props.type, this.props.className, { 'field-has-label': this.props.label });
		var fieldClassName = cx('field-ui', 'field-size-small');
		return (
			<div className={wrapperClassName}>
				{this.renderLabel()}
				<div className={fieldClassName}>
					{this.shouldRenderField() ? this.renderField() : this.renderValue()}
					{this.renderNote()}
				</div>
			</div>
		);
	}
});
