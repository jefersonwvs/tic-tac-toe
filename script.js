'use strict';

const board = [' ', ' ', ' ',
               ' ', ' ', ' ',
               ' ', ' ', ' '];

let isPlaying = true;
const scores = [0, 0];
let activePlayer = 0;

const playerO = document.querySelector('#player-0');
const playerX = document.querySelector("#player-1");
const scorePlayerX = document.querySelector('.score--1');
const scorePlayerO = document.querySelector('.score--0');
const positions = document.querySelectorAll('.position');

scorePlayerX.textContent = scores[1];
scorePlayerO.textContent = scores[0];
newGame();

for (let i = 0; i < positions.length; i++) {
   positions[i].addEventListener('click', function () {
      if (isPlaying) {
         if (board[i] === ' ') {
            let position = '';
            let mark = ' ';
            if (activePlayer === 1) {
               position = `<div class="x"><div class="x-1"></div><div class="x-2"></div></div>`;
               mark = 'x';
            } else {
               position = `<div class="circle"></div>`;
               mark = 'o';
            }
            positions[i].innerHTML = position;
            board[i] = mark;

            if (thePlayerWon(activePlayer)) {
               const scoreWinner = document.querySelector(
                  `.score--${activePlayer}`
               );
               console.log(`Player ${activePlayer} is the winner!`);
               scores[activePlayer]++;
               scoreWinner.textContent = scores[activePlayer] + "";
               isPlaying = false;
            } else {
               if (board.every((mark) => mark !== ' ')) {
                  //console.log('Temos um empate!');
                  scores[1]++;
                  scores[0]++;
                  scorePlayerX.textContent = scores[1];
                  scorePlayerO.textContent = scores[0];
                  isPlaying = false;
               } else {
                  activePlayer = activePlayer === 1 ? 0 : 1;
               }
            }
         }
      } else {
         newGame();
      }
   });
}

function thePlayerWon(player) {
   const mark = player === 1 ? 'x' : 'o';

   return (
      (board[0] === mark && board[1] === mark && board[2] === mark) ||
      (board[3] === mark && board[4] === mark && board[5] === mark) ||
      (board[6] === mark && board[7] === mark && board[8] === mark) ||
      (board[0] === mark && board[3] === mark && board[6] === mark) ||
      (board[1] === mark && board[4] === mark && board[7] === mark) ||
      (board[2] === mark && board[5] === mark && board[8] === mark) ||
      (board[0] === mark && board[4] === mark && board[8] === mark) ||
      (board[2] === mark && board[4] === mark && board[6] === mark)
   );
}

function newGame() {
   for (let i = 0; i < board.length; i++) {
      board[i] = ' ';
      positions[i].innerHTML = ' ';
   }
   activePlayer = activePlayer === 1 ? 0 : 1;
   isPlaying = true;
}
