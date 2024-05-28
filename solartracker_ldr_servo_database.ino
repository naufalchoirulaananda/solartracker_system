#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ESP32Servo.h>

Servo servohorizontal;      // horizontal servo (BOTTOM SERVO)
int servoh = 90;            // assign servo to 90 degrees initially
int servohLimitHigh = 180;  // maximum range of servo is 180 degrees
int servohLimitLow = 0;    // minimum range of servo is 10 degrees
int servohTarget = servoh;  // initialize target position same as current position

Servo servovertical;  // vertical servo (TOP SERVO)
int servov = 45;
int servovLimitHigh = 180;
int servovLimitLow = 0;
int servovTarget = servov;  // initialize target position same as current position

int ldrtopright = 33;     // top right
int ldrtopleft = 32;      // top left
int ldrbottomright = 34;  // bottom right
int ldrbottomleft = 35;   // bottom left

unsigned long previousMillis = 0;
const long interval = 50;  // Interval time to update servo position (ms)
unsigned long previousSendMillis = 0;
const long sendInterval = 1000;  // Interval to send data to the server (10 seconds)
const int threshold = 10;

const char* ssid = "spontan.";
const char* password = "uuuhhhuuuyyy";

// Supabase Configuration
String API_URL = "https://tmvdvbpylkwblogfyuhv.supabase.co";
String API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdmR2YnB5bGt3YmxvZ2Z5dWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NzY3MTQsImV4cCI6MjAyOTM1MjcxNH0.exGoE9qPBLbI-FsEIo_DrueQAVlzUVyYztWaYTF8rk8";
String TableName = "trackerdata";
const int httpsPort = 443;

WiFiClientSecure client;
HTTPClient https;

void setup() {
  Serial.begin(115200);

  servohorizontal.attach(21);  // horizontal servo
  servohorizontal.write(servoh);

  servovertical.attach(19);  // vertical servo
  servovertical.write(servov);

  delay(1000);  // Initial delay for stabilization

  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  client.setInsecure();
}

void loop() {
  unsigned long currentMillis = millis();

  // Servo control logic
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    int topleft = analogRead(ldrtopleft);
    int topright = analogRead(ldrtopright);
    int bottomleft = analogRead(ldrbottomleft);
    int bottomright = analogRead(ldrbottomright);

    int avgtop = (topleft + topright) / 2;
    int avgbot = (bottomleft + bottomright) / 2;
    int avgleft = (topleft + bottomleft) / 2;
    int avgright = (topright + bottomright) / 2;

    // Vertical servo control
    if (avgtop < avgbot && servov > servovLimitLow) {
      servovTarget = servov - 5;  // decrease servo position by 5 degrees
    } else if (avgbot < avgtop && servov < servovLimitHigh) {
      servovTarget = servov + 5;  // increase servo position by 5 degrees
    }

    // Horizontal servo control
    if (avgleft > avgright && servoh > servohLimitLow) {
      servohTarget = servoh - 5;  // decrease servo position by 5 degrees
    } else if (avgright > avgleft && servoh < servohLimitHigh) {
      servohTarget = servoh + 5;  // increase servo position by 5 degrees
    }

    // Vertical servo movement
    int deltaV = abs(servov - servovTarget);  // Calculate the difference between current position and target position
    int stepV = 1;                            // Define the step size for vertical servo movement

    if (deltaV > stepV) {
      if (servov < servovTarget) {
        servov += stepV;  // Move servo up
      } else {
        servov -= stepV;  // Move servo down
      }
      servovertical.write(servov);  // Write new position to servo
    } else if (deltaV > 0) {
      servov = servovTarget;        // Set servo position to target position
      servovertical.write(servov);  // Write new position to servo
    }

    // Horizontal servo movement
    int deltaH = abs(servoh - servohTarget);  // Calculate the difference between current position and target position
    int stepH = 1;                            // Define the step size for horizontal servo movement

    if (deltaH > stepH) {
      if (servoh < servohTarget) {
        servoh += stepH;  // Move servo right
      } else {
        servoh -= stepH;  // Move servo left
      }
      servohorizontal.write(servoh);  // Write new position to servo
    } else if (deltaH > 0) {
      servoh = servohTarget;          // Set servo position to target position
      servohorizontal.write(servoh);  // Write new position to servo
    }
  }

  // Send data to server at the defined interval
  if (currentMillis - previousSendMillis >= sendInterval) {
    previousSendMillis = currentMillis;

    if (WiFi.status() == WL_CONNECTED) {
      int topleft = analogRead(ldrtopleft);
      int topright = analogRead(ldrtopright);
      int bottomleft = analogRead(ldrbottomleft);
      int bottomright = analogRead(ldrbottomright);

      // Send data to server
      https.begin(client, API_URL + "/rest/v1/" + TableName);
      https.addHeader("Content-Type", "application/json");
      https.addHeader("Prefer", "return=representation");
      https.addHeader("apikey", API_KEY);
      https.addHeader("Authorization", "Bearer " + API_KEY);

      String payload = "{\"topleft\":" + String(topleft) + ",\"topright\":" + String(topright) + ",\"bottomleft\":" + String(bottomleft) + ",\"bottomright\":" + String(bottomright) + "}";
      int httpCode = https.POST(payload);
      Serial.println(httpCode);  // Print HTTP return code
      Serial.println(https.getString());  // Print request response payload
      https.end();
    } else {
      Serial.println("Error in WiFi connection");
    }
  }
}
