from fastapi import FastAPI
from pydantic import BaseModel
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")
app = FastAPI()

class Prompt(BaseModel):
    prompt: str

@app.post("/generate")
async def generate(prompt: Prompt):
    resp = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt.prompt,
        max_tokens=150
    )
    return {"text": resp.choices[0].text.strip()}