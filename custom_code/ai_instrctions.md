💾🖥️🖱️ **Creating a Multi-Agent System with Docker Containers** 🖱️🖥️💾

We'll create a bash script to set up three Docker containers, each running a different AI agent:
1. **oai_agent_assist** (OpenAI)
2. **son_agent_assist** (Sonnet AI)
3. **oll_agent_assist** (Ollama Local)

### Bash Script for Docker Setup

```bash
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

# Output completion message
echo "Docker containers for AI agents have been set up and are running."
```

### Modified Primary Script (`main.py`)

```python
import sys
import requests
import socketio
import json

# Define the WebSocket clients for AI agents
sio_oai = socketio.Client()
sio_sonnet = socketio.Client()
sio_ollama = socketio.Client()

# AI Agent WebSocket URLs
AGENT_URLS = {
    'openai': 'http://localhost:5454',
    'sonnet': 'http://localhost:5455',
    'ollama': 'http://localhost:5456'
}

# Global variable to store the agent's response
agent_response = None

# Connect to the WebSocket server
def connect(agent_type):
    if agent_type == 'openai':
        sio_oai.connect(AGENT_URLS[agent_type])
    elif agent_type == 'sonnet':
        sio_sonnet.connect(AGENT_URLS[agent_type])
    elif agent_type == 'ollama':
        sio_ollama.connect(AGENT_URLS[agent_type])

# Disconnect from the WebSocket server
def disconnect(agent_type):
    if agent_type == 'openai':
        sio_oai.disconnect()
    elif agent_type == 'sonnet':
        sio_sonnet.disconnect()
    elif agent_type == 'ollama':
        sio_ollama.disconnect()

# Handle the 'response' event from the AI agent
def handle_response(data):
    global agent_response
    agent_response = data

# Register event handlers
sio_oai.on('response', handle_response)
sio_sonnet.on('response', handle_response)
sio_ollama.on('response', handle_response)

# Function to check if the time response is valid
def is_valid_time(response):
    try:
        return 'PM' in response or 'AM' in response
    except Exception as e:
        return False

# Function to get the current time from a website (fallback)
def get_time_from_website():
    url = 'http://worldclockapi.com/api/json/utc/now'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data.get('currentDateTime')
    return None

# Main function
def main(question, ai_provider):
    if "time" in question.lower():
        time_from_website = get_time_from_website()
        if time_from_website and is_valid_time(time_from_website):
            print(f'The current time is: {time_from_website}')
        else:
            # Connect to the specified AI agent
            connect(ai_provider)
            if ai_provider == 'openai':
                sio_oai.send(question)
                sio_oai.wait()
            elif ai_provider == 'sonnet':
                sio_sonnet.send(question)
                sio_sonnet.wait()
            elif ai_provider == 'ollama':
                sio_ollama.send(question)
                sio_ollama.wait()

            # Print the agent's response
            if agent_response:
                print(f'{ai_provider.capitalize()} AI response: {agent_response}')
            else:
                print(f'Failed to get a valid response from the {ai_provider} AI agent.')
    else:
        print('The question is not about time.')

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: python main.py "<question>" <ai_provider>')
    else:
        question = sys.argv[1]
        ai_provider = sys.argv[2].lower()
        if ai_provider not in AGENT_URLS:
            print('Invalid AI provider. Choose from: openai, sonnet, ollama')
        else:
            main(question, ai_provider)
```

### Explanation

1. **Docker Containers**:
   - **oai_agent_assist**: Runs the OpenAI agent on port 5454.
   - **son_agent_assist**: Runs the Sonnet AI agent on port 5455.
   - **oll_agent_assist**: Runs the Ollama Local agent on port 5456.

2. **Primary Script (`main.py`)**:
   - Added support for three AI providers: `openai`, `sonnet`, and `ollama`.
   - Connects to the appropriate AI agent based on the provided argument.
   - Uses WebSockets to send the question and receive the response from the chosen AI agent.

### Usage

To ask

 the primary script a question and specify the AI provider:

```bash
# Using the OpenAI agent
python main.py "what is the time?" openai

# Using the Sonnet AI agent
python main.py "what is the time?" sonnet

# Using the Ollama Local agent
python main.py "what is the time?" ollama
```

This setup allows you to dynamically choose between different AI agents based on the provided arguments.
