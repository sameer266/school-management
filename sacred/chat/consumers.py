import json
import asyncio
import re  # Import the regex module
from channels.generic.websocket import AsyncWebsocketConsumer
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain_ollama import ChatOllama

class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Initialize the Ollama chat model
        self.llm = ChatOllama(model="deepseek-r1:1.5b", base_url="http://localhost:11434/")

        # Define the chat prompt template
        self.chat_prompt = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template("You are an AI assistant for students. Your goal is to help students with their studies in a clear and friendly manner."),
            HumanMessagePromptTemplate.from_template("{message}"),
        ])

    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        print(f"WebSocket disconnected with code: {close_code}")
        await self.close()

    async def receive(self, text_data):
        try:
            # Parse the incoming message
            text_data_json = json.loads(text_data)
            user_message = text_data_json['message']
            print(f"Received message: {user_message}")

            # Format the prompt using the chat template
            formatted_prompt = self.chat_prompt.format_messages(message=user_message)

            # Generate the AI response asynchronously
            ai_response = await self.generate_response(formatted_prompt)
            print(f"AI Response: {ai_response}")

            # Send the response back to the WebSocket client
            await self.send(text_data=json.dumps({
                'user_message': user_message,
                'ai_response': ai_response
            }))
            print("Data sent")

        except Exception as e:
            print(f"Error processing message: {e}")
            await self.send(text_data=json.dumps({
                'error': 'There was an error processing your message.'
            }))

    async def generate_response(self, prompt):
        try:
            # Invoke the Ollama model asynchronously
            response = await asyncio.to_thread(self.llm.invoke, prompt)
            
            # Remove content between <think> and </think> tags
            cleaned_response = re.sub(r'<think>.*?</think>', '', response.content, flags=re.DOTALL).strip()
            
            return cleaned_response
        except Exception as e:
            print(f"Error in model invocation: {e}")
            return "Sorry, I couldn't process your request."