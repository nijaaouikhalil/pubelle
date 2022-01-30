// For the UltraSonic sensor 
#define echoPin1 8 // attach pin D2 Arduino to pin Echo of HC-SR04
#define trigPin1 9 //attach pin D3 Arduino to pin Trig of HC-SR04

#define echoPin2 12 // attach pin D2 Arduino to pin Echo of HC-SR04
#define trigPin2 13 //attach pin D3 Arduino to pin Trig of HC-SR04

#include<Servo.h>
Servo Myservo1;
Servo Myservo2;
int pos;
int start_pos = 60;
int end_pos = 150;

// defines variables
long duration1; // variable for the duration of sound wave travel
int distance1; // variable for the distance measurement

long duration2; // variable for the duration of sound wave travel
int distance2; // variable for the distance measurement

int counter1 = 0;
int counter2 = 0;

String command;

void setup() 
{
  DDRD = B11111111; // set PORTD (digital 7~0) to outputs
  Serial.begin(9600); // // Serial Communication is starting with 9600 of baudrate speed
  Serial.println("STCS Test"); // print some text in Serial Monitor
  Serial.println("with Arduino UNO");
  
  // For the UltraSonic sensor  1
  pinMode(trigPin1, OUTPUT); // Sets the trigPin as an OUTPUT
  pinMode(echoPin1, INPUT); // Sets the echoPin as an INPUT

  // For the UltraSonic sensor  2
  pinMode(trigPin2, OUTPUT); // Sets the trigPin as an OUTPUT
  pinMode(echoPin2, INPUT); // Sets the echoPin as an INPUT
  
  Myservo1.attach(10);
  Myservo2.attach(11);
  PORTD = B11111111;     // Lights OFF
}

int get_distance_1(){
    // Clears the trigPin condition
  digitalWrite(trigPin1, LOW);
  delayMicroseconds(2);
  // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  int duration = pulseIn(echoPin1, HIGH);
  // Calculating the distance
  int distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)
  // Displays the distance on the Serial Monitor
  return distance;
  }

  int get_distance_2(){
    // Clears the trigPin condition
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
  // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  int duration = pulseIn(echoPin2, HIGH);
  // Calculating the distance
  int distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)
  // Displays the distance on the Serial Monitor
  return distance;
  }
void loop() 
{ 
    if (Serial.available()) {
    command = Serial.readStringUntil('\n');
    command.trim();
    if (command.equals("red1")) {
        PORTD = B01111111; // RED
//        delay(3000);
//        PORTD = B11111111;   // Lights OFF
        delay(3000);
    }

    else if (command.equals("green2")) {
        PORTD = B11101111; // RED
//       delay(3000);
//        PORTD = B11111111;   // Lights OFF
        delay(3000);
    }
    else if (command.equals("green1")) {
        PORTD = B11011111;   // GREEN
        delay(3000);
//        PORTD = B11111111;   // Lights OFF
//        delay(1000);
    }
    else if (command.equals("red2")) {
        PORTD = B11110111;   // GREEN
//        delay(3000);
//        PORTD = B11111111;   // Lights OFF
        delay(3000);
    }
    else if (command.equals("off")) {
      delay(3000);
        PORTD = B11111111;   // Lights OFF
    }
    else {
      Serial.println("bad command");
    }
    Serial.print("Command: ");
    Serial.println(command);
  }

  distance1 = get_distance_1();
  distance2 = get_distance_2();


  
  if(distance1 < 5){
    counter1++;
    if(counter1>20){
        Serial.print(distance1);
        Serial.println(" cm");
        Serial.println("YOU HAVE BEEN HERE FOR A WHILE MOTOR 1");
        counter1 = 0;

        // Open LID
        for(pos=start_pos;pos<=end_pos;pos++){
          Myservo1.write(pos);
          delay(15);
          }
            delay(1000);
            


         //STRIP 2 :
          PORTD = B11111011;     // BLUE
          delay(6000);
          PORTD = B11111111;     // Lights OFF
          delay(1000);


         for(pos=end_pos;pos>=start_pos;pos--){
          Myservo1.write(pos);
          delay(15);
          }
            delay(20000);
      }
    }else{
      counter1=0;}


   if(distance2 < 5){
    counter2++;
    if(counter2>20){
        Serial.print(distance2);
        Serial.println(" cm");
        Serial.println("YOU HAVE BEEN HERE FOR A WHILE MOTOR 2");
        counter2 = 0;

        for(pos=start_pos;pos<=end_pos;pos++){
          Myservo2.write(pos);
          delay(15);
          }
            delay(1000);
            

        //STRIP 1 :
        PORTD = B11011111;     // BLUE
        //PORTD = B10111111;   // GREEN
        delay(6000);
        PORTD = B11111111;     // Lights OFF
        delay(1000);


        for(pos=end_pos;pos>=start_pos;pos--){
          Myservo2.write(pos);
          delay(15);
          }
            delay(20000);

      }
    }else{
      counter2=0;}

//  
//  Serial.print("Distance: ");
//  Serial.print(distance);
//  Serial.println(" cm");
  
//
//  //STRIP 1 :
//  PORTD = B11011111;     // BLUE
//  delay(3000);
//  PORTD = B11111111;     // Lights OFF
//  delay(1000);
//  
//  PORTD = B10111111;   // GREEN
//  delay(3000);
//  PORTD = B11111111;   // Lights OFF
//  delay(1000);
//
//
//    PORTD = B01101111; // RED
//  delay(3000);
//  PORTD = B11111111;   // Lights OFF
//  delay(1000);
//
//
//    //STRIP 2 :
//  PORTD = B11111011;     // BLUE
//  delay(3000);
//  PORTD = B11111111;     // Lights OFF
//  delay(1000);
//  
//  PORTD = B11110111;   // GREEN
//  delay(3000);
//  PORTD = B11111111;   // Lights OFF
//  delay(1000);
//
//
//    PORTD = B11101111; // RED
//  delay(3000);
//  PORTD = B11111111;   // Lights OFF
//  delay(1000);
//  

}
