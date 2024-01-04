#
# Parses through all words on list an checks if a word has no connections to another
#

import json
import sys

wordList = []

fileName = sys.argv[1]
with open(fileName, "r") as file:
    wordList = json.loads(file.read())

connections = {}
for word in wordList:
    connections[word] = []
    for w in wordList:
        if word == w:
            continue

        if sorted(word) == sorted(w):
            connections[word].append(w)

        diff = 0
        for i in range(len(word)):
            if word[i] != w[i]: diff += 1
        if diff == 1:
            connections[word].append(w)

    # Removes isolated words from list
    if(len(connections[word]) == 0):
        print(f"{word} has no connections")
        wordList.remove(word)

with open(fileName, "w") as file:
    jsonText = json.dumps(wordList)
    file.write(jsonText)
    file.close()