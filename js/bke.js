import Player from "./Player.js";

const players = [ ];
let currentPlayer = 0;
const fields = document.querySelectorAll('.grid-item');
const resetButton = document.querySelector(".reset-btn");
let playerOne;
let playerTwo;

const player_one_name_container = document.querySelector('.player-1-name');
const player_two_name_container = document.querySelector('.player-2-name');


for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    field.addEventListener("click", function() {
        addSymbolToField(field);
    });
}

resetButton.addEventListener("click", resetGame);

function requestUsers() {
    player_one_name_container.textContent = "";
    player_two_name_container.textContent = "";
    players.length = 0;

    setTimeout(function() {
        playerOne = new Player(prompt("Player 1 naam"), "X");
        playerTwo = new Player(prompt("Player 2 naam"), "O");
        players.push(...[playerOne, playerTwo]);
    
        player_one_name_container.textContent = playerOne.name;
        player_two_name_container.textContent = playerTwo.name;
    }, 1);
}

requestUsers();

// Symbool word toegevoegd
function addSymbolToField(field) {
    const fieldContent = field.textContent;
    if (fieldContent === 'X' || fieldContent === 'O') {
        alert('This field can not be used');
    }
    else{
        if (currentPlayer == 0){
            field.textContent = "X";
            currentPlayer = 1;
        }
        else{
            field.textContent = "O";
            currentPlayer = 0;
        }
        setTimeout(function() {
            checkWinner();
        }, 100);
    }

}

// Alle winlijnen checken
function checkWinner() {
    const winline1 = [fields[0].textContent, fields[1].textContent, fields[2].textContent];
    const winline2 = [fields[3].textContent, fields[4].textContent, fields[5].textContent];
    const winline3 = [fields[6].textContent, fields[7].textContent, fields[8].textContent];
    const winline4 = [fields[0].textContent, fields[3].textContent, fields[6].textContent];
    const winline5 = [fields[1].textContent, fields[4].textContent, fields[7].textContent];
    const winline6 = [fields[2].textContent, fields[5].textContent, fields[8].textContent];
    const winline7 = [fields[0].textContent, fields[4].textContent, fields[8].textContent];
    const winline8 = [fields[2].textContent, fields[4].textContent, fields[6].textContent];

    if (winline1[0] == "X" && winline1[1] == "X" && winline1[2] == "X") {
            alert("Player 1 heeft gewonnen!");
    }
    if (winline1[0] == "O" && winline1[1] == "O" && winline1[2] == "O") {
            alert("Player 2 heeft gewonnen!");
    }
    if (winline2[0] == "X" && winline2[1] == "X" && winline2[2] == "X") {
            alert("Player 1 heeft gewonnen!");
    }
    if (winline2[0] == "O" && winline2[1] == "O" && winline2[2] == "O") {
            alert("Player 2 heeft gewonnen!");
    }
    if (winline3[0] == "X" && winline3[1] == "X" && winline3[2] == "X") {
            alert("Player 1 heeft gewonnen!");
    }
    if (winline3[0] == "O" && winline3[1] == "O" && winline3[2] == "O") {
            alert("Player 2 heeft gewonnen!");
    }
    if (winline4[0] == "X" && winline4[1] == "X" && winline4[2] == "X") {
            alert("Player 1 heeft gewonnen!");
    }
    if (winline4[0] == "O" && winline4[1] == "O" && winline4[2] == "O") {
            alert("Player 2 heeft gewonnen!");
    }
    if (winline5[0] == "X" && winline5[1] == "X" && winline5[2] == "X") {
            alert("Player 1 heeft gewonnen!");
    }
    if (winline5[0] == "O" && winline5[1] == "O" && winline5[2] == "O") {
            alert("Player 2 heeft gewonnen!");
    }
    if (winline6[0] == "X" && winline6[1] == "X" && winline6[2] == "X") {
            alert("Player 1 heeft gewonnen!");
    }
    if (winline6[0] == "O" && winline6[1] == "O" && winline6[2] == "O") {
            alert("Player 2 heeft gewonnen!");
    }
    if (winline7[0] == "X" && winline7[1] == "X" && winline7[2] == "X") {
            alert("Player 1 heeft gewonnen!");
    }
    if (winline7[0] == "O" && winline7[1] == "O" && winline7[2] == "O") {
            alert("Player 2 heeft gewonnen!");
    }
    if (winline8[0] == "X" && winline8[1] == "X" && winline8[2] == "X") {
            alert("Player 1 heeft gewonnen!");
    }
    if (winline8[0] == "O" && winline8[1] == "O" && winline8[2] == "O") {
            alert("Player 2 heeft gewonnen!");
    }
}

function resetGame() {
    currentPlayer = 0;
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        field.textContent = "-";
    }

    requestUsers();
}
