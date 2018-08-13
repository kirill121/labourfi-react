const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//db
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Server connected'))
	.catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`))
