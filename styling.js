// Workaround to make input field the same height as the letter size

window.addEventListener("load", () => {
    var inputField, wordI;
    inputField = document.getElementById("inputField");
    wordI = document.getElementById("wordI");

    window.addEventListener("resize", () => {
        inputField.style.height = wordI.style.height;
    });
})
