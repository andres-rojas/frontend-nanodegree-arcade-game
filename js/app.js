// Representative grid for movement
// Uses traditional x/y plotting
// i.e: y  ____________________
//      4 |___|___|___|___|___|
//      3 |___|___|___|___|___|
//      2 |___|___|___|___|___|
//      1 |___|___|___|___|___|
//      0 |___|___|___|___|___|
//          0   1   2   3   4   x
var GRID = {
    x: [0, 100, 200, 300, 400],
    y: [400, 317, 234, 151, 68]
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 2;
    this.y = 0;
};

Player.prototype.update = function() {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), GRID['x'][this.x], GRID['y'][this.y]);
};

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0)
                this.x--;
            break;
        case 'up':
            if (this.y < 4)
                this.y++;
            else if (this.y === 4)
                this.win();
            break;
        case 'right':
            if (this.x < 4)
                this.x++;
            break;
        case 'down':
            if (this.y > 0)
                this.y--;
            break;
    }
};

Player.prototype.win = function() {
    alert('You won!')
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
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
