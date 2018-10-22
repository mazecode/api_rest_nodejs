"use strict"

var model = {};

//obtenemos todos los usuarios
model.all = (callback) => {
    if (connection) {
        return new Promise(function (resolve, reject) {
            connection.query('SELECT name, description, image, price, created_at FROM phones', (error, rows, fields) => {
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

        var sql = `SELECT name, description, image, price, created_at FROM phones WHERE id = ${connection.escape(id)}`;

        return new Promise(function (resolve, reject) {
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


//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = model;
