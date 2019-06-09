import React from 'react';
import log from './debug';
import cfg from './config';
import GridWorld from './gridworld';

class GridView extends React.Component {

    constructor(props) {
        super(props);

        // store element reference
        this.rootView = React.createRef();

        // initialize state
        this.state = {
            world: undefined
        };

        // register interface
    }

    /*
     * Will be called once the view finishes init 
     */
    componentDidMount() {
        
        // initialize attributes
        const width = this.rootView.current.offsetWidth;
        const height = this.rootView.current.offsetHeight;

        // build the grid world
        // calculate how many tile can we fit
        const tileSize = cfg.tileSize;
        const row = Math.floor(height / tileSize);
        const col = Math.floor(width / tileSize);
        
        // create the world
        this.setState({world: new GridWorld(row, col)});

        log('page finished loading');
        log('world size: ' + width + ' x ' + height);
    }

    /*
     * Heuristic function, this one calculates the Euclidiean distance between two point
     * and multiply the result by a coefficient
     */
    H(y1, x1, y2, x2) {
        return this.coef * Math.sqrt(Math.pow(y1 - y2, 2) + Math.pow(x1 - x2, 2));
    }

    /*
     * Start BFS search
     */
    startBFS() {
        this.state.world.bfs();
        this.setState({world: this.state.world});
    }

    /*
     * Start Dijkstra search
     */

    startDijkstra() {
        this.state.world.dijkstra();
        this.setState({wrold: this.state.world});
    }

    /*
     * Start A* search
     */
    startAStar(coef) {
        if (coef !== '') {
            this.coef = coef;
        } else {
            this.coef = 1.2;
        }
        this.state.world.aStar(this.H.bind(this));
        this.setState({world: this.state.world});
    }

    /*
     * reset the grid
     */
    reset() {
        this.state.world.reset();
        this.setState({world: this.state.world});
    }

    /*
     * clear the grid
     */
    clear() {
        this.state.world.clear();
        this.setState({world: this.state.world});
    }

    /*
     * Place a wall when the user clicks on a tile
     */
    onTileClicked(data) {
        const world = this.state.world;
        world.data[data[0]][data[1]].type = 'obstacle';
        this.setState({world: world});
    }

    /*
     * Display the tile at row, column
     */
    drawTile(y, x) {

        const world = this.state.world;
        const tile = world.data[y][x];

        // draw tile differently base on type
        let className = 'tile';
        if (tile.type === 'normal') {
            className += ' tile-normal';
        } else if (tile.type === 'start') {
            className += ' tile-start';
        } else if (tile.type === 'goal') {
            className += ' tile-goal';
        } else if (tile.type === 'obstacle') {
            className += ' tile-obstacle';
        }

        // color the tile if it is in froniter or explored set
        // const status = world.getStatus(y, x);
        const statusName = world.getStatus(y, x);
        let statusClass = 'tile-normal';
        if (statusName === 'frontier') {
            statusClass = 'tile-frontier';
        } else if (statusName === 'visited') {
            statusClass = 'tile-visited';
        } else if (statusName === 'path') {
            statusClass = 'tile-path';
        }
        return(<div className={className} onClick={(() => this.onTileClicked([y,x]))}><div className={statusClass}/></div>);
    }

    /*
     * Display the grid
     */
    drawWorld() {

        // only draw the view if the world is initialized
        let view;
        if (this.state.world) {

            // draw tiles
            const world = this.state.world;
            let gridView = [];
            for (let y = 0; y < world.row; y++) {
                let rowView = [];
                for (let x = 0; x < world.col; x++) {
                    rowView.push(this.drawTile(y, x));
                }
                gridView.push(<div>{rowView}</div>);
            }

            // update view
            view = (<div>{gridView}</div>);
        } else {
            view = (<div>Loading...</div>);
        }

        return view;
    }

    render() {
        return (
            <div className='fill' ref={this.rootView}>
                {this.drawWorld()}
            </div>
        );
    }
}

export default GridView;