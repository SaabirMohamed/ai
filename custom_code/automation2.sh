#!/bin/bash

# Define variables
DOCKER_IMAGE="python:3.9"
WORKDIR="/app"

# Function to create Dockerfile and app.py for each agent
create_docker_setup() {
    local agent_name=$1
    local port=$2
    local app_code=$3

    # Create project directory
    mkdir $agent_name
    cd $agent_name

    # Create Dockerfile
    cat <<EOF > Dockerfile
# Use the official Python image from the Docker Hub
FROM $DOCKER_IMAGE

# Set the working directory in the container
WORKDIR $WORKDIR

# Copy the current directory contents into the container at $WORKDIR
ADD . $WORKDIR

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port available to the world outside this container
EXPOSE $port

# Run app.py when the container launches
CMD ["python", "app.py"]
EOF

    # Create requirements.txt
    cat <<EOF > requirements.txt
flask
flask-socketio
requests
openai
EOF

    # Create app.py with the provided code
    echo "$app_code" > app.py

    # Build and run Docker container
    docker build -t $agent_name .
    docker run -d -p $port:$port $agent_name

    # Go back to parent directory
    cd ..
}

# OpenAI agent setup
OPENAI_APP_CODE=$(cat <<'EOF'
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
)
create_docker_setup "oai_agent_assist" 5454 "$OPENAI_APP_CODE"

# Sonnet AI agent setup
SONNET_APP_CODE=$(cat <<'EOF'
from flask import Flask, request
from flask_socketio import SocketIO, send, emit
import requests

app = Flask(__name__)
socketio = SocketIO(app)

# Configure Sonnet AI
SONNET_AI_URL = "https://api.sonnet.ai/v1/chat/completions"
SONNET_AI_API_KEY = "your_sonnet_ai_api_key"

# WebSocket event handler for 'message' event
@socketio.on('message')
def handle_message(message):
    print(f'Received message: {message}')
    headers = {
        'Authorization': f'Bearer {SONNET_AI_API_KEY}',
        'Content-Type': 'application/json'
    }
    data = {
        'model': 'gpt-4',  # Adjust model if needed
        'messages': [
            {'role': 'system', 'content': 'You are a helpful assistant.'},
            {'role': 'user', 'content': message}
        ]
    }
    response = requests.post(SONNET_AI_URL, headers=headers, json=data)
    reply = response.json()['choices'][0]['message']['content']
    print(f'Sending reply: {reply}')
    emit('response', reply)

# Run the app
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5455)
EOF
)
create_docker_setup "son_agent_assist" 5455 "$SONNET_APP_CODE"

# Ollama Local agent setup (example code, replace with actual implementation)
OLLAMA_APP_CODE=$(cat <<'EOF'
from flask import Flask, request
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
socketio = SocketIO(app)

# Dummy Ollama Local implementation
@socketio.on('message')
def handle_message(message):
    print(f'Received message: {message}')
    reply = "Ollama Local response to: " + message
    print(f'Sending reply: {reply}')
    emit('response', reply)

# Run the app
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5456)
EOF
)
create_docker_setup "oll_agent_assist" 5456 "$OLLAMA_APP_CODE"

# Function to list files in the root directory
list_root_files() {
    echo "Listing files in the root directory:"
    ls -1 /
}

# Output completion message
echo "Docker containers for AI agents have been set up and are running."

# List files in the root directory
list_root_files
