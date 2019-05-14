import React from 'react';
import GridView from './gridview';

class HomeView extends React.Component {

    constructor(props) {
        super(props);

        // store reference
        this.gridView = React.createRef();
        this.input = React.createRef();
        
        // initialize state
        this.state = {coef: ''};
    }

    /*
     * Handles BFS button click
     */
    onBFSClicked(e) {
        if (this.gridView) {
            this.gridView.current.startBFS();
        }
    }

    /*
     * Handles A* button click
     */
    onAStarClicked(e) {
        if (this.gridView) {
            this.gridView.current.startAStar(this.state.coef);
        }
    }

    /*
     * Handles Reset button click
     */
    onResetClicked(e) {
        if (this.gridView) {
            this.gridView.current.reset();
        }
    }

    /*
     * Handles Clear button click
     */
    onClearClicked(e) {
        if (this.gridView) {
            this.gridView.current.clear();
        }
    }

    /*
     * Handles coefficient input changes
     */
    onInputChanged(e) {
        this.setState({coef: e.target.value});
    }

    render() {
        return (
            <div className='main-background'>

                {/* control panel */}
                <div className='side-panel'>
                <div>
                    <button onClick={this.onBFSClicked.bind(this)}>BFS</button>
                    <button onClick={this.onAStarClicked.bind(this)}>A*</button>
                    <button onClick={this.onResetClicked.bind(this)}>Reset</button>
                    <button onClick={this.onClearClicked.bind(this)}>Clear</button>
                </div>
                <div>
                    Enter heuristic for A*:
                </div>
                    <div>
                        <input
                            type='number'
                            value={this.state.coef}
                            onChange={this.onInputChanged.bind(this)}
                        />
                    </div>
                </div>

                {/* visualization */}
                <div className='grid-world' ref={this.divGridWorld}>
                    <GridView ref={this.gridView}/>
                </div>
            </div>
        );
    }
}

export default HomeView;