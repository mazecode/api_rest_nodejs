"use strict"

var model = {};

//obtenemos todos los usuarios
model.all = callback => {
	if (connection) {
		return new Promise((resolve, reject) => {
			connection.query('SELECT name, surname, created_at FROM clients', (error, rows, fields) => {
				if (error) {
					reject(error);
				} else {
					resolve(callback(null, rows));
				}
			});
		});
	}
}

//obtenemos un usuario por su id
model.get = (id, callback) => {
	if (connection) {
		var id = Number(id);

		if (isNaN(id)) {
			var err = new Error('Incorrect parameter value');
			err.status = 404;
			throw err;
		}

		var sql = `SELECT name, surname, created_at FROM clients WHERE id = ${connection.escape(id)}`;

		return new Promise((resolve, reject) => {
			connection.query(sql, (error, row) => {
				if (error) {
					reject(error);
				} else {
					resolve(callback(null, row));
				}
			});
		});
	}
}

//obtenemos un usuario por su id
model.exists = (email, callback) => {
	if (connection) {
		var sql = `SELECT id FROM clients WHERE email LIKE ${connection.escape('%' + email + '%')}`;

		return new Promise((resolve, reject) => {
			connection.query(sql, (error, row) => {
				if (error) {
					reject(error);
				} else {
					resolve(callback(null, row));
				}
			});
		});
	}
}

model.add = (data, callback) => {
	if (connection) {
		return new Promise((resolve, reject) => {
			connection.query('INSERT INTO clients SET ?', data, async (error, result) => {
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
