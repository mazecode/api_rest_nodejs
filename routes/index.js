"use strict"

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.send(JSON.stringify({
		"data": null,
		"message": "Demo API REST",
		"statusCode": 200,
		"statusText": "OK"
	}));
});

router.get('/api/v1', (req, res, next) => {
	res.send(JSON.stringify({
		"data": null,
		"message": "Demo API REST version 1.0.0",
		"statusCode": 200,
		"statusText": "OK"
	}));
});


module.exports = router;
