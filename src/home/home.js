import React from 'react';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Welcome to My Website!',
            line: 'Hello world!'
        };

        // bind event handlers
        // this.onTextInputChanged = this.onTextInputChanged.bind(this);
    }

    onTextInputChanged(element) {
        this.setState({
            line: element.target.value
        });
    }

    render () {
        return (
            <div>
                <div>{this.state.title}</div>
                <div>The following line can be changed: </div>
                <p>{this.state.line}</p>
                <input
                    type = 'text'
                    value = {this.state.line}
                    onChange = {this.onTextInputChanged.bind(this)}
                />
            </div>
        );
    }
}

export default Home;