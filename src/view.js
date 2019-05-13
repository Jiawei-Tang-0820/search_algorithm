import React from 'react';
import log from './debug';
import cfg from './config';
import GridWorld from './gridworld';
import { updateExpression } from '@babel/types';

class HomeView extends React.Component {

    constructor(props) {
        super(props);

        // create reference to the grid world subview
        this.divGridWorld = React.createRef();

        // my states
        this.state = {
            world: undefined
        };
    }

    componentDidMount() {

        // initialize attributes
        const width = this.divGridWorld.current.offsetWidth;
        const height = this.divGridWorld.current.offsetHeight;

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

    drawTile(tile) {
        let className;
        if (tile.type === 'normal') {
            className = 'tile tile-normal';
        } else if (tile.type === 'start') {
            className = 'tile tile-start';
        }
        return(
            <div className={className}></div>
        );
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
            view = (
                <div>
                    {gridView}
                </div>
            );
        } else {
            view = (<div>Loading...</div>);
        }

        return(
            <div>
                {view}
            </div>
        );
    }

    onButtonClicked(e) {
        log('clicked');
        let world = this.state.world;
        world.data[0][0].type = 'start';
        this.setState({
            world: world
        });
    }

    render() {
        return(
            <div className='fullscreen-background'>
                <div className='side-panel'>
                    <button onClick={this.onButtonClicked.bind(this)}>Add start</button>
                </div>
                <div className='grid-world' ref={this.divGridWorld}>
                    {this.drawWorld()}
                </div>
            </div>
        );
    }
}

export default HomeView;