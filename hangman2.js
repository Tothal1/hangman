function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
                allText = allText.split("\n");
                randomWord = allText[Math.floor(Math.random() * allText.length)];
            }
        }
    }
    rawFile.send(null);
}


function createButton(givenLetter) {

    var buttons = document.getElementById("buttons");
    var element = document.createElement("li");
    element.innerHTML = givenLetter;
    element.id = "letter" + givenLetter;
    element.onclick = function () {
        var letterFound = 0;
        this.setAttribute("class", "active");
        this.onclick = null;
        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord[i] == element.innerHTML) {
                letterFound = 1;
                underscoreList[i].innerHTML = element.innerHTML;
                numOfLettersFound += 1;
                check();
            }
        }
        if (letterFound == 0) {
            mistakesWereMade();
            setLife();
        }
        buttons.removeChild(element);
    }
    buttons.appendChild(element);
}

function check() {
    if (numOfLettersFound + spaces == randomWord.length) {
        alert("congratulations, you won");
        playAgain();
    }
}

function mistakesWereMade() {
    numOfLives += -1;
    var changeImage = document.getElementById("imageFile");
    changeImage.src = "finalimages/life" + numOfLives + ".png";
    if (numOfLives == 0) {
        alert("game over, the correct answer was " + randomWord);
        playAgain();
    }
}
var allText;
var randomWord;
var spaces = 0;
var numOfLettersFound = 0;
var numOfLives = 6;
var underscoreList = [];
const firstAsciiCode = "a".charCodeAt(0);
const lastAsciiCode = "z".charCodeAt(0);

function showButtons() {
    for (var i = firstAsciiCode; i <= lastAsciiCode; i++) {
        createButton(String.fromCharCode(i));
    }
}

function showUnderscores() {
    for (var i = 0; i < randomWord.length; i++) {
        var underscores = document.getElementById("underscores");
        var element = document.createElement("li");
        if (randomWord[i] === " ") {
            element.innerHTML = " ";
            spaces++;
        } else {
            element.innerHTML = "_";
        }
        element.id = "underscore";
        underscoreList.push(element)
        underscores.appendChild(element);
    }
}
window.onload = function () {
    readTextFile("text.txt");
    showUnderscores();
    showButtons();
    setLife();
}

function setLife() {
    var Lives = document.getElementById("numberOfLives");
    Lives.innerHTML = numOfLives;
}

function cleanUp() {
    var underscores = document.getElementById("underscores");
    while (underscores.firstChild) {
        underscores.removeChild(underscores.firstChild);
    }
    var buttons = document.getElementById("buttons");
    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild);
    }
    setLife();

}

function playAgain() {
    randomWord = allText[Math.floor(Math.random() * allText.length)];
    spaces = 0;
    numOfLettersFound = 0;
    numOfLives = 6;
    var changeImage = document.getElementById("imageFile");
    changeImage.src = "finalimages/life" + numOfLives + ".png";
    underscoreList = []
    cleanUp();
    showUnderscores();
    showButtons();
}
