#!/bin/bash
######## EC2 Backend Script ########

sudo su

## install docker ##
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl start docker #Start docker service
sudo systemctl enable docker #Enable docker so it will auto start when booted

## pull the mongo image from dockerhub ##
docker pull mongo:latest

## pull the backend custom image from dockerhub ##
docker pull matanski/nodexpress:yuvali6
