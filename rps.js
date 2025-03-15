let userscore = 0;
let compscore = 0;
const choices = document.querySelectorAll(".choice");
const userScoreDisplay = document.getElementById("user-sc");
const compScoreDisplay = document.getElementById("comp-sc");
const messageDisplay = document.getElementById("msg");
const resetButton = document.getElementById("reset");

const getcomchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const i = Math.floor(Math.random() * 3);
    return options[i];
};

const drawgame = () => {
    messageDisplay.textContent = "It's a draw!";
    messageDisplay.style.color="white";
};

const showwinner = (userwin) => {
    if (userwin) {
        userscore++;
        messageDisplay.textContent = "You Win This Round!";
        messageDisplay.style.color="green";
    } else {
        compscore++;
        messageDisplay.textContent = "You Lose This Round!";
        messageDisplay.style.color="red";
    }
    userScoreDisplay.textContent = userscore;
    compScoreDisplay.textContent = compscore;

    // Check if game reaches 10 points
    if (userscore === 10 || compscore === 10) {
        endGame(userscore === 10 ? "You Win!" : "You Lose!");
    }
};

const playGame = (userchoice) => {
    if (userscore === 10 || compscore === 10) return; // Stop game if max score is reached

    const compchoice = getcomchoice();

    if (userchoice === compchoice) {
        drawgame();
        return;
    }

    let userwin = false;
    if (userchoice === "rock") {
        userwin = compchoice === "scissors"; 
    } else if (userchoice === "paper") {
        userwin = compchoice === "rock";
    } else {
        userwin = compchoice === "paper"; 
    }

    showwinner(userwin);
};

const endGame = (result) => {
    // Create popup
    const popup = document.createElement("div");
    popup.id = "gamePopup"; // Give an ID to remove later
    popup.textContent = result;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.padding = "50px";
    popup.style.borderRadius = "10px";
    popup.style.color = "white";
    popup.style.fontSize = "2rem";
    popup.style.fontWeight = "bold";
    popup.style.textAlign = "center";
    popup.style.backgroundColor = result === "You Win!" ? "green" : "red";
    document.body.appendChild(popup);
    
    // Disable further clicks
    choices.forEach(choice => choice.style.pointerEvents = "none");
};

// Reset Game
const resetGame = () => {
    userscore = 0;
    compscore = 0;
    userScoreDisplay.textContent = userscore;
    compScoreDisplay.textContent = compscore;
    messageDisplay.textContent = "Play";
    
    // Remove popup if it exists
    const popup = document.getElementById("gamePopup");
    if (popup) {
        popup.remove();
    }

    // Re-enable choice buttons
    choices.forEach(choice => choice.style.pointerEvents = "auto");
};

// Add event listeners
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playGame(userchoice);
    });
});

resetButton.addEventListener("click", resetGame);
