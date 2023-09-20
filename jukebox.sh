#!/bin/bash

if [ "$1" != "help" ] && [ "$1" != "build" ] && [ "$1" != "run" ]; then
    echo ""
    echo "No valid command specified." 
    echo "Use './jukebox.sh help' to see the available commands."
    echo ""
    exit 1
fi

if [ "$1" = "help" ]; then
    echo "Usage: './jukebox.sh [help|build|run]'"
    echo ""

    echo "help                      shows this help message"
    echo ""

    echo "build                     builds a docker image of the app."
    echo ""

    echo "run [prod|dev]            starts the application (must build app first to run production container)"
    echo " ├─ prod                  runs app in a docker container, using a previously built image"
    echo " └─ dev [front|back]      runs frontend or backend in development mode"
    echo "    ├─ front              runs frontend in development mode"
    echo "    └─ back               runs backend in development mode"
    echo ""

    exit 0
fi

if [ "$1" = "build" ]; then
    echo ""
    echo "Building production image 'jukebox.prod'..."
    echo ""
    cd ./jukebox-front
    npm install
    npm run build-prod
    cd ..
    docker build -t jukebox.prod -f ./docker/Dockerfile.prod .
    exit 0
fi

if [ "$1" = "run" ]; then
    if [ "$2" != "prod" ] && [ "$2" != "dev" ]; then
        echo ""
        echo "No valid arguiment specified for '.jukebox run [dev|prod]'"
        echo "Please specify 'dev' or 'prod' environment."
        echo "Use './jukebox.sh help' to see the available commands."
        echo ""
        exit 0
    fi

    if [ "$2" = "prod" ]; then
        echo ""
        echo "Launching the app production image 'jukebox.prod'..."
        docker compose -f ./docker/docker-compose.prod.yml --env-file .env up
        exit 0
    fi

    if [ "$2" = "dev" ]; then
        if [ "$3" != "front" ] && [ "$3" != "back" ]; then
            echo ""
            echo "No valid arguiment specified for '.jukebox run dev [front|back]'"
            echo "Please specify 'front' or 'back' environment."
            echo "Use './jukebox.sh help' to see the available commands."
            echo ""
            exit 0
        fi

        if [ "$3" = "front" ]; then
            echo ""
            echo "Launching the frontend dev environment"
            cd ./jukebox-front
            npm install
            npm run dev
            exit 0
        fi

        if [ "$3" = "back" ]; then
            echo ""
            echo "Launching the backend dev environment, using the 'jukebox.dev' docker image"
            cd ./jukebox-app
            npm install
            npm run dev
            exit 0
        fi
    fi
fi
