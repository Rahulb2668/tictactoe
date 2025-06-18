from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from engine import Environment, get_next_action

app = FastAPI()

class MakeMoveRequest(BaseModel):
    currentBoard:list[list[int]] 
    currentPlayer:str

@app.get("/")
def root():
    return {"Hello"}


@app.post("/makemove")
def makeMove(request:MakeMoveRequest):
    try:
        env = Environment()
        env.set_state(request.currentBoard)
        return get_next_action(env, request.currentPlayer)
    except Exception as e:
        return { "status": 400,"message": str(e) }


