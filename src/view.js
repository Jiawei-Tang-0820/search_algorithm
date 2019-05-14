import React from 'react';
import log from './debug';
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
            this.gridView.current.startAStar();
        }
    }

    onResetClicked(e) {
        if (this.gridView) {
            this.gridView.current.reset();
        }
    }

    onInputChanged(e) {
        log(e.target.current.value);
        this.setState({coef: e.target.current.value});
    }

    render() {
        return (
            <div className='main-background'>
                <div className='side-panel'>
                <div>
                    <button onClick={this.onBFSClicked.bind(this)}>BFS</button>
                    <button onClick={this.onAStarClicked.bind(this)}>A*</button>
                    <button onClick={this.onResetClicked.bind(this)}>Reset</button>
                </div>
                <div>
                    <input
                        type='text'
                        value={this.state.coef}
                        onChanged={this.onInputChanged.bind(this)}
                    />
                </div>
                </div>
                <div className='grid-world' ref={this.divGridWorld}>
                    <GridView coef={this.state.coef} ref={this.gridView}/>
                </div>
            </div>
        );
    }
}

export default HomeView;