var resetGame = false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
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
    if (dt >= 0) {
        if (this.x <= 500) {
            // as long as enemy bug is inside the canvas , update the enemy bug's position.
            this.x = this.x + 150 * dt;
        } else {
            // once enemy bug is outside the canvas, update his x coordinate so he starts appearing from the left of the canvas/screen.
            this.x = -(Math.random() * 400);
        }
    }
};

//Return x and y coordinates of enemy 
Enemy.prototype.getXY = function() {
    var enemy_xy = {
        enemy_x: this.x,
        enemy_y: this.y
    };
    return enemy_xy;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
var PrincessGirl = function(){
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
    // (200,200) is CatGirl's initial position.
    this.x = (Math.random() * 200);
    this.y = 0;
};

// draws player on screen.
PrincessGirl.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/
// CatGirl class - derived from Enemy.
var CatGirl = function() {
    Enemy.call(this);
    //Call superclass constructor.
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/char-cat-girl.png";
    // (200,200) is CatGirl's initial position.
    this.x = 200;
    this.y = 200;
};

CatGirl.prototype = Object.create(Enemy.prototype);

// CatGirl class - derived from Enemy
// Set constructor property of CatGirl's prototype to the function CatGirl which is CatGirl's constructor..
CatGirl.prototype.constructor = CatGirl;

// update function moves CatGirl across the canvas.
CatGirl.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Enemy bug moves at a constant speed along the x axis.
    if (dt >= 0) {
        if (this.x <= 500) {
            // as long as enemy is inside the canvas , update the enemy bug's position.
            this.x = this.x + 150 * dt;
        } else {
            // CatGirl is outside the canvas, update his x coordinate so he starts appearing from the left of the canvas/screen.
            this.x = -(Math.random() * 1e3);
        }
    }
};

// Player class
var Player = function() {
    // Variables applied to each of our instances go here,
    // The image/sprite for our player, this uses
    // a helper provided to easily load images
    this.sprite = "images/char-boy.png";
    this.moveUp = false;
    this.score = 0;
    // running score, this gets updated as long as player has lives left and is continuing the game; player has not decided to restart the game, restarting the game will reset this variable to 0.`
    this.lives = 3;
    // number of lives left for the player
    this.maxLives = 3;
    this.startScore = 0;
    this.numWins = 0;
};

// draws player on screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// this function sets the initial position for the player. 
Player.prototype.setInitialPos = function(initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
};

// return player's current score.
Player.prototype.getScore = function() {
    return this.score;
};

// return number of lives player has left 
Player.prototype.getLives = function() {
    return this.lives;
};

// set the number of lives player has left.
Player.prototype.setLives = function(lives) {
    this.lives = lives;
};

// set player's score
Player.prototype.setScore = function(score) {
    this.score = score;
};

// set number of times player has reached water.
Player.prototype.setNumWins = function(wins) {
    this.numWins = wins;
};

//player's start score is 0 - this function returns that score - zero.
Player.prototype.getStartScore = function() {
    return this.startScore;
};

// return max lives player has - 3.
Player.prototype.getMaxLives = function() {
    return this.maxLives;
};

// return number of times player has reached water before restarting the game,
Player.prototype.getNumWins = function() {
    return this.numWins;
};

// This function determines if the player has won- reached the water.
Player.prototype.hasWon = function() {
    if (player.y <= 10) {
        //if player's y coordinate is less than 10, he is considered to have reached the water. 
        player.setInitialPos(200, 400);
        // place player in his start/initial position.
        player.setNumWins(player.getNumWins() + 1);
        // increase player's number of wins by 1.
        $("#numWins").text(player.getNumWins());
        // update UI with number of wins.
        //resetGame = true;  // when reset game is true, enemy and player movements are temporarily paused/disabled.
        // Animate a star indicating the player has won once i.e. reached the water once.
        resetGame = false;
        $("#star").show("slow");
        $("#star").hide("slow");
    }
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(enemy, dt) {
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
    // if diff in x or y positions of enemy and player is less than 50px then the game ends.
    if (Math.max(xdiff, ydiff) <= 50) {
        // reset player and enemy to their initial positions because player has lost a life.
        player.setInitialPos(200, 400);
        enemy.x = 50;
        enemy.y = 50;
        catGirl.x = 200;
        catGirl.y = 200;
        // display score and number of lives left
        $("#scoreVal").text(this.getScore());
        $("#livesLeft").text(this.getLives());
        // stop enemy and player position updates because player has just lost a life.
        // stopping position updates is done in engine.js depending on the value of the global boolean variable resetGame.
        //The update function in engine.js is does not get called if resetGame is false.
        resetGame = true;
        if (player.getLives() > 0) {
            // player still has lives left
            // player and enemy bug have been placed in their initial position. 
            player.setLives(player.getLives() - 1);
            $("#livesLeft").text(player.getLives());
            resetGame = false;
        }
        if (this.getLives() === 0) {
            resetGame = true;
            // player has lost all lives 
            // display dialog - restart game.
            $("div#restartGame").dialog({
                resizable: false,
                height: 140,
                modal: true,
                buttons: {
                    Restart: function() {
                        resetGame = false;
                        // resetGame is set to false so game can continue. handleInput and enemy position updates
                        // dont happen when resetGame is true.  
                        player.setLives(player.getMaxLives());
                        // reset number of lives for player to max (3 lives) 
                        player.setScore(player.getStartScore());
                        // reset score to zero because game is restarting. 
                        $("#scoreVal").text(player.getStartScore());
                        // update UI with score.
                        $("#livesLeft").text(player.getMaxLives());
                        // update UI with number of lives.
                        $(this).dialog("close");
                    },
                    Quit: function() {
                        player.setLives(player.getMaxLives());
                        //  
                        player.setScore(player.getStartScore());
                        //  
                        $("#scoreVal").text(player.getStartScore());
                        $("#livesLeft").text(player.getMaxLives());
                        $("#playAgain").show("slow");
                        $(this).dialog("close");
                    }
                }
            });
        }
        console.log("xdiff:  " + xdiff + " " + "ydiff:  " + ydiff + "\n");
        console.log("enemy-x:  " + enemy_cur_x + " " + "player-x:  " + player_cur_x);
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    // switch between diff possible key presses.
    // player moves /responds to key presses when resetGame is false.
    // player gets 10 points every time he moves forward - forward = y-coordinate gets closer to zero.    
    if (resetGame === false) {
        switch (keyCode) {
          case "left":
            if (this.x <= 10) {
                this.x = 10;
            } else {
                this.x = this.x - 25;
            }
            break;

          case "up":
            // move up.
            if (this.y <= 10) {
                this.y = 10;
            } else {
                this.y = this.y - 25;
            }
            this.score = this.score + 10;
            $("#scoreVal").text(player.getScore());
            break;

          case "right":
            if (this.x >= 410) {
                this.x = 410;
            } else {
                this.x = this.x + 25;
            }
            break;

          case "down":
            if (this.y >= 410) {
                this.y = 410;
            } else {
                this.y = this.y + 25;
            }
            this.score = this.score - 5;
            $("#scoreVal").text(player.getScore());
            break;

          default:
            break;
        }
    }
};

// handler for Play Again button - Play Again button appears if the player has clicked on
// 'Quit' , but then needs to restart the game. 
$(document).on("click", "#playAgain", function() {
    // hide playAgain button again.
    $("#playAgain").hide("slow");
    resetGame = false;
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var bug = new Enemy();

var catGirl = new CatGirl();

allEnemies.push(bug);

allEnemies.push(catGirl);

var player = new Player();

// set player's initial position.
player.setInitialPos(200, 400);

//var princessGirl = new PrincessGirl();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
