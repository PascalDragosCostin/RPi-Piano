import pigpio
import RPi.GPIO as GPIO

# https://circuitdigest.com/microcontroller-projects/raspberry-pi-4-digit-7-segment-display-module

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

segment = (26, 55)


pi = pigpio.pi()
buzzer = 18


null = [0,0,0,0,0,0,0]
zero = [1,1,1,1,1,1,0]
one = [0,1,1,0,0,0,0]
two = [1,1,0,1,1,0,1]
three = [1,1,1,1,0,0,1]
four = [0,1,1,0,0,1,1]
five = [1,0,1,1,0,1,1]
six = [1,0,1,1,1,1,1]
seven = [1,1,1,0,0,0,0]
eight = [1,1,1,1,1,1,1]
nine = [1,1,1,1,0,1,1]



def print_segment(char):
    if char == 1:
        for i in range(7):
            GPIO.output(segment[i], one[i])

    if char == 2:
        for i in range(7):
            GPIO.output(segment[i], two[i])

    if char == 3:
        for i in range(7):
            GPIO.output(segment[i], three[i])

    if char == 4:
        for i in range(7):
            GPIO.output(segment[i], four[i])

    if char == 5:
        for i in range(7):
            GPIO.output(segment[i], five[i])

    if char == 6:
        for i in range(7):
            GPIO.output(segment[i], six[i])

    if char == 7:
        for i in range(7):
            GPIO.output(segment[i], seven[i])

    if char == 8:
        for i in range(7):
            GPIO.output(segment[i], eight[i])

    if char == 9:
        for i in range(7):
            GPIO.output(segment[i], nine[i])

    if char == 0:
        for i in range(7):
            GPIO.output(segment[i], zero[i])        

try:
    while(True):
        f = open("shared_memory.txt", "r")
        x = f.read()
        if x:
            x = int(x)
            pi.hardware_PWM(buzzer, x, 500000)
            d0 = x % 10
            d1 = x / 10 % 10
            d2 = x / 100 % 10
            d3 = x / 1000

        f.close()
        
except KeyboardInterrupt:
	pass

pi.stop()
