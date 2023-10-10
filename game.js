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

    document.getElementById("send").addEventListener("click",() => {
        let p = textInput.value;
        console.log(p);
        WordInput(p);
    });
}

// Carrega o JSON com as palavras
async function GetJSON(path){
    let file = await fetch(path);
    let json = await file.json();
    return json;
}

// Retorna uma palavra aleatoria da lista
function ChooseWord(){
    let maxIndex = wordList.length - 1;
    let index = Math.round(Math.random() * maxIndex);
    return wordList[index];
}


// Definição Palavras iniciais e finais
var wordI, wordF;
var lastWord;
function StartGame(){
    // Escolhe as palavras iniciais e finais
    wordI = ChooseWord();
    wordF = ChooseWord();
    lastWord = wordI;

    let linhaI = CreateWordElement(wordI);
    let linhaF = CreateWordElement(wordF);
    document.getElementById("wordI").appendChild(linhaI);
    document.getElementById("wordF").appendChild(linhaF);
}

// Cria o elemento para uma letra
function CreateLetterElement(letra){
    let el = document.createElement("p");
    el.classList.add("letter");
    el.innerHTML = letra;
    return el;
}

// Cria os elementos para uma palavra
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

function WordInput(wordTry){
    if(wordList.indexOf(wordTry) == -1) return;
    let diff = CountDiff(wordTry);
    console.log(diff);
    if(diff == 0){
        EndGame();
        return;
    }
    else if(diff == 2 || diff == 1){
        lastWord = wordTry;
        let l = CreateWordElement(wordTry);
        triesHolder.appendChild(l);
    }
    else{
        return;
    }
}

function EndGame(){

}