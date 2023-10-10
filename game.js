// Constante
const LETTER_COUNT = 4;
// Variáveis globais
var wordList;
var triesHolder;
var textInput;

window.onload = () => {
    GetJSON("./4Letras.json").then(r => {
        wordList = r;
        StartGame();
    });

    textInput = document.getElementById("textIn");
    textInput.maxLength = LETTER_COUNT;
    triesHolder = document.getElementById("attemptsHolder");

    // Send button click listener
    document.getElementById("send").addEventListener("click",() => {
        WordInput();
    });

    // Enter keyboard button listener
    textInput.addEventListener("keyup",event => {
        if(event.key == "Enter"){
            WordInput();
        }
    })
}

function SendWord(){
    console.log(p);
    WordInput(p);
}
// Loads word list JSON
async function GetJSON(path){
    let file = await fetch(path);
    let json = await file.json();
    return json;
}

// Chooses a random word from the word list
function ChooseWord(){
    let maxIndex = wordList.length - 1;
    let index = Math.round(Math.random() * maxIndex);
    return wordList[index];
}

var wordI, wordF;
var lastWord;
function StartGame(){
    // Choosing initial and final words
    wordI = ChooseWord();
    wordF = ChooseWord();
    lastWord = wordI;

    // Creates initial and final word elements
    let wordIElement = CreateWordElement(wordI);
    let wordFElement = CreateWordElement(wordF);
    document.getElementById("wordI").appendChild(wordIElement);
    document.getElementById("wordF").appendChild(wordFElement);
}

function CreateLetterElement(letra){
    let el = document.createElement("p");
    el.classList.add("letter");
    el.innerHTML = letra;
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

function CountDiff(wordTry){
    let diff = 0;
    for (let i = 0; i < LETTER_COUNT; i++) {
        if(wordTry[i] != lastWord[i]){
            diff++;
        }
    }
    return diff;
}

function WordInput(){
    // Gets word in input field
    let wordTry = textInput.value;

    // Returns if wordTry is not in wordList
    if(wordList.indexOf(wordTry) == -1) return;
    
    let diff = CountDiff(wordTry);
    if(diff > 1) return;
    if(diff == 1){
        lastWord = wordTry;
        let l = CreateWordElement(wordTry);
        triesHolder.appendChild(l);
    }
    else if(diff == 0){
        EndGame();
    }
    else{

    }
    textInput.value = "";
}

function EndGame(){

}