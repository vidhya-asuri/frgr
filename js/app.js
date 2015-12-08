// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 50;
    this.y = 200;
    /* this.x = 101 * 2;
    this.y = 83*2; */ 
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
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};
/*
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(dt >= 0){
       this.y = this.y - (this.y*dt);
    }
    if(this.y <= 50)
    {
      this.y = 50;
    }
    else
    {
      // enemy bug is at the edge of the canvas. Need to reposition to beginning.
      this.y = this.y - (this.y*dt);
    }

};
*/
// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
   switch(key){
     case 37:
       // left
       if(this.x < 20){
         this.x = this.x - 10;
       } 
     case 38:
       // up
       if(this.y > 20){
         this.y = this.y - 10;
       } 
     case 39:
       // right 
       if(this.x < 490){
         this.x = this.x + 10;
       } 
     case 40:
       // down 
       if(this.x < 490){
         this.y = this.y + 10; 
       }
   }
};


var Player = function() {
    // Variables applied to each of our instances go here,

    // The image/sprite for our player, this uses
    // a helper provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 210;
    this.y = 410;
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
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {
   // switch between diff possible key presses.
   switch(keyCode)
   {
     case 'left':
            if(this.x <= 10)
            {
              this.x = 10;
            }
            else
            {
              this.x = this.x - 100;
            }
            break;
     case 'up':
            // move up.
            if(this.y <= 10)
            {
              this.y = 10;
            }
            else
            {
              this.y = this.y - 100;
            }
            break;
     case 'right':
            if(this.x >= 410)
            {
              this.x = 410;
            }
            else
            {
              this.x = this.x + 100;
            }
            break;
     case 'down':
            if(this.y >= 410)
            {
              this.y = 410;
            }
            else
            {
              this.y = this.y + 100;
            }
            break;
     default:
            break;
   } 
    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var bug =  new Enemy();
allEnemies.push(bug);
var player = new Player();

bug.update(); 
var enemyBug = new Enemy();
var allEnemies = [];
allEnemies.push(enemyBug);
var player = new Player();

 
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
