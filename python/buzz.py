import pigpio
import RPi.GPIO as GPIO
import time

# https://circuitdigest.com/microcontroller-projects/raspberry-pi-4-digit-7-segments-display-module

# GloablVariables
segments = (a, b, c, d, e, f, g) = (20, 7, 13, 19, 26, 16, 6)
DS = (DS1, DS2, DS3, DS4) = (21, 8, 25, 5)


def initialize_GPIO():
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)

    for digit in DS:
        GPIO.setup(digit, GPIO.OUT)
        GPIO.output(digit, GPIO.HIGH)

    for segment in segments:
        GPIO.setup(segment, GPIO.OUT)
        GPIO.output(segment, GPIO.LOW)


def print_segment(char):
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

    if char == 1:
        for i in range(7):
            GPIO.output(segments[i], one[i])

    if char == 2:
        for i in range(7):
            GPIO.output(segments[i], two[i])

    if char == 3:
        for i in range(7):
            GPIO.output(segments[i], three[i])

    if char == 4:
        for i in range(7):
            GPIO.output(segments[i], four[i])

    if char == 5:
        for i in range(7):
            GPIO.output(segments[i], five[i])

    if char == 6:
        for i in range(7):
            GPIO.output(segments[i], six[i])

    if char == 7:
        for i in range(7):
            GPIO.output(segments[i], seven[i])

    if char == 8:
        for i in range(7):
            GPIO.output(segments[i], eight[i])

    if char == 9:
        for i in range(7):
            GPIO.output(segments[i], nine[i])

    if char == 0:
        for i in range(7):
            GPIO.output(segments[i], zero[i])        


def print_frequency(frequency):
    freq = int(frequency)
    d3 = freq % 10
    d2 = (freq // 10) % 10
    d1 = (freq // 100) % 10
    d0 = freq // 1000
    print_digit(0, d0)
    print_digit(1, d1)
    print_digit(2, d2)
    print_digit(3, d3)


def print_digit(digit, number):
    delay_time = 0.0007
    
    print_segment(number)
    GPIO.output(DS[digit], GPIO.LOW)
    time.sleep(delay_time)
    GPIO.output(DS[digit], GPIO.HIGH)


def main():
    pi = pigpio.pi()
    buzzer1 = 18
    try:
        initialize_GPIO()
        file = open("python/shared_memory.txt", "r")
        while(True):
            frequency = file.read()
            file.seek(0)
            if frequency:
                frequency = int(frequency)
                pi.hardware_PWM(buzzer1, frequency, 500000)
                print_frequency(frequency)     
    except KeyboardInterrupt:
        pass

    file.close()
    GPIO.cleanup()
    pi.hardware_PWM(buzzer1, 0, 0)
    pi.stop()
        

if __name__ == "__main__":
    main()

