import React from 'react';
import log from './debug';
import GridView from './gridview';

class HomeView extends React.Component {

    constructor(props) {
        super(props);

        // store reference
        this.gridView = React.createRef();
    }

    componentDidMount() {
        
    }

    onBFSClicked(e) {
        if (this.gridView) {
            this.gridView.current.startBFS();
        }
    }

    render() {
        return (
            <div className='main-background'>
                <div className='side-panel'>
                    <button onClick={this.onBFSClicked.bind(this)}>BFS</button>
                </div>
                <div className='grid-world' ref={this.divGridWorld}>
                    <GridView interface='lol' ref={this.gridView}/>
                </div>
            </div>
        );
    }
}

export default HomeView;