const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const route = require('./routes');
var cors = require('cors')
// const sensor = require('./app/controllers/models/Sensor')
const mqtt = require('./app/config/mqtt')
app.use(bodyParser.json())
app.use(cors())
const mqttClient = mqtt.mqttClient
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
mqtt.connect()
mqtt.message()


app.use(morgan('combined'))

app.use((req, res, next) => {
    // Publish messages
    req.mqttPublish = function (topic, message) {
        mqttClient.publish(topic, message)
    }

    // Subscribe to topic
    req.mqttSubscribe = function (topic, callback) {
        mqttClient.subscribe(topic)
        mqttClient.on('message', function (t, m) {
            if (t === topic) {
                callback(m.toString())
            }
        })
    }
    next()
})
route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));