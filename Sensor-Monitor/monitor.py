#!/usr/bin/python
# -*- coding: utf-8 -*-
import requests
import RPi.GPIO as GPIO
import time

# Pin Definitons:

sensorPin = 23

# Pin Setup:

GPIO.setup(sensorPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)  # Sensor alert pin set as input w/ pull-up

try:
    while 1:
        if GPIO.input(sensorPin):  # Sensor alert status is inactive
            zero = 0
    else:

            # do nothing...
                                 # Sensor alert status is active

        request = requests.post('http://localhost:9000',
                                data={'status': 'Green',
                                'message': 'This is a custom error message'
                                })
        print r.status_code
except:
    print 'Could not Connect'


			