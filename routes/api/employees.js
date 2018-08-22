const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateEmployeeRegister = require('../../validation/employeeregister');
const validateEmployeeLogin = require('../../validation/employeelogin');

const Employee = require('../../models/Employees');

router.post('/registerEmployee', (req, res) => {
	const { errors, isValid } = validateEmployeeRegister(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}

	Employee.findOne({ email: req.body.email }).then(user => {
		if(user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const newEmployee = new Employee({
				name: req.body.name,
				password: req.body.password,
				labourtype: req.body.labourtype,
				telephonenumber: req.body.telephonenumber
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newEmployee.password, salt, (err, hash) => {
					if(err) throw err;
					newEmployee.password = hash;
					newEmployee
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				})
			})			
		}
	})
});

module.exports = router;