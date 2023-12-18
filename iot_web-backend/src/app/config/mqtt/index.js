const mqtt = require('mqtt');
const db = require('../../config/db/mysql')
const protocol = 'wss'
const host = 'bd4d15b9f7f04da09a44009bfa8643e1.s1.eu.hivemq.cloud'
const port = '8884'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `${protocol}://${host}:${port}/mqtt`
var arr = new Array('sensor', 'led','esp8266_data')



const mqttClient = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'manhzxcv',
    password: 'Manhzxcv@123',
    reconnectPeriod: 1000,
    rejectUnauthorized: true,
    // If the server is using a self-signed certificate, you need to pass the CA.
})

const con = db.connection
const Sensor = (sensor) => {
    this.id_sensor = sensor.id_sensor
    this.status = sensor.status
    this.time_update = sensor.time_update
}

function connect() {
    mqttClient.on('connect', () => {
        console.log('Connected to mqttbroker')
        arr.forEach((value, index) => {
            mqttClient.subscribe(`${value}`, (error) => {
                if (error) {
                    console.error('subscription failed', error)
                } else {
                    console.log(`subscribe to ${value}`)
                }
            })
        })
    })
    mqttClient.on('error', (error) => {
        console.error('connection failed', error)
    })
}

function message() {

    var sql_led = "INSERT INTO data_led (name,status,time_update) VALUES (?)";
    var sql_sensor = "INSERT INTO data_sensor (id_sensor,humidity,temperature,light,ran,time_update) VALUES (?)";
    

    mqttClient.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
        var json = "";
        var time = new Date();
        var str_time = time.toTimeString().split(' ')[0] + " ";
        if(time.getDate() < 10) {
            str_time += "0"+time.getDate()+"-";
        }else{
            str_time += time.getDate()+"-";
        }
        if(time.getMonth()<9){
            str_time += "0"+String(time.getMonth()+1)+"-"+time.getFullYear();
        }else{
            str_time += String(time.getMonth()+1)+"-"+time.getFullYear();

        }
        try{
            json = JSON.parse(payload.toString())
            localStorage.setItem("led1_status", json.led1.status)
            localStorage.setItem("led2_status", json.led2.status)
            localStorage.setItem("led3_status", json.led3.status)

            if (topic == 'esp8266_data') {
                var value_sensor = [json.deviceId.toString(), json.humidity,json.temperature, json.light,json.ran, str_time]
                con.query(sql_sensor, [value_sensor], function (err, result) {
                    if (err) throw err
                    console.log("Number of records inserted to data_sensor: " + result.affectedRows)
                });
            }
            if (topic == 'led') {
                var value_led = [json.name.toString(), json.status.toString(), str_time]
                con.query(sql_led, [value_led], function (err, result) {
                    if (err) throw err
                    console.log("Number of records inserted to data_led: " + result.affectedRows)
                });
            }
        }catch(err){
            console.log(err)
        }
    })
}

function reconnect() {
    mqttClient.on('reconnect', (error) => {
        console.error('reconnect failed', error)
    })
}



module.exports = { connect, message, reconnect, mqttClient }