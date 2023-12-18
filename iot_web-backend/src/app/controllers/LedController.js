const db = require('../config/db/mysql')

class NewsController {
    list(req, res){
        var sql = "SELECT * FROM iot.data_led;";
        db.connection.query(sql, function (err, result) {
            if (err) {
                res.status(404).send('Not found');
            }else{
                res.status(200).send(result);
            }
        });
    }
    list_status(req, res){
        res.send(`{"led1": ${localStorage.getItem('led1_status')},"led2": ${localStorage.getItem('led2_status')},"led3": ${localStorage.getItem('led3_status')}}`)
    }
    turn_on(req, res){
        var param = req.params;
        const time = new Date();
        const str_time = time.toTimeString().split(' ')[0] + " "+  time.getDate()+"-"+String(time.getMonth()+1)+"-"+time.getFullYear();
        req.mqttPublish('led_state', `{led_id: ${param.id}, status: "ON"}`)
        var sql = `INSERT INTO data_led (name, time_update, status) VALUES ('led_id ${param.id}', '${str_time}', 'ON');`;
        db.connection.query(sql, function (err, result) {
            if (err) {
                res.status(404).send('Error');
            }else{
                res.status(200).send('turn on led');
            }
        });
    }

    turn_off(req, res){
        var param = req.params;
        const time = new Date();       
        const str_time = time.toTimeString().split(' ')[0] + " "+  time.getDate()+"-"+String(time.getMonth()+1)+"-"+time.getFullYear();

        console.log(param.id)
        req.mqttPublish('led_state', `{led_id: ${param.id}, status: "OFF"}`)
        var sql = `INSERT INTO data_led (name, time_update, status) VALUES ('led_id ${param.id}', '${str_time}', 'OFF');`;
        db.connection.query(sql, function (err, result) {
            if (err) {
                res.status(404).send('Error');
            }else{
                res.status(200).send('turn off led');
            }
        });
    }

    dem(req,res){
        
        var sql = `INSERT INTO data_led (name, time_update, status) VALUES ('led_id ${param.id}', '${str_time}', 'OFF');`;
        db.connection.query(sql, function (err, result) {
            if (err) {
                res.status(404).send('Error');
            }else{
                res.status(200).send('turn off led');
            }
        });
    }
}

module.exports =  new NewsController;