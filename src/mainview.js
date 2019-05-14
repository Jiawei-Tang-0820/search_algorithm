import React from 'react';
import GridView from './gridview';

class HomeView extends React.Component {

    constructor(props) {
        super(props);

        // store reference
        this.gridView = React.createRef();
        this.input = React.createRef();
        
        this.state = {coef: ''};
    }

    componentDidMount() {
        
    }

    onBFSClicked(e) {
        if (this.gridView) {
            this.gridView.current.startBFS();
        }
    }

    onAStarClicked(e) {
        if (this.gridView) {
            this.gridView.current.startAStar(this.state.coef);
        }
    }

    onResetClicked(e) {
        if (this.gridView) {
            this.gridView.current.reset();
        }
    }

    onClearClicked(e) {
        if (this.gridView) {
            this.gridView.current.clear();
        }
    }

    onInputChanged(e) {
        this.setState({coef: e.target.value});
    }

    render() {
        return (
            <div className='main-background'>
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
                <div className='grid-world' ref={this.divGridWorld}>
                    <GridView ref={this.gridView}/>
                </div>
            </div>
        );
    }
}

export default HomeView;