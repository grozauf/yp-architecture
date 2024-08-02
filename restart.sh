#!/bin/bash

docker-compose down
docker-compose -f ./compose.yaml build
docker-compose -f ./compose.yaml create
docker-compose -f ./compose.yaml start
