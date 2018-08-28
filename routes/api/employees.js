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

router.post('/loginee', (req, res) => {
	const { errors, isValid } = validateEmployeeLogin(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}

	const name = req.body.name;
	const password = req.body.password;

	Employee.findOne({ name })
		.then(user => {
			if(!user){
				errors.email = 'User not found';
				return res.status(404).json(errors)
			}

			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(isMatch) {
						const payload = { id: user.id, name: user.name }

						jwt.sign(
							payload,
							keys.secretOrKey,
							{ expiresIn: 14400 },
							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								});
						});
					} else {
						errors.password = 'Password incorrect';
						return res.status(400).json(errors)
					}
				})	
		})
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name
	});
});

module.exports = router;