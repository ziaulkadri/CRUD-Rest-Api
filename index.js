const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const User = require('./models/user');
const userRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE');
	next();
});

app.get('/', (req, res, next) => {
	res.send('Hello, world!');
});

//crud routes

app.use('./users', userRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ message: message });
});

//sync database

sequelize
	.sync()
	.then((result) => {
		console.log('database connected');
		app.listen(3000);
	})
	.catch((err) => console.log(err));
