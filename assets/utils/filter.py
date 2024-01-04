#
# Separate a word list by word size
#
import json
import sys

text = ""
words = {}

fileName = sys.argv[1]
with open(fileName, "r") as file:
    text = file.read()
    text = text.split("\n")

for word in text:
    wordSize = len(word)
    if(wordSize not in words.keys()):
        words[wordSize] = []
    words[wordSize].append(word)

for size in words.keys():
    jsonText = json.dumps(words[size])
    with open(f"{size}_letters.json", "w") as newFile:
        newFile.write(jsonText.replace(", ", ",\n"))
        newFile.close()