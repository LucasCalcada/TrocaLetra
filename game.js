// Constants
const LETTER_COUNT = 4;
// Global Vars
var wordList;
var attemptsHolder;
var textInput;

window.addEventListener("load", () => {
    GetJSON("./4Letras.json").then(r => {
        wordList = r;
        StartGame();
    });

    textInput = document.getElementById("textIn");
    textInput.maxLength = LETTER_COUNT;

    // Word holders
    wordIHolder = document.getElementById("wordI");
    wordFHolder = document.getElementById("wordF");
    attemptsHolder = document.getElementById("attemptsHolder");

    // Enter keyboard button listener
    textInput.addEventListener("keyup",event => {
        if(event.key == "Enter"){
            WordInput();
        }
    })
});

// Loads word list JSON
async function GetJSON(path){
    let file = await fetch(path);
    let json = await file.json();
    return json;
}

function ClearChildNodes(element){
    while(element.childElementCount > 0){
        element.removeChild(element.firstChild)
    }
}

// Chooses a random word from the word list
function ChooseWord(){
    let maxIndex = wordList.length - 1;
    let index = Math.round(Math.random() * maxIndex);
    return wordList[index];
}

var wordIString;
var wordFString;
var lastWord;
var wordIHolder;
var wordFHolder;
function StartGame(){
    document.getElementById("endScreen").visibility = "hidden";
    // Choosing initial and final words
    wordIString = ChooseWord();
    wordFString = ChooseWord();
    lastWord = wordIString;

    // Clears child elements
    ClearChildNodes(wordIHolder);
    ClearChildNodes(wordFHolder);
    ClearChildNodes(attemptsHolder);

    // Creates initial and final word elements
    let wordIElement = CreateWordElement(wordIString);
    let wordFElement = CreateWordElement(wordFString);
    wordIHolder.appendChild(wordIElement)
    wordFHolder.appendChild(wordFElement)
}

function CreateLetterElement(letra){
    let el = document.createElement("p");
    el.classList.add("letter");
    el.innerHTML = letra.toUpperCase();
    return el;
}

function CreateWordElement(palavra){
    let word = document.createElement("div");
    word.classList.add("word");
    Array.from(palavra).forEach(l => {
        let letter = CreateLetterElement(l);
        word.appendChild(letter);
    });
    return word;
}

function IsDiff1(wordAttempt){
    let diff = 0;
    for (let i = 0; i < LETTER_COUNT; i++) {
        if(wordAttempt[i] != lastWord[i]){
            diff++;
        }
    }
    return diff == 1;
}

function IsAnagram(wordAttempt){
    let trySorted = wordAttempt.split("").sort().join("");
    let lastSorted = lastWord.split("").sort().join("");
    return trySorted === lastSorted;
}

function WordInput(){
    // Gets word in input field
    let wordAttempt = textInput.value;

    // Returns if wordTry is not in wordList
    if(wordList.indexOf(wordAttempt) == -1){
        textInput.value = "";
        return;
    } 

    if(wordAttempt === wordFString) EndGame();
    
    if(IsAnagram(wordAttempt) || IsDiff1(wordAttempt)){
        lastWord = wordAttempt;
        let l = CreateWordElement(wordAttempt);
        attemptsHolder.appendChild(l);
        attemptsHolder.scrollTop = attemptsHolder.scrollHeight;
    }
    textInput.value = "";
}

function EndGame(){
    document.getElementById("endScreen").visibility = "visible";
}