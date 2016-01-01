var resetGame= false;
var pauseScore= false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 50;
    this.y = 50;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(dt >= 0){
       this.x = this.x + (this.x*dt);
    }
    if(this.x <= 400)
    {
      this.x = this.x+(this.x*dt);
    }
    else
    {
      // enemy bug is at the edge of the canvas. Need to reposition to beginning.
      this.x = 50;
      // enemy could turn around and come back.
      ctx.save(); // save current state
      ctx.rotate(Math.PI); // rotate
      this.render();
      ctx.restore(); // restore original states (no rotation etc)
    }
};

Enemy.prototype.getXY = function() {
   var enemy_xy = {enemy_x:this.x,enemy_y:this.y};
   return enemy_xy;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Draw the enemy on the screen, required method for game

var Player = function() {
    // Variables applied to each of our instances go here,

    // The image/sprite for our player, this uses
    // a helper provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.moveUp = false;
    this.score = 0;
    this.lives = 3;  // should be called livesLeft since that is what this represents.
    this.maxLives = 3;
    this.startScore = 0;
    this.quitGame = false; //player wants to quit game if quitGame is true. The game has to be reset to start, lives 
    // should be set to maxLives, startScore should be set to 0. Player and enemy bug need to be placed in initial start position.
    this.continueGame = true; //player wants to continue game 
    this.pauseUpdate = false; //player wants to continue game 
}

Player.prototype.setPauseUpdate = function(toPause) {
  this.pauseUpdate = toPause;   
};

Player.prototype.getPauseUpdate = function() {
  return this.pauseUpdate;   
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.setContinueGame = function(toContinue) {
  this.continueGame = toContinue;   
};
Player.prototype.getContinueGame = function() {
  return this.continueGame;   
};

Player.prototype.setQuitGame = function(toQuitOrNotToQuit) {
  this.quitGame = toQuitOrNotToQuit;   
};

Player.prototype.getQuitGame = function() {
  return this.quitGame;   
};

Player.prototype.setInitialPos = function(initialX,initialY) {
    // this function sets the initial position for the player. 
    // ToDo: arguments for x and y could be passed in and could be used to   
    this.x = initialX;
    this.y = initialY;

}
Player.prototype.getScore = function() {
   return this.score;
}

Player.prototype.getLives = function() {
   return this.lives;
}

Player.prototype.setLives = function(lives) {
   this.lives = lives;
}
Player.prototype.setScore = function(score) {
   this.score = score;
}
Player.prototype.getStartScore = function() {
   return this.startScore;
}
Player.prototype.getMaxLives = function() {
   return this.maxLives;
}



// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(enemy,dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // get current player coordinates.
    var player_cur_x = this.x;
    var player_cur_y = this.y;
    var enemy_cur = enemy.getXY();
    var enemy_cur_x = enemy_cur.enemy_x;
    var enemy_cur_y = enemy_cur.enemy_y;
    // calculate difference between enemy and player positions. 
    var xdiff = Math.abs(player_cur_x - enemy_cur_x);
    var ydiff = Math.abs(player_cur_y - enemy_cur_y);
    var qg = this.getQuitGame(); 
    // if diff in x positions is less than 10px then the game ends.
    //if((xdiff <= 10) && (ydiff <=10)  && (qg === false) ) 
    if((xdiff <= 10) && (ydiff <=10)  && (resetGame === false) ) 
    {
       // reset player and enemy positions.
       // pop-up with qn
       resetGame = true;
       // reset player and enemy to their initial positions.
       this.setInitialPos(200,400);
       enemy.x = 50;
       enemy.y = 50;
       // display dialog informing the user that the game has ended
       //$("#resetGame").dialog();

       $('#scoreVal').text(this.getScore());
       $('#livesLeft').text(this.getLives());
       // stop enemy bug position updates.
       // stopping position updates is done in engine.js depending on the value of the global boolean variable resetGame.
       //The update function in engine.js is does not get called if resetGame is false.

       pauseScore = true;
       if( this.getLives() > 0)
       {
         $("div#continueGame").dialog({
            resizable: false,
            height:140,
            modal: true,
            buttons: {
              'Continue': function() {
                 player.setLives(player.getLives() - 1);   
                 player.setScore(player.getScore()); // need to make number-of-lives a member variable of player 
                 /*player.setQuitGame(false); // need to make number-of-lives a member variable of player 
                 player.setContinueGame(true); // need to make number-of-lives a member variable of player 
                 player.setPauseUpdate(true);*/
                 resetGame = false; // resetting game because the player wants to quit. 
                 pauseScore = false; 
                 $(this).dialog("close");
               },
               'Quit': function() {
                 player.setLives(player.getMaxLives()); // need to make number-of-lives a member variable of player 
                 player.setScore(player.getStartScore()); // need to make number-of-lives a member variable of player 
                 /*player.setQuitGame(true); // need to make number-of-lives a member variable of player 
                 player.setContinueGame(false); // need to make number-of-lives a member variable of player */ 
                 resetGame = false; // resetting game because the player wants to quit.  
                 pauseScore = false; 
                 $('#scoreVal').text(player.getStartScore());
                 $('#livesLeft').text(player.getMaxLives());
                 $(this).dialog("close");
               }
            }
         });
 
       }
       
       if( this.getLives() === 0)
       {
          // display dialog - restart game.
         $("div#continueGame").dialog('close');
         $("div#restartGame").dialog({
            resizable: false,
            height:140,
            modal: true,
            buttons: {
              'Restart': function() {
                 $(this).dialog("close");
                 // reset player lives to 3 since he is restarting the game. 
                 player.setLives(player.getMaxLives()); // need to make number-of-lives a member variable of player 
                 player.setScore(player.getStartScore()); // need to make number-of-lives a member variable of player 
                 resetGame = false; // game has been un-reset, game can go on.
                 /*player.setQuitGame(true); // need to make number-of-lives a member variable of player 
                 player.setContinueGame(false); // need to make number-of-lives a member variable of player 
                 player.setPauseUpdate(true); */
                 pauseScore = false; 
                 $(this).dialog("close");
               },
               'Quit': function() {
                 player.setLives(player.getMaxLives()); // need to make number-of-lives a member variable of player 
                 player.setScore(player.getStartScore()); // need to make number-of-lives a member variable of player 
                 /*player.setQuitGame(true); // need to make number-of-lives a member variable of player 
                 player.setContinueGame(false); // need to make number-of-lives a member variable of player */ 
                 resetGame = false; // resetting game because the player wants to quit.  
                 pauseScore = false; 
                 $(this).dialog("close");
               }
            }
         });

       }
 

       console.log("xdiff:  " + xdiff + " " + "ydiff:  " + ydiff  + "\n");  
       console.log("enemy-x:  " + enemy_cur_x + " " + "player-x:  " + player_cur_x ); 
    }

}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.dieOnce = function() {
   if(this.getLives() > 3){
     player.lives = player.lives - 1;
     return player.lives;
   }
   else
      return 99;  
}

Player.prototype.handleInput = function(keyCode) {
   // switch between diff possible key presses.
   //if((this.getQuitGame() === false) || (this.getContinueGame() === true)){
   if( resetGame === false){

     switch(keyCode)
     {
       case 'left':
            if(this.x <= 10)
            {
              this.x = 10;
            }
            else
            {
              this.x = this.x - 25;
            }
            this.moveUp = false;
            break;
       case 'up':
            // move up.
            if(this.y <= 10)
            {
              this.y = 10;
            }
            else
            {
              this.y = this.y - 25;
            }
            this.moveUp = true;
            if(pauseScore === false) 
            //if(this.resetGame !== true) 
            {
               this.score = this.score + 10;
            }
            $('#scoreVal').text(player.getScore());
            break;
       case 'right':
            if(this.x >= 410)
            {
              this.x = 410;
            }
            else
            {
              this.x = this.x + 25;
            }
            this.moveUp = false;
            break;
       case 'down':
            if(this.y >= 410)
            {
              this.y = 410;
            }
            else
            {
              this.y = this.y + 25;
            }
            this.moveUp = false;
            break;
       default:
            break;
     }
   } 
    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var bug =  new Enemy();
allEnemies.push(bug);
var player = new Player();
// set player's initial position.
player.setInitialPos(200,400);
var score = player.getScore();


 
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
