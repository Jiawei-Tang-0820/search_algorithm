import Tile from './tile';
import cfg from './config';

class GridWorld {

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.data = [];

        // initialize set
        this.frontier = [];
        this.visited = [];

        for (let y = 0; y < this.row; y++) {
            this.data.push([]);
            for (let x = 0; x < this.col; x++) {
                this.data[y].push(new Tile('normal', 0));
            }
        }

        // read start and goal location
        this.startX = cfg.start_x >= 0 ? cfg.start_x : this.col + cfg.start_x - 1;
        this.startY = cfg.start_y >= 0 ? cfg.start_y : this.row + cfg.start_y - 1;
        this.goalX = cfg.goal_x >= 0 ? cfg.goal_x : this.col + cfg.goal_x - 1;
        this.goalY = cfg.goal_y >= 0 ? cfg.goal_y : this.row + cfg.goal_y - 1;

        // set the start and goal
        this.placeStartAndGoal();
    }

    placeStartAndGoal() {
        this.data[this.startY][this.startX].type = 'start';
        this.data[this.goalY][this.goalX].type = 'goal';
    }

    // clear the entire borad
    clear() {
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.col; x++) {
                this.data[y][x] = new Tile('normal', 0);
            }
        }
        this.frontier = [];
        this.visited = [];
        this.placeStartAndGoal();
    }

    // reset the borad state, keep obstacles
    reset() {
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.col; x++) {
                this.data[y][x].prev = undefined;
            }
        }
        this.frontier = [];
        this.visited = [];
    }

    getNeighbors(row, col) {

        // get up down left right neighors
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let neighbors = [];
        for (let i = 0; i < directions.length; i++) {

            // calculate neigbhor's coordinate
            const newY = row + directions[i][0];
            const newX = col + directions[i][1];

            // make sure the neighbor is not out of bound
            if (newY < 0 || newY >= this.row || newX < 0 || newX >= this.col) {
                continue;
            }

            // make sure tha neighbor is not in the visited nor explored set
            if (this.arrayIncludes(this.visited, [newY, newX]) || this.arrayIncludes(this.frontier, [newY, newX])) {
                continue;
            }

            neighbors.push([newY, newX]);
        }
        return neighbors;
    }

    arrayIncludes(target, item) {
        L: for (let i = 0; i < target.length; i++) {
            if (target[i].length === item.length) {
                for (let j = 0; j < item.length; j++) {
                    if (target[i][j] !== item[j]) {
                        continue L;
                    }
                }
                return true;
            }
        } 
        return false;
    }

    bfs(update) {

        // initial condition
        this.reset();
        this.frontier.push([this.startY, this.startX]);

        // bfs search
        while (this.frontier.length > 0) {

            // explore this node
            const coord = this.frontier.shift();
            this.visited.push(coord);
            const tile = this.data[coord[0]][coord[1]];

            // check if this is goal node
            if (tile.type === 'goal') {
                const path = this.linkPath(tile);
                for (let i = 0; i < path.length; i++) {
                    path[i].type = 'obstacle';
                }
                update();
                break;
            }

            // push neigbhors onto the queue
            const neigbhors = this.getNeighbors(coord[0], coord[1]);
            for (let i = 0; i < neigbhors.length; i++) {

                const nCoord = neigbhors[i];
                this.frontier.push(nCoord);

                // update data and set prev
                const nTile = this.data[nCoord[0]][nCoord[1]];
                nTile.prev = tile;
            }
        }
    }

    linkPath(tile) {
        let res = [];
        let curr = tile;
        while (curr) {
            res.push(curr);
            curr.inPath = true;
            curr = curr.prev;
        }
        return res;
    }
}

export default GridWorld;