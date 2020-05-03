import sys
# import pigpio

# pi = pigpio.pi()
buzzer = 18

x = f"pi.hardware_PWM({buzzer}, {sys.argv[1]}, 500000)"
#print("Ana")
print(x, end="")

# #stop the PWM signal
# pi.write(buzzer, 0)

# #stop the connection with the daemon
# pi.stop()