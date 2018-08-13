const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	labourtype: {
		type: String,
		required: true
	},
	telephonenumber: {
		type: Number,
		required: true
	},
	employer: {
		type: Schema.Types.ObjectId,
		ref: 'employers'
	},
	ratings: [
		{
			employer: {
				type: Schema.Types.ObjectId,
				ref: 'employers'
			}
		}
	],
	rating: {
		type: Number
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Employee = mongoose.model('employees', EmployeeSchema)