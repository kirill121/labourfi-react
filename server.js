const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const employers = require('./routes/api/employers');
const employees = require('./routes/api/employees');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//db
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Server connected'))
	.catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.use('/api/employers', employers);
app.use('/api/employees', employees);

app.listen(port, () => console.log(`Server is running on port ${port}`))
