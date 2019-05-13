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

    startBFS() {
        this.state.world.bfs(function(){
            this.setState({world: this.state.world});
        }.bind(this));
    }

    drawTile(tile) {

        // draw tile differently base on type
        let className;
        if (tile.type === 'normal') {
            className = 'tile tile-normal';
        } else if (tile.type === 'start') {
            className = 'tile tile-start';
        } else if (tile.type === 'goal') {
            className = 'tile tile-goal';
        } else if (tile.type === 'obstacle') {
            className = 'tile tile-obstacle';
        }

        // color the tile if it is in froniter or explored set


        return(<div className={className}></div>);
    }

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
                    rowView.push(this.drawTile(world.data[y][x]));
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