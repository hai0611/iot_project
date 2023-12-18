#ifdef ESP8266
#include <ESP8266WiFi.h>
#else
#include <WiFi.h>
#endif
#include <stdlib.h>  
#include "DHTesp.h"
#include <ArduinoJson.h>
#include <PubSubClient.h>
#include <WiFiClientSecure.h>

/**** DHT11 sensor Settings *******/
#define DHTpin 14  //Set DHT pin as GPI014 - D5
#define mqtt_topic_pub "sensor"
#define mqtt_topic_sub "led_state"
DHTesp dht;

/**** LED Settings *******/
const int led1 = 5;  //Set LED pin as GPIO5 - D1
const int led3 = 16;  //Set LED pin as GPIO4 - D2
const int led2 = 4;  //Set LED pin as GPIO4 - D2
boolean stled1 = false;
boolean stled2 = false;
boolean stled3 = false;


/****** WiFi Connection Details *******/
// const char* ssid = "PTIT+HAU";
// const char* password = "hoilamgi";
const char* ssid = "drake_harvey_0611";
const char* password = "06112002";
/******* MQTT Broker Connection Details *******/
const char* mqtt_server = "bd4d15b9f7f04da09a44009bfa8643e1.s1.eu.hivemq.cloud";
const char* mqtt_username = "traianthai";
const char* mqtt_password = "Manhzxcv@123";
const int mqtt_port = 8883;

/**** Secure WiFi Connectivity Initialisation *****/
WiFiClientSecure espClient;

/**** MQTT Client Initialisation Using WiFi Connection *****/
PubSubClient client(espClient);

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];

static const char* root_ca PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY
MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJHP0FDfzm54rVygc
h77ct984kIxuPOZXoHj3dcKi/vVqbvYATyjb3miGbESTtrFj/RQSa78f0uoxmyF+
0TM8ukj13Xnfs7j/EvEhmkvBioZxaUpmZmyPfjxwv60pIgbz5MDmgK7iS4+3mX6U
A5/TR5d8mUgjU+g4rk8Kb4Mu0UlXjIB0ttov0DiNewNwIRt18jA8+o+u3dpjq+sW
T8KOEUt+zwvo/7V3LvSye0rgTBIlDHCNAymg4VMk7BPZ7hm/ELNKjD+Jo2FR3qyH
B5T0Y3HsLuJvW5iB4YlcNHlsdu87kGJ55tukmi8mxdAQ4Q7e2RCOFvu396j3x+UC
B5iPNgiV5+I3lg02dZ77DnKxHZu8A/lJBdiB3QW0KtZB6awBdpUKD9jf1b0SHzUv
KBds0pjBqAlkd25HN7rOrFleaJ1/ctaJxQZBKT5ZPt0m9STJEadao0xAH0ahmbWn
OlFuhjuefXKnEgV4We0+UXgVCwOPjdAvBbI+e0ocS3MFEvzG6uBQE3xDk3SzynTn
jh8BCNAw1FtxNrQHusEwMFxIt4I7mKZ9YIqioymCzLq9gwQbooMDQaHWBfEbwrbw
qHyGO0aoSCqI3Haadr8faqU9GY/rOPNk3sgrDQoo//fb4hVC1CLQJ13hef4Y53CI
rU7m2Ys6xt0nUW7/vGT1M0NPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBR5tFnme7bl5AFzgAiIyBpY9umbbjANBgkq
hkiG9w0BAQsFAAOCAgEAVR9YqbyyqFDQDLHYGmkgJykIrGF1XIpu+ILlaS/V9lZL
ubhzEFnTIZd+50xx+7LSYK05qAvqFyFWhfFQDlnrzuBZ6brJFe+GnY+EgPbk6ZGQ
3BebYhtF8GaV0nxvwuo77x/Py9auJ/GpsMiu/X1+mvoiBOv/2X/qkSsisRcOj/KK
NFtY2PwByVS5uCbMiogziUwthDyC3+6WVwW6LLv3xLfHTjuCvjHIInNzktHCgKQ5
ORAzI4JMPJ+GslWYHb4phowim57iaztXOoJwTdwJx4nLCgdNbOhdjsnvzqvHu7Ur
TkXWStAmzOVyyghqpZXjFaH3pO3JLF+l+/+sKAIuvtd7u+Nxe5AW0wdeRlN8NwdC
jNPElpzVmbUq4JUagEiuTDkHzsxHpFKVK7q4+63SM1N95R1NbdWhscdCb+ZAJzVc
oyi3B43njTOQ5yOf+1CceWxG1bQVs5ZufpsMljq4Ui0/1lvh+wjChP4kqKOJ2qxq
4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA
mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d
emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=
-----END CERTIFICATE-----
)EOF";

/************* Connect to WiFi ***********/
void setup_wifi() {
  delay(10);
  Serial.print("\nConnecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);  // truy cập như một thiết bị kết nối wifi
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("\nWiFi connected\nIP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";  // Create a random client ID
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("connected");

      client.subscribe(mqtt_topic_sub);
      Serial.print("Subscribe to ");
      Serial.println(mqtt_topic_sub);  // subscribe the topics here

    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");  // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
float calculateResistance(int adcValue) {
  float supplyVoltage = 3.3;   
  float adcMaxValue = 1023.0;  
  float voltageAcrossSensor = (adcValue / adcMaxValue) * supplyVoltage;
  float currentThroughSensor = (supplyVoltage - voltageAcrossSensor) / 20000; 
  float sensorResistance = voltageAcrossSensor / currentThroughSensor;
  return sensorResistance;
}

void callback(char* topic, byte* payload, unsigned int length) {
  String incommingMessage = "";
  for (int i = 0; i < length; i++) incommingMessage += (char)payload[i];

  Serial.println("Message arrived [" + String(topic) + "]" + incommingMessage);
  //--- check the incomming message
  if (strcmp(topic, mqtt_topic_sub) == 0) {
    // Parse JSON object
    DynamicJsonDocument doc(1024);
    deserializeJson(doc, incommingMessage);
    int led_id = doc["led_id"];
    String status = doc["status"];
    // Decode JSON/Extract values
    Serial.print("Led id: ");
    Serial.print(led_id);
    Serial.println(" Status: " + status);
    if (led_id == 1) {
      if (status.equals("ON")) {
        stled1 = true;
        digitalWrite(led1, HIGH);  // Turn the LED1 on
      } else {
        stled1 = false;
        digitalWrite(led1, LOW);  // Turn the LED1 off
      }
    } else if (led_id == 2) {
      if (status.equals("ON")) {
        stled2 = true;
        digitalWrite(led2, HIGH);  // Turn the LED2 on
      } else {
        stled2 = false;
        digitalWrite(led2, LOW);
      }  // Turn the LED2 off
    } else if (led_id == 3) {
      if (status.equals("ON")) {
        stled3 = true;
        digitalWrite(led3, HIGH);  // Turn the LED2 on
      } else {
        stled3 = false;
        digitalWrite(led3, LOW);
      }  // Turn the LED2 off
    }
  }
}

void publishMessage(const char* topic, String payload, boolean retained) {
  if (client.publish(topic, payload.c_str(), true))
    Serial.println("[" + String(topic) + "]: " + payload);
}

void setup() {

  dht.setup(DHTpin, DHTesp::DHT11);  //Set up DHT11 sensor
  pinMode(led1, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led2, OUTPUT);  //set up LED
  Serial.begin(9600);
  // while (!Serial) delay(1);
  setup_wifi();

#ifdef ESP8266
  espClient.setInsecure();
#else
  espClient.setCACert(root_ca);  // enable this line and the the "certificate" code for secure connection
#endif

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) reconnect();  // check if client is connected
  client.loop();

  long now = millis();
  if (now - lastMsg > 4000) {
    //read DHT11 temperature and humidity reading
    // delay(dht.getMinimumSamplingPeriod()); // Thoi gian lay mau toi thieu
    int sensorValue = analogRead(A0);  // Đọc giá trị từ chân ADC (A0)
    float light = calculateResistance(sensorValue);
    float humidity = dht.getHumidity();
    float temperature = dht.getTemperature();
    int ran = rand() % 100;  
    lastMsg = now;
    DynamicJsonDocument doc(1024);
    doc["deviceId"] = "NodeMCU";
    doc["siteId"] = "Manh's Lab IOT";
    doc["humidity"] = humidity;
    doc["temperature"] = temperature;
    doc["light"] = light;
    doc["ran"] = ran;
    doc["led1"]["id"] = 1;
    doc["led1"]["status"] = stled1;
    doc["led2"]["id"] = 2;
    doc["led2"]["status"] = stled2;
    doc["led3"]["id"] = 3;
    doc["led3"]["status"] = stled3;
    char mqtt_message[256];
    serializeJson(doc, mqtt_message);
    publishMessage("esp8266_data", mqtt_message, true);
  }
}