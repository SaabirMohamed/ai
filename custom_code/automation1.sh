#!/bin/bash
# this script is for automating the creation of a dockerised AI agent
# Define variables
PROJECT_NAME="Agent_Assist"
DOCKER_IMAGE="python:3.9"
WORKDIR="/app"
REPO_URL="https://github.com/yourusername/AI_Agent_Project.git"

# Step 1: Create Project Directory
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Step 2: Initialize Git and Clone Repository
git init
git remote add origin $REPO_URL
git pull origin main

# Step 3: Create Dockerfile
cat <<EOF > Dockerfile
# Use the official Python image from the Docker Hub
FROM $DOCKER_IMAGE

# Set the working directory in the container
WORKDIR $WORKDIR

# Copy the current directory contents into the container at $WORKDIR
ADD . $WORKDIR

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5454 available to the world outside this container
EXPOSE 5454

# Run app.py when the container launches
CMD ["python", "app.py"]
EOF

# Step 4: Create requirements.txt
cat <<EOF > requirements.txt
flask
flask-socketio
requests
openai
EOF

# Step 5: Create app.py
cat <<EOF > app.py
from flask import Flask, request
from flask_socketio import SocketIO, send, emit
import openai

app = Flask(__name__)
socketio = SocketIO(app)

# Configure OpenAI API
openai.api_key = "your_openai_api_key"

# WebSocket event handler for 'message' event
@socketio.on('message')
def handle_message(message):
    print(f'Received message: {message}')
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=message,
        max_tokens=150
    )
    reply = response.choices[0].text.strip()
    print(f'Sending reply: {reply}')
    emit('response', reply)

# Run the app
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5454)
EOF

# Step 6: Build and Run Docker Container
docker build -t $PROJECT_NAME .
docker run -d -p 5454:5454 $PROJECT_NAME

# Step 7: Output completion message
echo "Project setup complete. The AI agent is running on port 5454."

