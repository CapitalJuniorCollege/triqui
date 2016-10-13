/*jslint esversion:6 */
/*
 * Game Object Definition
 */
const gamer1 = "x";
const gamer2 = "o";
var game = {}; // new Object();
game.turn = gamer1;//takes values beetwen 0 and 1, if 0 turn of X, if 1 turn of O,
game.over = false;
game.winner = null;
game.board = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
game.nextTurn = function(){
  if(game.turn === gamer1){
    game.turn = gamer2;
  }else{
    game.turn = gamer1;
  }
  return game.turn;
};
/*
 * END Game Object Definition
 */

document.addEventListener("DOMContentLoaded",function(){
  //Here must be only what need Dom elements
  var row0 = document.querySelectorAll("#boardgame li[data-y='0']");
  var row1 = document.querySelectorAll("#boardgame li[data-y='1']");
  var row2 = document.querySelectorAll("#boardgame li[data-y='2']");
  var playing_info = document.querySelectorAll("#game-info .player");
  playing_info = Array.from(playing_info);
  game.board[0] = Array.from(row0);
  game.board[1] = Array.from(row1);
  game.board[2] = Array.from(row2);
  //board ready
  game.board.forEach(function(row,index,board){
    //add click behavior per cell
    row.forEach(function(cell, index, row){
        cell.addEventListener("click",function(){
          cell.textContent = game.turn;
          if(game.nextTurn() === gamer1){
            playing_info[0].querySelector(".status").textContent = "Juega";
            playing_info[1].querySelector(".status").textContent = "Espera";
          }else{
            playing_info[0].querySelector(".status").textContent = "Espera";
            playing_info[1].querySelector(".status").textContent = "Juega";
          }

        });
    });//for each of row
  });//for each of board
});


















//
