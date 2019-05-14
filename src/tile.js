class Tile {

    constructor(type, cost, row, col) {
        this.type = type;
        this.prev = undefined;
        this.row = row;
        this.col = col;
    }
}

export default Tile;