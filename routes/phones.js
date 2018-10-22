'use strict'

var express = require('express');
var router = express.Router();

var phoneModel = require('../models/phone');

// ALL
router.get("/", (req, res, next) => {
	phoneModel.all((error, data) => {
		if (error) {
			res.send(JSON.stringify({
				"data": null,
				"error": req.app.get('env') === 'development' ? error : true,
				"statusCode": 500,
				"statusText ": "Internal Server Error",
			}));
		} else {
			res.send(JSON.stringify({
				"data": data,
				"error": false,
				"statusCode": 200,
				"statusText ": "OK",
			}));
		}
	}).catch(function (e) {
		res.status(400);
		res.send(JSON.stringify({
			"data": null,
			"error": req.app.get('env') === 'development' ? e : true,
			"statusCode": 400,
			"statusText ": "Bad Request",
		}));
	});
});

// GET
router.get('/:id', (req, res, next) => {
	var id = Number(req.params.id);

	if (isNaN(id)) {
		var err = new Error('Incorrect parameter value');
		err.status = 404;
		throw err;
	}

	phoneModel.get(id, (error, data) => {
		if (error) {
			res.send(JSON.stringify({
				"data": null,
				"error": req.app.get('env') === 'development' ? error : true,
				"statusCode": 500,
				"statusText ": "Internal Server Error",
			}));
		} else {
			var statusCode = 200,
				statusText = "OK";

			if (data.length == 0) {
				statusText = "No Content";
				statusCode = 204;

				if (req.app.get('env') === 'development') res.status(204);
			}

			res.send(JSON.stringify({
				"data": data,
				"error": false,
				"statusCode": statusCode,
				"statusText ": statusText,
			}));
		}
	}).catch(function (e) {
		res.status(400);
		res.send(JSON.stringify({
			"data": null,
			"error": req.app.get('env') === 'development' ? e : true,
			"statusCode": 400,
			"statusText ": "Bad Request",
		}));
	});
});
		
// INSERT INTO api_rest.phones (name, description, price, client_id) VALUES (':name', ':description', ':price', ':client_id');

module.exports = router;
