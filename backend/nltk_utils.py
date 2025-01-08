import numpy as np
import nltk
from nltk.stem.porter import PorterStemmer

nltk.download('punkt')

stemmer = PorterStemmer()

# The functions below are functions that inmplement Natural Language (NLP) techniques for data processing

# Function that splits the sentence into meaningful units 
# Example sentence: "Hi, I'm Jim"!
# Tokenized sentence: ["Hi", "I'm", "Jim", "!"] 
def tokenize(sentence):
    return nltk.word_tokenize(sentence)

# Function that generates the root form of a word
# Example words: organizing, organizer, organizes
# Root form: organ
def stem(word):
    return stemmer.stem(word.lower())

# Function that sets the tokenized sentence and words into training data for the model to use
def bag_of_words(tokenized_sentence, words):
    # Example below
    """
    sentence = ["hello", "how", "are", "you"]
    words = ["hi", "hello", "I", "you", "bye", "thank", "cool"]
    bog   = [  0 ,    1 ,    0 ,   1 ,    0 ,    0 ,      0]
    """

    sentence_words = [stem(word) for word in tokenized_sentence]
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in sentence_words: 
            bag[idx] = 1
    return bag