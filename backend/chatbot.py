import random 
import json 
import torch 
import os 
import sys
from model import NeuralNetwork
from nltk_utils import bag_of_words, tokenize

# Use for issues regarding importing modules
file_dir = os.path.dirname(__file__)
sys.path.append(file_dir)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('backend/intents.json', 'r') as f:
    intents = json.load(f)

# Load training data file 
FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNetwork(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "FitBot"

# Function used to get responses from the bot 
def get_response(msg):
    sentence = tokenize(msg)
    x = bag_of_words(sentence, all_words)
    x = x.reshape(1, x.shape[0])
    x = torch.from_numpy(x).to(device)

    output = model(x)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    probabilities = torch.softmax(output, dim=1)
    prob = probabilities[0][predicted.item()]

    # If the input is recognized by the model's training data
    if prob.item() > 0.75:
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                return(f"{bot_name}: {random.choice(intent['responses'])}")

    # If the model does not recognize the user's input
    else:
        return (f"{bot_name}: I'm sorry, I'm afraid I don't understand.")

if __name__ == "__main__":
    print("Hi there! My name is FitBot and I'm here to answer your gym/fitness related questions! If you would like to exit, please type 'quit'.")
    while True:
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        
