#!/bin/bash
######## EC2 Frontend Script ########

sudo su

## install docker ##
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl start docker #Start docker service
sudo systemctl enable docker #Enable docker so it will auto start when booted

## pull the frontend custom image from dockerhub ##
docker pull matanski/vueapp:yuvali3
