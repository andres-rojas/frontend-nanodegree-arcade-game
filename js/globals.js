var COLLISION_OFFSET = 20;
var ENEMY = {
    minSpeed: 1,
    maxSpeed: 2,
    yOffset: 7
};

// Cell sizes for the grid
var CELL = {
    width: 101,
    height: 83
};

// Representative grid for movement
// width:    number of cells wide
// height:   number of cells tall
// offsetY: pixel-offset of grid from bottom
// x & y: traditional plotting
//        i.e: y  ____________________
//             4 |___|___|___|___|___|
//             3 |___|___|___|___|___|
//             2 |___|___|___|___|___|
//             1 |___|___|___|___|___|
//             0 |___|___|___|___|___|
//                 0   1   2   3   4   x
var GRID = {
    width: 5,
    height: 5,
    offsetY: 68,
    x: [],
    y: []
};

// Set x coordinates for each cell in the grid
for (var i = 0; i < GRID.width; i++)
  GRID.x[i] = i * CELL.width;

// Find y coordinate of the bottom of the grid
GRID.bottom = CELL.height * (GRID.height - 1) + GRID.offsetY;

// Set y coordinates for each cell in the grid
for (var i = 0; i < GRID.height; i++)
    GRID.y[i] = GRID.bottom - (i * CELL.height);
