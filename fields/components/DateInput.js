var React = require('react'),
	Pikaday = require('pikaday'),
	moment = require('moment-timezone');

module.exports = React.createClass({
	
	displayName: 'DateInput',
	
	// set default properties
	getDefaultProps: function() {
		return {
			format: 'YYYY-MM-DD'
		};
	},
	
	getInitialState: function() {
		moment.tz.setDefault(this.props.timezone);
		return {
			value: this.props.value,
			id: Math.round(Math.random() * 100000)
		};
	},
	
	componentWillReceiveProps: function(newProps) {
		if (newProps.value === this.state.value) return;
		this.setState({
			value: newProps.value
		});
		this.picker.setMoment(moment(newProps.value, this.props.format), true);
	},

	componentDidMount: function() {
		// add date picker
		this.picker = new Pikaday({ 
			field: this.getDOMNode(),
			format: this.props.format,
			yearRange: this.props.yearRange,
			onSelect: function(date) {//eslint-disable-line no-unused-vars
				if (this.props.onChange && this.picker.toString() !== this.props.value) {
					this.props.onChange(this.picker.toString());
				}
			}.bind(this)
		});			
	},

	componentWillUnmount: function() {
		// clean up
		this.picker.destroy();
	},
	
	handleChange: function(e) {
		if (e.target.value === this.state.value) return;
		this.setState({ value: e.target.value });
	},
	
	handleBlur: function(e) {//eslint-disable-line no-unused-vars
		if (this.state.value === this.props.value) return;
		this.picker.setMoment(moment(this.state.value, this.props.format));
	},

	render: function() {
		return <input type="text" name={this.props.name} value={this.state.value} placeholder={this.props.format} onChange={this.handleChange} onBlur={this.handleBlur} autoComplete="off" className="form-control" />;
	}
	
});
