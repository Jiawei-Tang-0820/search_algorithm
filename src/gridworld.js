import Tile from './tile';

class GridWorld {

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.data = [];

        for (let y = 0; y < this.row; y++) {
            this.data.push([]);
            for (let x = 0; x < this.col; x++) {
                this.data[y].push(new Tile('normal', 0));
            }
        }
    }
}

export default GridWorld;