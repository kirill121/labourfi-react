const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLogin(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if(Validator.isEmpty(data.name)) {
		errors.email = 'Name field is required';
	}

	if(Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}