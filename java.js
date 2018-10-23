let hint = document.getElementById('hint');
//buttons
const submitButton = document.getElementById('submitButton');
const hintButton = document.getElementById('hintButton');
const resetButton = document.getElementById('resetButton');
//hint values
let hint0 = document.getElementById('hintOne');
let hint1 = document.getElementById('hintTwo');
let hint2 = document.getElementById('hintThree');
let hint3 = document.getElementById('hintFour');
//user num input
const numInput = document.getElementById('numInput');

//game logic
class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        return Math.abs(this.winningNumber - this.playersGuess);
    }

    isLower() {
        return (this.playersGuess < this.winningNumber);
    }

    playersGuessSubmission(num) {
        if (num < 1 || num > 100 || typeof num !== 'number') {
            hint.innerHTML = 'Number must be bewteen 0 & 100';
            throw 'That is an invalid guess.';
        }
        this.playersGuess = num;
        return this.checkGuess(this.playersGuess);
    }
    checkGuess(num) {
        let feedback = '';       
        if (num === this.winningNumber) feedback = 'You Win!';
        else if (this.pastGuesses.includes(num)) feedback =  'You have already guessed that number';
        else {
            this.pastGuesses.push(this.playersGuess);
            if (this.pastGuesses.length === 5) feedback =  `You Lose, Winning Number Was ${game.winningNumber}`;
            else{
                let diff = this.difference();
                if (diff < 10) feedback =  'You\'re burning up!';
                else if (diff < 25 && diff > 10) feedback =  'You\'re lukewarm';
                else if (diff < 50 && diff > 25) feedback =  'You\'re a bit chilly';
                else feedback =  'You\'re ice cold!';
            }
            document.getElementById(`num${this.pastGuesses.length}`).innerHTML = this.playersGuess;
        }
        document.getElementById('hint').innerHTML = feedback;
    }
}

function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
}

//initiate game
let game = newGame();

function newGame() {
    let list = document.querySelectorAll('li');
    for (let i = 0; i < list.length; i++){
        list[i].innerText = '';
    }
    hint.innerHTML = 'Enter A Number Between 0 & 100';
    return new Game;
}

function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

//  if enter is pressed
numInput.addEventListener('keyup', function(e) {
    if (e.key == 'Enter'){
        console.log('enter working');
        let numInputValue = +document.getElementById('numInput').value;
        game.playersGuessSubmission(numInputValue);
        numInput.value = '';
    }
});

//if submit is clicked
submitButton.addEventListener('click', function() {
    let numInputValue = +document.getElementById('numInput').value;
    game.playersGuessSubmission(numInputValue);
    numInput.value = '';
})

//if hint is pressed
hintButton.addEventListener('click', function() {
    let hintArray = [game.winningNumber];

    for (let i = 1; i < 4; i++){
        hintArray[i] = generateWinningNumber();
    }

    hintArray = shuffle(hintArray);

    hint0.innerHTML = hintArray[0];
    hint1.innerHTML = hintArray[1];
    hint2.innerHTML = hintArray[2];
    hint3.innerHTML = hintArray[3];

    hint0.style.display = 'block';
    hint1.style.display = 'block';
    hint2.style.display = 'block';
    hint3.style.display = 'block';
});

//if reset is clicked
resetButton.addEventListener('click', function() {
    game = newGame();
    hint0.style.display = 'none';
    hint1.style.display = 'none';
    hint2.style.display = 'none';
    hint3.style.display = 'none';
})