#!/bin/bash

# I want to make sure that the directory is clean and has nothing left over from
# previous deployments. The servers auto scale so the directory may or may not
# exist.
if [ -d /home/ubuntu/DONUT/server ]; then
    rm -rf /home/ubuntu/DONUT/server
fi
mkdir -vp /home/ubuntu/DONUT/server