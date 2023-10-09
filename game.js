// Constante
const LETRAS = 5;
// Variáveis globais
var palavras;
var tentativas;
var textoInput;

window.onload = () => {
    LerJSON("./cincoLetras.json").then(r => {
        palavras = r;
        IniciarJogo();
    });

    textoInput = document.getElementById("textoIn");
    tentativas = document.getElementById("tentativas");

    document.getElementById("enviar").addEventListener("click",() => {
        let p = textoInput.value;
        console.log(p);
        Tentativa(p);
    });
}

// Carrega o JSON com as palavras
async function LerJSON(caminho){
    let file = await fetch(caminho);
    let json = await file.json();
    return json;
}

// Retorna uma palavra aleatoria da lista
function EscolherPalavra(){
    let maxIndex = palavras.length - 1;
    let index = Math.round(Math.random() * maxIndex);
    return palavras[index];
}


// Definição Palavras iniciais e finais
var palavraI, palavraF;
var ultimaPalavra;
function IniciarJogo(){
    // Escolhe as palavras iniciais e finais
    palavraI = EscolherPalavra();
    palavraF = EscolherPalavra();
    ultimaPalavra = palavraI;

    let linhaI = CriarLinha(palavraI);
    let linhaF = CriarLinha(palavraF);
    document.getElementById("palavraI").appendChild(linhaI);
    document.getElementById("palavraF").appendChild(linhaF);
}

// Cria o elemento para uma letra
function CriarLetra(letra){
    let el = document.createElement("p");
    el.classList.add("letra");
    el.innerHTML = letra;
    return el;
}

// Cria os elementos para uma palavra
function CriarLinha(palavra){
    let linha = document.createElement("div");
    linha.classList.add("linha");
    Array.from(palavra).forEach(l => {
        let letra = CriarLetra(l);
        linha.appendChild(letra);
    });
    return linha;
}

function ContarDiff(pTentativa){
    let diff = 0;
    for (let i = 0; i < LETRAS; i++) {
        if(pTentativa[i] != ultimaPalavra[i]){
            diff++;
        }
    }
    return diff;
}

function Tentativa(pTentativa){
    if(palavras.indexOf(pTentativa) == -1) return;
    let diff = ContarDiff(pTentativa);
    console.log(diff);
    if(diff == 0){
        FimDeJogo();
        return;
    }
    else if(diff == 2 || diff == 1){
        ultimaPalavra = pTentativa;
        let l = CriarLinha(pTentativa);
        tentativas.appendChild(l);
    }
    else{
        return;
    }
}

function FimDeJogo(){

}