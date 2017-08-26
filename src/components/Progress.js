import React, {Component} from 'react';

export default class Progress extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <p>{this.props.progress}</p>
            </div>
        );
    }
}
