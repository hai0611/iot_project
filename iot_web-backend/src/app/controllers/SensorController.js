const db = require('../config/db/mysql')


class SensorController {

    getall(req, res) {
        var sql = "SELECT * FROM data_sensor";
        db.connection.query(sql, function (err, result) {
            if (err) {
                res.status(404).send('Not found');
            } else {
                res.send(result);
            }
        });
    }
    getonce(req, res) {
        var sql = "select *from data_sensor ORDER BY id DESC LIMIT 1;";
        db.connection.query(sql, function (err, result) {
            if (err) {
                res.status(404).send('Not found');
            } else {
                res.send(result);
            }
        });
    }
    getday(req, res) {
        var sql = "select *from data_sensor ORDER BY id DESC LIMIT 255;";
        db.connection.query(sql, function (err, result) {
            if (err) {
                res.status(404).send('Not found');
            } else {
                res.send(result);
            }
        });

    }
    shutdown(req, res) {
        req.mqttPublish('test', 'Hello MQTT in home')
        console.log(req.body)
        res.send('MQTT is working!')
    }
}

module.exports = new SensorController;