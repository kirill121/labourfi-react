const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployerSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	companyname: {
		type: String
	},
	employments: {
		type: Schema.Types.ObjectId,
		ref: 'employees'
	},
	pastemployment: {
		type: Schema.Types.ObjectId,
		ref: 'employees'
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Employer = mongoose.model('employers', EmployerSchema);