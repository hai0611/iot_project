const db = require('../../config/db/mysql')

const Sensor = (sensor) => {
    this.id = sensor.id
    this.id_sensor = sensor.id_sensor
    this.status = sensor.status
    this.time_update = sensor.time_update
}

Sensor.getAll = (result) => {
    var sql = "SELECT * FROM data_sensor";
    db.query(sql, function (err, sensor) {
        if (err) {
            result(sensor)
        }else{
            result(sensor)
        }
    });
}

module.exports = Sensor;