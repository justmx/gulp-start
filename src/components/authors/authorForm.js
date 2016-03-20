'use strict';

var React = require('react');
var Input =require('../common/textInput');

var AuthorForm = React.createClass({
	propTypes: {
	    author: React.PropTypes.object.isRequired,
	    onSave: React.PropTypes.func.isRequired,
	    onChange: React.PropTypes.func.isRequired,
	    errors: React.PropTypes.object
	},
	render: function() {
		return ( 
		<div>
		  <h1>Manage Author</h1>
		    <form>
			<Input name ="firstName" 
					   label="First Name"
					   onChange={this.props.onChange}
					   value={this.props.author.firstName} 
					    error={this.props.errors.firstName} />
					   <br />
			<Input name ="lastName" 
					   label="Last Name"
					   onChange={this.props.onChange}
					   value={this.props.author.lastName}
					   error={this.props.errors.lastName}  />
							<br />

				<input type = "submit" className="btn btn-default"  value="Save" onClick={this.props.onSave} />
			
		  </form>
		  </div>
		);
	}
});

module.exports = AuthorForm;


 // <form>
	// 		<h1>Manage Author</h1>
		

	// 			<input type = "submit"
	// 				   className="btn btn-default" 
	// 				   value="Save" />
			
	// 	  </form>

// <Input name ="firstName" 
// 					   label="First Name"
// 					   onChange={this.props.onChange}
// 					   value={this.props.author.firstName} />
// 							<br />
// 				<Input name ="lastName" 
// 					   label="Last Name"
// 					   onChange={this.props.onChange}
// 					   value={this.props.author.lastName} />
// 							<br />

// 				<input type = "submit"
// 					   className="btn btn-default" 
// 					   value="Save" />