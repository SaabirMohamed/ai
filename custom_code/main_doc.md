# Explanation of main.py

The `main.py` script is a Python program that serves as an interface to interact with different AI agents (OpenAI, Sonnet, and Ollama) using WebSocket connections. Here's a breakdown of its main functionalities:

1. It imports necessary libraries and sets up WebSocket clients for three AI agents: OpenAI, Sonnet, and Ollama.

2. It defines connection URLs for each AI agent.

3. The script provides functions to connect to and disconnect from the WebSocket servers for each AI agent.

4. There's a handler function to process responses from the AI agents.

5. The script includes a function to validate time responses and another to fetch the current time from a website as a fallback.

6. The main function:
   - Checks if the user's question is about time.
   - If it is, it first tries to get the time from a website.
   - If that fails, it connects to the specified AI agent, sends the question, and waits for a response.
   - It then prints the AI agent's response.

7. The script is designed to be run from the command line, taking two arguments:
   - The question to ask (in quotes)
   - The AI provider to use (openai, sonnet, or ollama)

8. If the correct number of arguments isn't provided or an invalid AI provider is specified, it prints usage instructions.

In essence, this script allows users to ask time-related questions to different AI agents, falling back to a web service if needed, and provides a unified interface for interacting with these different AI services.
