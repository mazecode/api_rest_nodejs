"use strict"

const CONFIG = require('./config/config');

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var clients = require('./routes/clients');
var orders = require('./routes/orders');
var phones = require('./routes/phones');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.disable('etag');

var mysql = require('mysql');

//Database connection
app.use((req, res, next) => {
	global.connection = mysql.createConnection({
		host: CONFIG.db_host,
		port: CONFIG.db_port,
		user: CONFIG.db_user,
		password: CONFIG.db_password,
		database: CONFIG.db_name,
		insecureAuth: true
	});
	connection.connect();
	next();
});

app.use((req, res, next) => {
	res.header('Content-Type', 'application/json');
	next();
});

// Routes
app.use('/', index);
app.use('/api/v1/clients', clients);
app.use('/api/v1/orders', orders);
app.use('/api/v1/phones', phones);


// Set default Content-Type
app.use((req, res, next) => {
	res.header('Content-Type', 'application/json');
	next();
});

//Catch
// app.use((req, res, next) => {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// Error Handler
app.use((err, req, res, next) => {
	// console.error(err.stack);
	res.setHeader("Content-Type", "application/json");
	res.status( err.status || 500).send(JSON.stringify({
		"data": null,
		"error": req.app.get('env') === 'development' ? err : true,
		"message": "",
		"statusCode": err.status || 500,
		"statusText ": err.message || "Internal Server Error",
	}));
});

module.exports = app;
