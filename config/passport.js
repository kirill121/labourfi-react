const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Employer = mongoose.model('employers');
const Employee = mongoose.model('employees');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		Employer.findById(jwt_payload.id)
			.then(user => {
				if(user){
					return done(null, user);
				}
				return done(null, false);
			})
			.catch(err => console.log(err));
		Employee.findById(jwt_payload.id)
			.then(user => {
				if(user){
					return done(null, user);
				}
				return done(null, false);
			})
			.catch(err => console.log(err));	
	}));
}