const int LED_PIN = 9;  // LED 連接的腳位

void setup() {
  Serial.begin(9600);    // 設定串行通訊速率
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    char command = Serial.read();
    
    if (command == 'S') {
      // LED 呼吸效果
      for(int brightness = 0; brightness <= 255; brightness++) {
        analogWrite(LED_PIN, brightness);
        delay(10);
      }
      for(int brightness = 255; brightness >= 0; brightness--) {
        analogWrite(LED_PIN, brightness);
        delay(10);
      }
    }
  }
}
