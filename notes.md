## Tasks for the creation of the ai super rag project
---------------------------------------------------------------------------------------------------------
#### Aider, langflow, agent-zero
---------------------------------------------------------------------------------------------------------

## Summary: 
#### Features: 
1.  Present a menu of options 
     a.  The user must select the LLM to use
     b.  The user must select the model to use
     c.  The interaction type must be selected [file,project,chat,...]
         i. depending on the selection user must provide path or git repo to the project if selected
2.  The app requests the user to provide a prompt 
5.  The prompt is sent to the with the project files previously vectorized and stored in postgres db
6.  Data is retrieved as context to provide to the llm.
7.  The llm is asked to generate a response (embedding and transformers are used accordingly)
8.  Response is intercepted and any code instructions are detected in the markdown are saves as a code script
    that will be sent to an agent for execution.
9.  Agents are used to run the code in the response, the workdir is used and mapped to any agent docker containers.
10. The UI waits for responses from agents it has spawned, agents are only used when intructions say so.
11. The UI displays the responses and the agent logs.


 
