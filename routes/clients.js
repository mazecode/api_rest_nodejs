"use strict"

var express = require('express');
var router = express.Router();


var clientModel = require('../models/client');

// ALL
router.get('/', (req, res, next) => {
	clientModel.all((error, responseData) => {
		if (error) {
			res.status(500);
			res.send(JSON.stringify({
				"data": null,
				"error": req.app.get('env') === 'development' ? error : true,
				"statusCode": 500,
				"statusText ": "Internal Server Error",
			}));
		} else {
			res.status(200);
			res.send(JSON.stringify({
				"data": responseData,
				"error": false,
				"statusCode": 200,
				"statusText ": "OK",
			}));
		}
		return;
	}).catch((e) => {
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

	clientModel.get(id, (error, responseData) => {
		if (error) {
			res.status(500);
			res.send(JSON.stringify({
				"data": null,
				"error": req.app.get('env') === 'development' ? error : true,
				"statusCode": 500,
				"statusText ": "Internal Server Error",
			}));
		} else {
			var statusCode = 200,
				statusText = "OK";

			if (responseData.length == 0) {
				statusText = "No Content";
				statusCode = 400;
			}

			res.status(statusCode);
			res.send(JSON.stringify({
				"data": responseData,
				"error": false,
				"statusCode": statusCode,
				"statusText ": statusText,
			}));
		}
	}).catch((e) => {
		res.status(400);
		res.send(JSON.stringify({
			"data": null,
			"error": req.app.get('env') === 'development' ? e : true,
			"statusCode": 400,
			"statusText ": "Bad Request",
		}));
	});
});

router.post("/", async (req, res) => {
	var id = await clientModel.exists(req.body.email, async (error, responseData) => {
		if (error) {
			var err = new Error("Internal Server Error")
			err.status = 500;
			throw err;
		}

		return (responseData.length > 0 ? responseData[0].id : 0);
	}).catch((e) => {
		res.status(400);
		res.send(JSON.stringify({
			"data": null,
			"error": req.app.get('env') === 'development' ? e : true,
			"statusCode": 400,
			"statusText ": "Bad Request",
		}));
	});

	if (id > 0) {
		res.status(400);
		res.send(JSON.stringify({
			"data": null,
			"error": false,
			"statusCode": 400,
			"statusText ": "Duplicated",
		}));
		return;
	}

	await clientModel.add(req.body, async (error, responseData) => {
		if (error) {
			var err = new Error("Internal Server Error")
			err.status = 500;
			throw err;
		}

		if (responseData && responseData.insertId) {
			res.status(201);
			res.send(JSON.stringify({
				"data": responseData,
				"error": false,
				"statusCode": 201,
				"statusText ": "Created",
			}));
		} else {
			res.status(200);
			res.send(JSON.stringify({
				"data": null,
				"error": req.app.get('env') === 'development' ? error : true,
				"statusCode": 500,
				"statusText ": "Internal Server Error",
			}));
		}
	}).catch((e) => {
		res.status(400);
		res.send(JSON.stringify({
			"data": null,
			"error": req.app.get('env') === 'development' ? e : true,
			"statusCode": 400,
			"statusText ": "Bad Request",
		}));
	});

});
module.exports = router;
