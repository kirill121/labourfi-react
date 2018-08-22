const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateEmployerRegister = require('../../validation/employerregister');
const validateEmployerLogin = require('../../validation/employerlogin');

const Employer = require('../../models/Employers');

router.post('/registerEmployer', (req, res) => {
	const { errors, isValid } = validateEmployerRegister(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}

	Employer.findOne({ email: req.body.email }).then(user => {
		if(user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const newEmployer = new Employer({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				companyname: req.body.companyname
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newEmployer.password, salt, (err, hash) => {
					if(err) throw err;
					newEmployer.password = hash;
					newEmployer
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				})
			})	
		}
	})
});


router.post('/login', (req, res) => {
	const { errors, isValid } = validateEmployerLogin(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	Employer.findOne({ email })
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

module.exports = router;

