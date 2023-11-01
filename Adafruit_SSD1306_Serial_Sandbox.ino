
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define SCREEN_WIDTH 128   // OLED display width, in pixels
#define SCREEN_HEIGHT 64   // OLED display height, in pixels
#define SDA_PIN 14         // D6 = GPIO14
#define SCL_PIN 12         // D5 = GPIO12
#define OLED_ADDRESS 0x3C  // I2C address of your SSD1306 display
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_ADDRESS);
bool invert = false;
void setup() {
  Serial.begin(9600);
  Wire.begin(SDA_PIN, SCL_PIN);
  display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS);
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.clearDisplay();
  display.display();
}
void loop() {
  if (Serial.available() > 0) {
    char delimiter = '\n';  // The delimiter character (change as needed)
    String data = Serial.readStringUntil(delimiter);
    String dataCommand = data;
    Serial.println("-" + dataCommand);
    if (data.length() > 0) {
      String type = data.substring(0, 2);
      data.remove(0, 2);
      if (type == "dp" || type == "DP" || type == "Dp" || type == "dP") {
        int x, y, c;
        int numValues = sscanf(data.c_str(), "%d,%d,%d", &x, &y, &c);
        dp(x, y, c);
        Serial.println("Drawing pixel X:" + String(x) + ", Y:" + String(y) + ", color: " + String(c));
      }
      if (type == "dc" || type == "DC" || type == "Dc" || type == "dC") {
        int x, y, r, c;
        int numValues = sscanf(data.c_str(), "%d,%d,%d,%d", &x, &y, &r, &c);
        dc(x, y, r, c);
        Serial.println("Drawing circle X:" + String(x) + ", Y:" + String(y) + ", radius: " + String(r) + ", color: " + String(c));
      }
      if (type == "dr" || type == "DR" || type == "Dr" || type == "dR") {
        int x, y, w, h, r, c;
        int numValues = sscanf(data.c_str(), "%d,%d,%d,%d,%d,%d", &x, &y, &w, &h, &r, &c);
        dr(x, y, w, h, r, c);
        Serial.println("Drawing rectangle X:" + String(x) + ", Y:" + String(y) + ", width: " + String(w) + ", height: " + String(h) + ", radius: " + String(r) + ", color: " + String(c));
      }
      if (type == "dl" || type == "DL" || type == "Dl" || type == "dL") {
        int x, y, x2, y2, c;
        int numValues = sscanf(data.c_str(), "%d,%d,%d,%d,%d,%d", &x, &y, &x2, &y2, &c);
        dl(x, y, x2, y2, c);
        Serial.println("Drawing rectangle X:" + String(x) + ", Y:" + String(y) + ", X2: " + String(x2) + ", Y2: " + String(y2) + ", color: " + String(c));
      }
      if (type == "cd" || type == "CD" || type == "Cd" || type == "cD") {
        cd();
        Serial.println("Clear display");
      }
      if (type == "id" || type == "ID" || type == "Id" || type == "iD") {
        id();
        Serial.println("Invert display");
      }
      if (type == "nl" || type == "NL" || type == "Nl" || type == "nL") {
        nl();
        Serial.println("Newline");
      }
      if (type == "ct" || type == "CT" || type == "cT" || type == "Ct") {
        ct(data);
        Serial.println("Continue text:" + data);
      }
      if (type == "nt" || type == "NT" || type == "Nt" || type == "nT") {
        int x, y, c, tz;
        int numValues = sscanf(data.c_str(), "%d,%d,%d,%d,%d,%d", &x, &y, &c, &tz);
        int firstComma = data.indexOf(',');
        int secondComma = data.indexOf(',', firstComma + 1);
        int thirdComma = data.indexOf(',', secondComma + 1);
        data.remove(0, (thirdComma + 2));
        nt(x, y, c, tz, data);
        Serial.println("Print text with /nl:" + String(x) + ", Y:" + String(y) + ", color: " + String(c) + ", size: " + String(tz) + ",Text: " + data);
      }
      if (type == "pt" || type == "PT" || type == "pT" || type == "Pt") {
        int x, y, c, tz;
        int numValues = sscanf(data.c_str(), "%d,%d,%d,%d,%d,%d", &x, &y, &c, &tz);
        int firstComma = data.indexOf(',');
        int secondComma = data.indexOf(',', firstComma + 1);
        int thirdComma = data.indexOf(',', secondComma + 1);
        data.remove(0, (thirdComma + 2));
        pt(x, y, c, tz, data);
        Serial.println("Print text :" + String(x) + ", Y:" + String(y) + ", color: " + String(c) + ", size: " + String(tz) + ",Text: " + data);
      }
      if (type == "dt" || type == "DT" || type == "Dt" || type == "dT") {
        int x0, y0, x1, y1, x2, y2, c;
        int numValues = sscanf(data.c_str(), "%d,%d,%d,%d,%d,%d,%d", &x0, &y0, &x1, &y1, &x2, &y2, &c);
        dt(x0, y0, x1, y1, x2, y2, c);
        Serial.println("Drawing triangle, X0: " + String(x0) + ", Y0: " + String(y0) + ", X1: " + String(x1) + ", Y1: " + String(y1) + ", X2: " + String(x2) + ", Y2: " + String(y2) + ", Color: " + String(c));
      }
      if (type == "db" || type == "DB" || type == "Db" || type == "dB") {
        int x, y, w, h, c;
        int numValues = sscanf(data.c_str(), "%d,%d,%d,%d,%d,%d,%d", &x, &y, &w, &h, &c);
        int firstComma = data.indexOf(',');
        int secondComma = data.indexOf(',', firstComma + 1);
        int thirdComma = data.indexOf(',', secondComma + 1);
        data.remove(0, (thirdComma + 4));
        uint8_t* dataAsUint8 = (uint8_t*)data.c_str();
        Serial.println(data);
        db(x, y, w, h, c, dataAsUint8);
        Serial.println("Draw bitmap, X: " + String(x) + ", Y: " + String(y) + ", Width: " + String(w) + ", height: " + String(h) + ", Color: " + String(c) + ", Data: " + data);
      }
    }
  }
}
void db(int x, int y, int width, int height, uint16_t color, const uint8_t* bitmap) {
  display.drawBitmap(x, y, bitmap, width, height, color);
  display.display();
}

void dt(int x0, int y0, int x1, int y1, int x2, int y2, uint16_t color) {
  display.fillTriangle(x0, y0, x1, y1, x2, y2, color);
  display.display();
}
void pt(int x, int y, uint16_t color, int textSize, String text) {
  display.setCursor(x, y);
  display.setTextSize(textSize);
  display.setTextColor(color);
  display.print(text);
}
void nt(int x, int y, uint16_t color, int textSize, String text) {  //
  display.setCursor(x, y);
  display.setTextSize(textSize);
  display.setTextColor(color);
  display.println(text);
  display.display();
}
void ct(String text) {  //
  display.print(text);
  display.display();
}
void nl() {  //
  display.println();
  display.display();
}
void dp(int x, int y, uint16_t color) {  //
  display.drawPixel(x, y, color);
  display.display();
}
void dc(int x, int y, int radius, uint16_t color) {  //
  display.drawCircle(x, y, radius, color);
  display.display();
}
void dr(int x, int y, int w, int h, int r, uint16_t color) {  //
  display.drawRoundRect(x, y, w, h, r, color);
  display.display();
}
void dl(int x, int y, int x2, int y2, uint16_t color) {  //
  display.drawLine(x, y, x2, y2, color);
  display.display();
}
void id() {  //
  display.invertDisplay(invert);
  display.display();
  invert = !invert;
}
void cd() {  //
  display.clearDisplay();
  display.display();
}
