let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let guess = document.querySelector('.guess');
let button = document.querySelector('.button');
let answer = document.querySelector('.answer');
let attempts = document.querySelector('.attempts')

let words = ['luffy', 'zoro', 'nami', 'usopp', 'chopper', 'robin', 'franky', 'brook', ' jimbey', 'vivi', 'arlong',  'aladine', 'banchi', 'kuma', 'bentham', 'bellamy', 'buchi', 'caesar', 'camie', 'katakuri', 'pudding', 'chew', 'doflamingo', 'rosinante', 'mihawk', 'whitebeard', 'enel', 'kid', 'enishida', 'fukurou', 'gatherine', 'iceburg', 'foxe', 'gin', 'hancock', 'rayleigh', 'bartolomeo'];
let randomWords = words[Math.floor(Math.random() * words.length)]

let answerArray = [];
let remainigLetters = randomWords.length;
let remainigAttempts = 6;

let hangingMan = {
    5: function drawHead() {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(390, 300, 20, 0, Math.PI * 2, false); // head
    ctx.stroke();
},
4: function drawBody() {
    ctx.moveTo(390, 320);
    ctx.lineTo(390, 400); // body
    ctx.stroke();
},
3: function drawLeftHand() {
    ctx.moveTo(390, 340);
    ctx.lineTo(370, 380); // left hand
    ctx.stroke();
},
2: function drawRightHand() {
    ctx.moveTo(390, 340);
    ctx.lineTo(410, 380); // right hand
    ctx.stroke();
},
1: function drawLeftLeg() {
    ctx.moveTo(390, 400);
    ctx.lineTo(370, 440); // left leg
    ctx.stroke();
},
0: function drawRightLeg() {
    ctx.moveTo(390, 400);
    ctx.lineTo(410, 440); // right leg
    ctx.stroke();
    },
};

//Draw gallows
ctx.fillStyle = 'white';
ctx.fillRect(225, 475, 75, 25);
ctx.fill();
ctx.beginPath();
ctx.lineWidth = 8;
ctx.moveTo(265, 475);
ctx.lineTo(265, 200);
ctx.lineTo(400, 200);
ctx.stroke();
ctx.lineWidth = 6;
ctx.moveTo(390, 200);
ctx.lineTo(390, 280);
ctx.strokeStyle = 'White'
ctx.stroke();

let drawIncorrectguess = function (guess, index) {
    ctx.font = "20px Comic Sans MS";
    ctx.fillText(guess.value.toUpperCase(), 500, (index * 25) + 280);
    ctx.moveTo(496, (index * 25) + 272);
    ctx.lineTo(520, (index * 25) + 272);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'White'
    ctx.stroke();
    
};

function game() {
    for (let i = 0; i < randomWords.length; i++) {
        answerArray.push('_')
    }
    answer.innerHTML = answerArray.join(' ')
};

function checkGuess(guess) {
    if (guess.value.length !== 1) {
        alert('Please, enter a single letter')
    }
    if (randomWords.includes(guess.value.toLowerCase())) {
        for (let i = 0; i < randomWords.length; i++) {
            if (randomWords[i] === guess.value.toLowerCase()) {
                answerArray[i] = guess.value.toLowerCase();
                answer.innerHTML = answerArray.join(' ');
                remainigLetters--;
            }
        }
    } else {
        remainigAttempts--;
        hangingMan[remainigAttempts]();
        drawIncorrectguess(guess,remainigAttempts)
    }

    guess.value = '';

    if (remainigLetters === 0) {
        setTimeout(() => {
            alert(answerArray.join(' '));
            alert('Great job! The answer was a ' + randomWords);
        }, 0);
        guess.remove();
        button.remove();
    }
    if (remainigAttempts === 0) {
        setTimeout(() => { alert('You lose') }, 0);
        guess.remove();
        button.remove();
    }
};
button.addEventListener('click', () => checkGuess(guess));

guess.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        checkGuess(guess);
    }
});

game()