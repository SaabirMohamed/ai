import json
import sys

import requests
import socketio

# Define the WebSocket clients for AI agents
sio_oai = socketio.Client()
sio_sonnet = socketio.Client()
sio_ollama = socketio.Client()

# AI Agent WebSocket URLs
AGENT_URLS = {
    "openai": "http://localhost:5454",
    "sonnet": "http://localhost:5455",
    "ollama": "http://localhost:5456",
}

# Global variable to store the agent's response
agent_response = None


# Connect to the WebSocket server
def connect(agent_type):
    if agent_type == "openai":
        sio_oai.connect(AGENT_URLS[agent_type])
    elif agent_type == "sonnet":
        sio_sonnet.connect(AGENT_URLS[agent_type])
    elif agent_type == "ollama":
        sio_ollama.connect(AGENT_URLS[agent_type])


# Disconnect from the WebSocket server
def disconnect(agent_type):
    if agent_type == "openai":
        sio_oai.disconnect()
    elif agent_type == "sonnet":
        sio_sonnet.disconnect()
    elif agent_type == "ollama":
        sio_ollama.disconnect()


# Handle the 'response' event from the AI agent
def handle_response(data):
    global agent_response
    agent_response = data


# Register event handlers
sio_oai.on("response", handle_response)
sio_sonnet.on("response", handle_response)
sio_ollama.on("response", handle_response)


# Function to check if the time response is valid
def is_valid_time(response):
    try:
        return "PM" in response or "AM" in response
    except Exception as e:
        return False


# Function to get the current time from a website (fallback)
def get_time_from_website():
    url = "http://worldclockapi.com/api/json/utc/now"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data.get("currentDateTime")
    return None


# Main function
def main(question, ai_provider):
    if "time" in question.lower():
        time_from_website = get_time_from_website()
        if time_from_website and is_valid_time(time_from_website):
            print(f"The current time is: {time_from_website}")
        else:
            # Connect to the specified AI agent
            connect(ai_provider)
            if ai_provider == "openai":
                sio_oai.send(question)
                sio_oai.wait()
            elif ai_provider == "sonnet":
                sio_sonnet.send(question)
                sio_sonnet.wait()
            elif ai_provider == "ollama":
                sio_ollama.send(question)
                sio_ollama.wait()

            # Print the agent's response
            if agent_response:
                print(f"{ai_provider.capitalize()} AI response: {agent_response}")
            else:
                print(
                    f"Failed to get a valid response from the {ai_provider} AI agent."
                )
    else:
        print("The question is not about time.")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print('Usage: python main.py "<question>" <ai_provider>')
    else:
        question = sys.argv[1]
        ai_provider = sys.argv[2].lower()
        if ai_provider not in AGENT_URLS:
            print("Invalid AI provider. Choose from: openai, sonnet, ollama")
        else:
            main(question, ai_provider)
