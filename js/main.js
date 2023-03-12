import { VALID_GUESSES } from "./Woordle_Paraules5LletresCatala.js";


document.addEventListener("DOMContentLoaded", () => {
    createsquare();
    const guesswords = [[]];

    let availablespace = 1;



    let word = VALID_GUESSES[Math.floor(Math.random() * VALID_GUESSES.length)];
    console.log(word)


    let guessWordCount = 0;

    const teclas = document.querySelectorAll(".fila-teclat button");


    function getcurrentwordarr() {
        const numberofguessedWords = guesswords.length;
        return guesswords[numberofguessedWords - 1];

    }
    function playSound() {
        const sound = document.getElementById("sound");
        sound.currentTime = 0;
        sound.play();
        console.log("sounds")
    }
    function WinSound() {
        const sound = document.getElementById("sound2");
        sound.currentTime = 0;
        sound.play();
        console.log("sounds")
    }
    function LoseSound() {
        const sound = document.getElementById("sound3");
        sound.currentTime = 0;
        sound.play();
        console.log("sounds")
    }
    function updateGuessedWords(letter) {
        const currentwordarr = getcurrentwordarr();
        if (!letter.match(/[a-z]/i)) {
            return;
        }
        if (currentwordarr && currentwordarr.length < 5) {
            currentwordarr.push(letter);
            playSound();
            const availablespaceEL = document.getElementById(String(availablespace));
            availablespaceEL.textContent = letter;

            document.querySelectorAll('.square').forEach(tile => {
                tile.classList.remove('active');
            });

            const currentTile = document.getElementById(availablespace);
            currentTile.classList.add('active');


            const prevSelectedSquare = document.querySelector(".selected");
            if (prevSelectedSquare) {
                prevSelectedSquare.classList.remove("selected");
            }

            availablespaceEL.classList.add("selected");

            availablespaceEL.classList.add("animate__bounceIn");

            availablespace = availablespace + 1;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(117,117,117)";
        }

        const letterInThatPosition = word.charAt(index);

        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(67,160,71)";

        }

        return "rgb(228,168,29)";



    }

    function enviarpalabras() {
        const currentwordarr = getcurrentwordarr();
        if (currentwordarr.length !== 5) {
            return Swal.fire('Te que ser una paraula de 5 lletres')

        }

        const currentWord = currentwordarr.join("");

        if (!VALID_GUESSES.includes(currentWord)) {
            clearCurrentWord();
            return;
        }

        // animation
        const firstLetterId = guessWordCount * 5 + 1;
        const interval = 250;
        currentwordarr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });
        guessWordCount += 1;

        if (currentWord === word) {

            setTimeout(() => {
                WinSound();
                return Swal.fire(
                    'Felicitats has fet ' + guessWordCount + " intents",
                )

            }, 1900);
            return;
        }
        if (guesswords.length === 6) {
            LoseSound();

            return Swal.fire(
                'Sorry no tienes mas intentos la palabra es: ' + word,
            )
        }
        guesswords.push([]);
    }



    function createsquare() {
        const tauler = document.getElementById("tauler");

        for (let i = 0; i < 30; i++) {
            let square = document.createElement("div");
            square.classList.add("square");

            square.classList.add("animate__animated");

            square.setAttribute("id", i + 1);
            tauler.appendChild(square);
        }
    }


    for (let i = 0; i < teclas.length; i++) {
        teclas[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
            updateGuessedWords(letter);
        }
    }
    function handleDeleteLetter() {
        const currentWordArr = getcurrentwordarr();

        if (currentWordArr.length > 0) {
            const removedLetter = currentWordArr.pop();
            const lastLetterEl = document.getElementById(String(availablespace - 1));

            lastLetterEl.textContent = "";
            availablespace = availablespace - 1;
        }
    }


    for (let i = 0; i < teclas.length; i++) {
        teclas[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === "enter") {
                enviarpalabras();
                return;
            }

            if (letter === "del") {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter)
        }
    }

    function handleKeyPress(event,) {
        const letter = event.key.toLowerCase();
        updateGuessedWords(letter);

    }

    document.addEventListener("keypress", handleKeyPress);

    document.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
            playSound();
            event.preventDefault();
            enviarpalabras();
        }
        if (event.key === "Backspace") {
            handleDeleteLetter();
            playSound();
            return;
        }
    });
});


