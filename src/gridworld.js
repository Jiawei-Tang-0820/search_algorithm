import Tile from './tile';
import cfg from './config';

class GridWorld {

    /*
     * Construct a 2D array to hold all the tiles 
     */
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.data = [];

        // initialize set
        this.frontier = []; // list frontier
        this.pfrontier = []; // priority queue frontier
        this.visited = [];
        this.path = [];

        // initialize the tiles
        for (let y = 0; y < this.row; y++) {
            this.data.push([]);
            for (let x = 0; x < this.col; x++) {
                this.data[y].push(new Tile('normal', 0, y, x));
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

    /*
     * set the starting and ending points 
     */
    placeStartAndGoal() {
        this.data[this.startY][this.startX].type = 'start';
        this.data[this.goalY][this.goalX].type = 'goal';
    }

    /* 
     * clears the entire borad, including walls
     */ 
    clear() {
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.col; x++) {
                this.data[y][x] = new Tile('normal', 0, y, x);
            }
        }
        this.frontier = [];
        this.pfrontier = [];
        this.visited = [];
        this.path = [];
        this.placeStartAndGoal();
    }

    /* 
     * reset the entire borad
     */ 
    reset() {
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.col; x++) {
                this.data[y][x].prev = undefined;
            }
        }
        this.frontier = [];
        this.pfrontier = [];
        this.visited = [];
        this.path = [];
    }

    /*
     * Returns the neighbors of a tile, excluding out of bound ones
     */
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

            neighbors.push([newY, newX]);
        }
        return neighbors;
    }

    /* 
     * Returns the set that the tile is in
     */ 
    getStatus(row, col) {
        if (this.arrayIncludes(this.path, [row, col])) {
            return 'path';
        } else if (this.arrayIncludes(this.frontier, [row, col])) {
            return 'frontier';
        } else if (this.arrayIncludes(this.pfrontier, [row, col], this.pArrayComp.bind(this))) {
            return 'frontier';
        } else if (this.arrayIncludes(this.visited, [row, col])) {
            return 'visited';
        } else {
            return 'normal';
        }
    }

    /*
     * Returns true if array a and array b are the same 
     */
    arrayComp(a, b) {
        if (a.length === b.length) {
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /* 
     * Used to compare the object inside pfrontier
     */ 
    pArrayComp(a, b) {
        return this.arrayComp(a[2], b);
    }

    /* 
     * Checks if an array is included in an array of array
     */ 
    arrayIncludes(target, item, compare = this.arrayComp) {
        for (let i = 0; i < target.length; i++) {
            if (compare(target[i], item)) {
                return true;
            }
        } 
        return false;
    }

    /* 
     * Returns the first occurence of an array that is in an array of array
     */ 
    arrayIndexOf(target, item, compare = this.arrayComp) {
        for (let i = 0; i < target.length; i++) {
            if (compare(target[i], item)) {
                return i;
            }
        } 
        return -1;
    }

    /* 
     * Breath first search
     */ 
    bfs() {

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
                this.path = this.linkPath(tile);
                break;
            }

            // push neigbhors onto the queue
            const neigbhors = this.getNeighbors(coord[0], coord[1]);
            for (let i = 0; i < neigbhors.length; i++) {
                
                // make sure tha neighbor is not in the visited nor explored set
                const nCoord = neigbhors[i];
                if (this.arrayIncludes(this.visited, nCoord) || this.arrayIncludes(this.frontier, nCoord)) {
                    continue;
                }

                // dont add obstacles
                const nTile = this.data[nCoord[0]][nCoord[1]];
                if (nTile.type === 'obstacle') {
                    continue;
                }

                // update frontier and set prev
                this.frontier.push(nCoord);
                nTile.prev = tile;
            }
        }
    }

    /*
     * Dijkstra search
     */

    dijkstra() {
        // initial condition
        this.reset();
        this.pfrontier.push([0, 0, [this.startY, this.startX]]);

        // a-star search
        while (this.pfrontier.length > 0) {

            // get the best node
            const pair = this.removeMin(this.pfrontier, function(a, b) {return a[1] < b[1];});
            const cost = pair[1];
            const coord = pair[2];
            const tile = this.data[coord[0]][coord[1]];

            // visit this node
            this.visited.push(coord);

            // check if this is goal node
            if (tile.type === 'goal') {
                this.path = this.linkPath(tile);
                break;
            }

            // push neigbhors onto the pqueue
            const neigbhors = this.getNeighbors(coord[0], coord[1]);
            for (let i = 0; i < neigbhors.length; i++) {
                
                // make sure tha neighbor is not in the visited set
                const nCoord = neigbhors[i];
                if (this.arrayIncludes(this.visited, nCoord)) {
                    continue;
                }

                // dont add obstacles
                const nTile = this.data[nCoord[0]][nCoord[1]];
                if (nTile.type === 'obstacle') {
                    continue;
                }

                // calculate the cost
                const nCost = cost + 1;

                // update frontier and set prev
                const index = this.arrayIndexOf(this.pfrontier, nCoord, this.pArrayComp.bind(this));
                if (index !== -1) {
                    if (nCost < this.pfrontier[index][0]) {
                        this.pfrontier[index] = [0, nCost, nCoord];
                        nTile.prev = tile;
                    }
                } else {
                    this.pfrontier.push([0, nCost, nCoord]);
                    nTile.prev = tile;
                }
            }
        }
    }

    /* 
     * A* search
     */ 
    aStar(H) {
        // initial condition
        this.reset();
        this.pfrontier.push([H(this.startY, this.startX, this.goalY, this.goalX), 0, [this.startY, this.startX]]);

        // a-star search
        while (this.pfrontier.length > 0) {

            // get the best node
            const pair = this.removeMin(this.pfrontier, function(a, b) {return a[0] < b[0];});
            const realCost = pair[1];
            const coord = pair[2];
            const tile = this.data[coord[0]][coord[1]];

            // visit this node
            this.visited.push(coord);

            // check if this is goal node
            if (tile.type === 'goal') {
                this.path = this.linkPath(tile);
                break;
            }

            // push neigbhors onto the pqueue
            const neigbhors = this.getNeighbors(coord[0], coord[1]);
            for (let i = 0; i < neigbhors.length; i++) {
                
                // make sure tha neighbor is not in the visited set
                const nCoord = neigbhors[i];
                if (this.arrayIncludes(this.visited, nCoord)) {
                    continue;
                }

                // dont add obstacles
                const nTile = this.data[nCoord[0]][nCoord[1]];
                if (nTile.type === 'obstacle') {
                    continue;
                }

                // calculate the huristic cost
                const nhgCost = realCost + H(nCoord[0], nCoord[1], this.goalY, this.goalX) + 1;
                const nrealCost = realCost + 1;

                // update frontier and set prev
                const index = this.arrayIndexOf(this.pfrontier, nCoord, this.pArrayComp.bind(this));
                if (index !== -1) {
                    if (nhgCost < this.pfrontier[index][0]) {
                        this.pfrontier[index] = [nhgCost, nrealCost, nCoord];
                        nTile.prev = tile;
                    }
                } else {
                    this.pfrontier.push([nhgCost, nrealCost, nCoord]);
                    nTile.prev = tile;
                }
            }
        }
    }

    /* 
     * Helper to remove the smallest items in an array (there is a faster way using min heap)
     */ 
    removeMin(array, compare) {
        let best = undefined;
        let bestIndex = 0;
        for (let i = 0; i < array.length; i++) {
            if (best === undefined || compare(array[i], best)) {
                bestIndex = i;
                best = this.pfrontier[i];
            }
        }
        return array.splice(bestIndex, 1)[0];
    }

    /* 
     * Link the prevs together to get a path
     */ 
    linkPath(tile) {
        let res = [];
        let curr = tile;
        while (curr) {
            res.push([curr.row, curr.col]);
            curr = curr.prev;
        }
        return res;
    }
}

export default GridWorld;