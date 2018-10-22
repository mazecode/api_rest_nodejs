"use strict"

var express = require('express');
var router = express.Router();

var clientModel = require('../models/client');
var phoneModel = require('../models/phone');
var orderModel = require('../models/order');

router.post('/', async (req, res, next) => {
	var email = req.body.email;
	var phonesList = req.body.phones;

	var client_id = await clientModel.exists(email, async (error, data) => {
		if (error) {
			res.send(JSON.stringify({
				"data": null,
				"error": true,
				"statusCode": 500,
				"statusText ": "Internal Server Error",
			}));
			res.next();
			return;
		}

		let id = 0;

		if (data.length == 0) {
			let d = {
				"name": req.body.name,
				"surname": req.body.surname,
				"email": req.body.email
			};
			id = await clientModel.add(d, async (error, data) => {
				res.send(JSON.stringify({
					"data": null,
					"error": req.app.get('env') === 'development' ? error : true,
					"statusCode": 500,
					"statusText ": "Internal Server Error",
				}));
				res.next();

				return data.insertId
			});
		} else {
			id = data[0].id;
		}

		return Number(id);
	}).catch(function (e) {
		res.status(400);
		res.send(JSON.stringify({
			"data": null,
			"error": req.app.get('env') === 'development' ? e : true,
			"statusCode": 400,
			"statusText ": "Bad Request",
		}));
	});

	var client = await clientModel.get(client_id, async (error, data) => {
		if (error) {
			res.send(JSON.stringify({
				"data": null,
				"error": req.app.get('env') === 'development' ? error : true,
				"statusCode": 500,
				"statusText ": "Internal Server Error",
			}));
			res.next();
			return;
		}

		return data[0];
	});

	// Check if phones exists
	var list = [];
	var totalPrice = 0;

	for (let phone_id of phonesList.split(',')) {
		let phone = await phoneModel.get(phone_id, async (error, data) => {
			if (error) {
				res.send(JSON.stringify({
					"data": null,
					"error": req.app.get('env') === 'development' ? error : true,
					"statusCode": 500,
					"statusText": "Internal Server Error",
				}));
				res.next();
				return;
			}

			if (data.length > 0) {
				totalPrice = await Number(totalPrice + data[0].price);
				return data[0];
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

		if (phone) list.push(phone);
	}

	let d = {
		"clients_id": client_id,
		"phones_id": JSON.stringify({
			list
		}),
		"total": totalPrice,
	};

	var order_id = await orderModel.add(d, async (error, data) => {
		if (error) {
			res.send(JSON.stringify({
				"data": null,
				"error": req.app.get('env') === 'development' ? error : true,
				"statusCode": 500,
				"statusText": "Internal Server Error",
			}));
			res.next();
			return;
		}

		return data.insertId
	}).catch(function (e) {
		res.status(400);
		res.send(JSON.stringify({
			"data": null,
			"error": req.app.get('env') === 'development' ? e : true,
			"statusCode": 400,
			"statusText ": "Bad Request",
		}));
	});

	await res.status(201).send(JSON.stringify({
		'data': {
			'order_number': order_id,
			'total_price': totalPrice,
			'client': client,
			'phones': list,
		},
		"error": false,
		'statusCode': 201,
		'statusText': 'OK'
	}));
});

module.exports = router;
