// Base class for Players and Enemies to inherit from
var Entity = function(sprite) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;

    // Each subclass will require a spawn method
    this.spawn();
};

// Enemies our player must avoid
var Enemy = function() {
    Entity.call(this, 'images/enemy-bug.png');
    this.x = randomInt(GRID.pixelWidth - ENEMY.spawnX, ENEMY.spawnX);
};

// Prototype and constructor for Enemy
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > GRID.pixelWidth)
        this.spawn();
    else
        this.x = this.x + (60 * this.speed * dt);
};

// Draw the enemy on the screen, required method for game
// Use an absolute pixel value for the x-axis
// Use a GRID-relative value for the y-axis
// Apply ENEMY.yOffset to the y-axis
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, GRID.y[this.y] - ENEMY.yOffset);
};

// Randomize enemy placement to different lanes
Enemy.prototype.setLane = function() {
    this.y = randomInt(ENEMY.bottomLane, ENEMY.topLane);
};

// Spawn enemies
// - off-screen
// - on a random lane
// - with a random movement speed
Enemy.prototype.spawn = function() {
    this.x = ENEMY.spawnX;
    this.setLane();
    this.speed = randomInt(current.minSpeed, current.maxSpeed);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Entity.call(this, 'images/char-boy.png');
    this.wins = 0;
    this.losses = 0;
};

// Prototype and constructor for Player
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {};

// Draw the player on the screen
// Use a GRID-relative value for both axes
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), GRID.x[this.x], GRID.y[this.y]);
};

// Move player based on accepted input
// Do not allow player to move outside of the grid
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0)
                this.x--;
            break;
        case 'up':
            if (this.y < GRID.height - 1)
                this.y++;
            else if (this.y === GRID.height - 1)
                this.win();
            break;
        case 'right':
            if (this.x < GRID.width - 1)
                this.x++;
            break;
        case 'down':
            if (this.y > 0)
                this.y--;
            break;
    }
};

// Track number of wins
// Alert player of victory & show number of wins
// Increase difficulty with successive wins
// Reset the game
Player.prototype.win = function() {
    this.wins++;
    alert("Nice! You've crossed the road " + this.wins + " times!");

    if (this.wins % 2 === 0 && current.maxSpeed < ENEMY.maxSpeed)
        current.maxSpeed++;
    if (this.wins % 3 === 0 && allEnemies.length < ENEMY.maxCount)
        allEnemies.push(new Enemy());
    if (this.wins % 5 === 0 && current.minSpeed < ENEMY.maxSpeed)
        current.minSpeed++;

    reset();
};

// Track number of losses
// Alert player of the loss & show number of losses
// Decrease difficulty
// Reset the game
Player.prototype.lose = function() {
    this.losses++;
    alert("OH NO! You've been hit " + this.losses + " times!");

    if (current.maxSpeed > ENEMY.minSpeed)
        current.maxSpeed--;
    if (allEnemies.length > ENEMY.minCount)
        allEnemies.pop();
    if (current.minSpeed > ENEMY.minSpeed)
        current.minSpeed--;

    reset();
};

// Spawn player at the center-bottom of the grid
Player.prototype.spawn = function() {
    this.x = Math.floor(GRID.width / 2);
    this.y = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < ENEMY.startCount; i++)
    allEnemies.push(new Enemy());

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

// Resets the game state
var reset = function() {
    player.spawn();
    allEnemies.forEach(function(enemy) { enemy.spawn(); });
};
