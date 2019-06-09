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

    componentDidMount() {
        document.title = 'Search Algorithms';
    }

    /*
     * Handles BFS button click
     */
    onDijkstraClicked(e) {
        if (this.gridView) {
            this.gridView.current.startDijkstra();
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
            <div className='root'>
                <div className='intro'>
                    <div className='title'>
                        Graph Search Algorithms
                    </div>
                    <div className='text-divider'></div>
                    <div>
                        <img className='profile-img' src={require('./Gary.png')} alt="Gary"></img>
                        <div className='text'>
                            Hello! My name is Gary, and I’m a computer science student and a course tutor for 
                            advanced data structures at UC San Diego. I find the computer 
                            algorithms infinitely attracting because they can help us to 
                            solve problem accurately and efficiently; tasks that may take 
                            hours of brute force computation can be finished in mere seconds 
                            using clearly crafted algorithms. Today, I would like to introduce 
                            some of the simple yet elegant graph search algorithms that are 
                            utilized by your digital maps helping you to travel from one location to another.
                        </div>
                    </div>
                </div>
                <div className='part1'>
                    <div className='text-divider'></div>
                    <div className='header'>
                        Part 1: Introduction
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        Before we dive into the graph search algorithms, 
                        we need to understand what a graph is. A graph, in general, is a 
                        collection of vertices and edges. Each vertex can represent a unique 
                        ject and it is connected with other objects/vertices through edges. 
                        For example, in the context of maps, locations such as stores, parks, 
                        and buildings are the vertices whereas the roads connecting them 
                        together are the edges. One of the most frequent questions we ask 
                        about a graph is to find the shortest/fastest route from one place to 
                        another. Let’s look at the following graph, can you find a shortest 
                        path from point A to point C?
                    </div>
                    <div className='text-divider'></div>
                    <img src={require('./DMPBruteForce-t.png')} alt="brute force"></img>
                    <div className='text-divider'></div>
                    <div className='text'>
                        A naïve approach is to use brute force. We can list out all the 
                        possible paths from the start to the end, calculate the distance 
                        of each path, and find the one with the shortest distance. If we 
                        use this brute force approach on the graph above, we can easily 
                        see that there are 2 possible paths from A to C. They are (A-B-D-C) and (A-B-E-C), and 
                        the shortest path is (A-B-E-C) which has a distance of 3.
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        Problem solved! We can just use this brute force approach to find 
                        the shortest path in any graph!  Why do we even need the fancy 
                        algorithms? Well… technically you can use the brute force 
                        approach to find the correct answer every time. However, as a 
                        graph becomes more and more complex, the time it takes for our 
                        brute force approach to find the shortest path increases very 
                        fast. For example, if we want to travel from San Diego to San 
                        Francisco, how many possible paths are there from the start and 
                        the end, and how much time do we need to list them all out and 
                        compute the distance?
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        Let’s try it together! Since we are using the brute force approach, 
                        we need to take every combination of roads between SD and SF. 
                        There are at least tens of thousands of different roads you can 
                        pick from on the way. The choices are overwhelming and it is 
                        nearly impossible to just to write them all out in a list.
                    </div>
                </div>
                <div className='part2'>
                    <div className='text-divider'></div>
                    <div className='header'>
                        Part 2: Dijkstra's Algorithm
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        We definitely need a better way to plan our travel from SD to SF. 
                        I would like to introduce the Dijkstra’s algorithm to you: It is an 
                        optimized path finding algorithm that can efficiently find the shortest 
                        path between two points. Let’s watch the algorithm in action on the 
                        following graph:
                    </div>
                    <div className='text-divider'></div>
                    <img src={require('./DMPDijkstra-t.png')} alt="dijkstra"></img>
                    <div className='text-divider'></div>
                    <div className='text'>
                        The Dijkstra’s algorithm will have a list that keep track of the 
                        shortest distance of each node so far from the starting point A to 
                        all the vertices in the graph. Initially the list will only have one 
                        item, (A, 0), because the distance from A to A is zero. 
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        For each iteration, we will remove the vertex closest to A from 
                        the list and finalize its path. After (A, 0) is removed, the path 
                        from A to A is finalized (a trivial path). Then we will put A’s 
                        neighbors into the list, which are (E, 5), (B, 6), (D, 9), and (F, 10).
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        Then, we will repeat the process again, this time the closes vertex 
                        to A if E. So, E is removed and the path from A to E is also finalized 
                        (A-E). Then we will put E’s neighbors into the list, which are (F, 8) 
                        and (D, 8). Because we already have items (D, 9) and (F, 10) in the 
                        list, we want to update those items in the list to (D, 8), and (F, 8) 
                        instead of inserting new items.
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        If we repeat the process until we see our goal C is removed from the 
                        list, we know that the best path is (A-E-D-C)
                    </div>
                </div>
                <div className='part3'>
                    <div className='text-divider'></div>
                    <div className='header'>
                        Part 3: A* Algorithm
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        One question we should always be asking is that, can we do better? 
                        Is there a faster way to find the shortest path than Dijkstra’s 
                        Algorithm? The answer is yes. Let’s look at this interesting example:
                    </div>
                    <div className='text-divider'></div>
                    <img src={require('./DMPDijkstra2-t.png')} alt="a*"></img>
                    <div className='text-divider'></div>
                    <div className='text'>
                        Same as before, we want to find the shortest path from A to C. 
                        If we run Dijkstra’s algorithm on this graph, after we removed 
                        (A, 0) from the list, we put A’s neighbors (D, 1) and (B, 2) into 
                        the list. In the next iteration, however, we move away from our 
                        goal by visiting D first because (D, 1) has is closer to A than 
                        (B, 2) is. It is obvious that moving away from the goal is not 
                        the smartest strategy. How can we encourage the algorithm to move 
                        toward the goal?
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        The answer is yes. A* algorithm is very similar to Dijkstra’s 
                        algorithm except one point. Recall that in Dijkstra’s algorithm, 
                        we always visit the closest vertex to the start at each iteration. 
                        In A* algorithm, however, in each iteration, we visit the vertex 
                        that is the closest one to the start and the goal. In this way, 
                        we are motivating the algorithm move toward the goal at every step.
                    </div>
                    <div className='text-divider'></div>
                </div>
                <div className='part4'>
                    <div className='header'>
                        Part 4: Visualization
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        Below is a visualization of the Dijkstra's algorithm and A* algorithm. 
                        Red square is the start, and blue square is the goal. white tiles are floors that the 
                        algorithm can travel on whereas gray square are walls blocking movements. 
                        Click on any floor tile to change it to a wall.
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        Once the serach is finished, tiles will be shaded in different color. 
                        Green shaded tiles are tiles visited by the algorithm, yellow shaded tiles 
                        are tiles that will be visited in the next step, and blue shaded tiles 
                        is the path from start to the end that the search algorithm finds.
                    </div>
                    <div className='text-divider'></div>
                    <div className='text'>
                        Click on "Dijkstra" or "A*" to run the corresponding algorithm. "Reset" will
                        reset the search but keep the walls, where as "clear" will reset the search
                        and clear the walls.
                    </div>
                    <div className='text-divider'></div>

                    {/* control panel */}
                    <div>
                        <button className='button1' onClick={this.onDijkstraClicked.bind(this)}>Dijkstra</button>
                        <button className='button1' onClick={this.onAStarClicked.bind(this)}>A*</button>
                        <button className='button1' onClick={this.onResetClicked.bind(this)}>Reset</button>
                        <button className='button1' onClick={this.onClearClicked.bind(this)}>Clear</button>
                    </div>
                    <div className='text'>
                        Aggresiveness of A* (1 to 10, 1 is the least aggresive):
                    </div>
                    <div>
                        <input
                            type='number'
                            value={this.state.coef}
                            onChange={this.onInputChanged.bind(this)}
                        />
                    </div>
                    
                    <div className='text-divider'></div>

                    <div className='main-background'>
                        {/* visualization */}
                        <div className='grid-world' ref={this.divGridWorld}>
                            <GridView ref={this.gridView}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default HomeView;