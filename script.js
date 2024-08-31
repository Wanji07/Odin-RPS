const btnChoices = document.querySelectorAll('#btnRock, #btnPaper, #btnScissors');
const resetBtn = document.getElementById("resetBtn");

let computerScore = 0;
let humanScore = 0;
let roundsPlayed = 0;
let gameEnded = false;

function getComputerChoice() {
    let botChoice;
    let percentage = Math.floor(Math.random() * 100) + 1;
    if (percentage <= 33) {
        botChoice = "Rock";
        document.getElementById("rockImg").style.opacity = "1";
        document.getElementById("rockImg").style.display = "block";
        document.getElementById("paperImg").style.opacity = "0";
        document.getElementById("paperImg").style.display = "none";
        document.getElementById("scissorsImg").style.opacity = "0";
        document.getElementById("scissorsImg").style.display = "none";
    } else if (percentage <= 66) {
        botChoice = "Paper";
        document.getElementById("paperImg").style.opacity = "1";
        document.getElementById("paperImg").style.display = "block";
        document.getElementById("rockImg").style.opacity = "0";
        document.getElementById("rockImg").style.display = "none";
        document.getElementById("scissorsImg").style.opacity = "0";
        document.getElementById("scissorsImg").style.display = "none";
    } else {
        botChoice = "Scissors";
        document.getElementById("scissorsImg").style.opacity = "1";
        document.getElementById("scissorsImg").style.display = "block";
        document.getElementById("paperImg").style.opacity = "0";
        document.getElementById("paperImg").style.display = "none";
        document.getElementById("rockImg").style.opacity = "0";
        document.getElementById("rockImg").style.display = "none";
    }
    console.log("The bot's choice is: " + botChoice);
    console.log("Percentage is:" + " " + percentage + "%");
    return botChoice;
}

btnChoices.forEach(btn => {
    btn.addEventListener("click", function() {
        if (gameEnded) return;

        const humanChoice = this.textContent;
        const botChoice = getComputerChoice();
        console.log("The user's choice is: " + humanChoice + "!");
        playRound(humanChoice, botChoice);
        roundsPlayed++;
        document.getElementById("humanScore").innerHTML = humanScore;
        document.getElementById("botScore").innerHTML = computerScore;

        if (roundsPlayed === 5) {
            playGame();
            gameEnded = true;
            displayGameResult();
        }
    });
});

resetBtn.addEventListener("click", function() {
    reset();
    const msgWinner = document.querySelector('.msgWinner');
    msgWinner.classList.remove('show');
    document.getElementById("humanScore").innerHTML = 0;
    document.getElementById("botScore").innerHTML = 0;
    document.getElementById("winner").innerHTML = "";
    document.getElementById("rockImg").style.opacity = "0";
    document.getElementById("paperImg").style.opacity = "0";
    document.getElementById("scissorsImg").style.opacity = "0";
    gameEnded = false;  // Reset flag to allow new game
});

function reset() {
    roundsPlayed = 0;
    computerScore = 0;
    humanScore = 0;
    console.log("Game has been reset.");
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === "Rock") {
        if (computerChoice === "Scissors") {
            document.getElementById("winner").innerHTML = "You win!";
            humanScore++;
        } else if (computerChoice === "Rock") {
            document.getElementById("winner").innerHTML = "It's a tie!";
        } else {
            document.getElementById("winner").innerHTML = "You lose!";
            computerScore++;
        }
    } else if (humanChoice === "Paper") {
        if (computerChoice === "Rock") {
            document.getElementById("winner").innerHTML = "You win!";
            humanScore++;
        } else if (computerChoice === "Paper") {
            document.getElementById("winner").innerHTML = "It's a tie!";
        } else {
            document.getElementById("winner").innerHTML = "You lose!";
            computerScore++;
        }
    } else if (humanChoice === "Scissors") {
        if (computerChoice === "Paper") {
            document.getElementById("winner").innerHTML = "You win!";
            humanScore++;
        } else if (computerChoice === "Scissors") {
            document.getElementById("winner").innerHTML = "It's a tie!";
        } else {
            document.getElementById("winner").innerHTML = "You lose!";
            computerScore++;
        }
    }
}

function playGame() {
    console.log("======================");
    console.log("Final Results:");
    console.log("Human Score: " + humanScore);
    console.log("Bot Score: " + computerScore);
    console.log("======================");
}

function displayGameResult() {
    const msgWinner = document.querySelector('.msgWinner');
    if (humanScore > computerScore) {
        document.getElementById("gameWinner").innerHTML = "You won";
    } else if (humanScore < computerScore) {
        document.getElementById("gameWinner").innerHTML = "You lost";
    } else {
        document.getElementById("gameWinner").innerHTML = "You tied";
    }
    msgWinner.classList.add('show');
}