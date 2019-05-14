class Tile {

    constructor(type, cost, row, col) {
        this.type = type; // the type of this tile i.e. floor, wall
        this.prev = undefined; // the reference to the tile the agent 
                               // traveled right before reaching this one
        this.row = row;
        this.col = col;
    }
}

export default Tile;