var resetGame= false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // (50,50) is the enemy bug's initial position.
    this.x = 50;
    this.y = 50;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Enemy bug moves at a constant speed along the x axis.
    if( dt >= 0 )
    {
      if(this.x <= 500)
      {
        // as long as enemy bug is inside the canvas , update the enemy bug's position.
        this.x = this.x+( 150 *dt);
      }
      else
      {
        // once enemy bug is outside the canvas, update his x coordinate so he starts appearing from the left of the canvas/screen.
        
        this.x = -(Math.random() * 400);
      }
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

var CatGirl = function(){
    //Enemy.call(this);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
    // (50,50) is the enemy bug's initial position.
    this.x = 200;
    this.y = 200;

};

CatGirl.prototype = Object.create(Enemy.prototype);
// Set constructor of Car object to Car's constructor above.
CatGirl.prototype.constructor = CatGirl;   // nothing special in CatGirl's constructor but it could have specific functionality

CatGirl.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Enemy bug moves at a constant speed along the x axis.
    if( dt >= 0 )
    {
      if(this.x <= 500)
      {
        // as long as enemy bug is inside the canvas , update the enemy bug's position.
        this.x = this.x+( 150 *dt);
      }
      else
      {
        // once enemy bug is outside the canvas, update his x coordinate so he starts appearing from the left of the canvas/screen.

        this.x = -(Math.random() * 1000);
      }
    }
};
// Draw the enemy on the screen, required method for game
CatGirl.prototype.render = function() {
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
    this.score = 0; // running score, this gets updated as long as player has lives left and is continuing the game; player has not decided to restart the game, restarting the game will reset this variable to 0.`
    this.lives = 3;  // number of lives left for the player
    this.maxLives = 3;
    this.startScore = 0;
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

// This function determines if the player has won- reached the water.
Player.prototype.hasWon = function() {
    if(player.y <= 10 )
    {
         player.setInitialPos(200,400);
         resetGame = true;
         $("div#wonGame").dialog({
            resizable: false,
            height:140,
            modal: true,
            buttons: {
              'PlayAgain': function() {
                 resetGame = false;
                 player.setLives(player.getMaxLives());
                 player.setScore(player.getStartScore());
                 $('#scoreVal').text(player.getScore());
                 $('#livesLeft').text(player.getLives());
                 $(this).dialog("close");
               },
               'Quit': function() {
                 player.setLives(player.getMaxLives());
                 player.setScore(player.getStartScore());
                 $('#scoreVal').text(player.getStartScore());
                 $('#livesLeft').text(player.getMaxLives());
                 $(this).dialog("close");
               }
            }
         });
    }
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(enemy,dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // get current player coordinates.
    var player_cur_x = player.x;
    var player_cur_y = player.y;
    var enemy_cur = enemy.getXY();
    var enemy_cur_x = enemy_cur.enemy_x;
    var enemy_cur_y = enemy_cur.enemy_y;
    // calculate difference between enemy and player positions. 
    var xdiff = Math.abs(player_cur_x - enemy_cur_x);
    var ydiff = Math.abs(player_cur_y - enemy_cur_y);


    //if((xdiff <= 10) && (ydiff <=10) ) 
    // if diff in x or y positions of enemy and player is less than 10px then the game ends.
    if(Math.max(xdiff,ydiff) <= 10)
    {
       // reset player and enemy to their initial positions because player has lost a life.
       player.setInitialPos(200,400);
       enemy.x = 50;
       enemy.y = 50;
       catGirl.x = 200;
       catGirl.y = 200;
       // display score and number of lives left
       $('#scoreVal').text(this.getScore());
       $('#livesLeft').text(this.getLives());

       // stop enemy bug position updates because player has just lost a life.
       // stopping position updates is done in engine.js depending on the value of the global boolean variable resetGame.
       //The update function in engine.js is does not get called if resetGame is false.

       resetGame = true;
       if( player.getLives() > 0)
       {
          // player still has lives left
          // player and enemy bug have been placed in their initial position. 
          player.setLives(player.getLives() -1);
          $('#livesLeft').text(player.getLives());
          resetGame = false; // resetting game. 
       }
       
       if( this.getLives() === 0)
       {
          // player has lost all lives 
          // display dialog - restart game.
         $("div#restartGame").dialog({
            resizable: false,
            height:140,
            modal: true,
            buttons: {
              'Restart': function() {
                 resetGame = false; // resetGame is set to false so game can continue. handleInput and enemy position updates
                                    // dont happen when resetGame is true.  
                 player.setLives(player.getMaxLives()); // reset number of lives for player to max (3 lives) 
                 player.setScore(player.getStartScore()); // reset score to zero because game is restarting. 
                 $('#scoreVal').text(player.getStartScore());  // update UI with score.
                 $('#livesLeft').text(player.getMaxLives());  // update UI with number of lives.
                 $(this).dialog("close");
               },
               'Quit': function() {
                 player.setLives(player.getMaxLives()); //  
                 player.setScore(player.getStartScore()); //  
                 $('#scoreVal').text(player.getStartScore());
                 $('#livesLeft').text(player.getMaxLives());
                 $(this).dialog("close");
               }
            }
         });

       }
       console.log("xdiff:  " + xdiff + " " + "ydiff:  " + ydiff  + "\n");  
       console.log("enemy-x:  " + enemy_cur_x + " " + "player-x:  " + player_cur_x ); 
    }

}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.handleInput = function(keyCode) {
   // switch between diff possible key presses.
   // player moves /responds to key presses when resetGame is false.
   // player gets 10 points every time he moves forward - forward = y-coordinate gets closer to zero.    
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
            //this.moveUp = false;
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
            //this.moveUp = true;
            this.score = this.score + 10;
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
            //this.moveUp = false;
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
            //this.moveUp = false;
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
var catGirl =  new CatGirl();
allEnemies.push(bug);
allEnemies.push(catGirl);

var player = new Player();

// set player's initial position.
player.setInitialPos(200,400);


 
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
