var Player = function(){
  return {
    nickname: null,
    mark: null,
    max_in_a_row: 0,
    is_playing: false
  }
};

var Game = function(){
  return {
    board: [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],
    dom_board: null,
    marks_count: 0,
    current_player: 0,
    marks: [[false,false,false],[false,false,false],[false,false,false]],
    startGame: function(){
      this.board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
      this.marks_count = 0;
      this.current_player = Math.round(Math.random());
      this.dom_board = document.querySelectorAll("#boardgame>ul>li");
      this.dom_board.forEach(function(element, index){
        element.textContent = "";
      });
    },
    getMark: function(){
      if(this.current_player === 0){
        return "O";
      }else{
        return "X";
      }
    },
    checkMark: function(x,y,count){
      if(this.current_player === this.board[x][y] && !this.marks[x][y]){
        console.log(this.marks);
        this.marks[x][y] = true;
        count += 1;
        if(count !== 3){
            if(y-1 >= 0){ // check top
              console.log("top");
               this.checkMark(x,y-1,count );
            }
            if(x+1 < 3 ){// check right
              console.log("right");
               this.checkMark(x+1,y,count);
            }
            if(y+1 < 3){// check bottom
              console.log("bottom");
               this.checkMark(x,y+1,count );
            }
            if(x-1 >= 0){// check left
              console.log("left");
               this.checkMark(x-1,y,count );
            }
            return false;
        }
        return "winner";
      }else{
        return false;
      }
    },
    playerMove: function(){
      var self = this;
        return function(){
          if(this.textContent !== "1" && this.textContent !== "0"){
            x = Number(this.getAttribute("data-x"));
            y = Number(this.getAttribute("data-y"));
            self.board[x][y] = self.current_player;
            self.marks_count = 1 + Number(self.marks_count) ;
            this.textContent = self.getMark();
            console.log(self.checkMark(x,y,1));
            self.marks = [[false,false,false],[false,false,false],[false,false,false]]
            if(self.current_player === 0){
              self.current_player = 1;
            }else{
              self.current_player = 0;
            }
          }
        };
    }
  }
};


document.addEventListener("DOMContentLoaded", function(event){
  var game = Game();
  game.startGame();
  console.log(game);
  game.dom_board.forEach(function(element, index){
    element.addEventListener("click", game.playerMove());
  });
});
