"use strict"

var model = {};

model.add = (data, callback) => {
	if (connection) {
		return new Promise((resolve, reject) => {
			connection.query('INSERT INTO orders SET ?', data, async (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(callback(null, {
						"insertId": result.insertId
					}));
				}
			});
		});
	}
}

module.exports = model;
