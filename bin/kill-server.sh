#!/bin/bash

netstat -lnp | grep 8082 | awk '{print $7}' | awk '{split($0,a,"\\/"); print a[1]}' | xargs kill -9
