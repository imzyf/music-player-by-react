import React, {Component} from 'react';

export default class Progress extends Component {

    static defaultProps = {
        barColor: 'rgb(47, 152, 66)'
    };

    constructor(props) {
        super(props)
    }

    changeProgress(e) {
        let {progressBar} = this.refs;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;

        // 先判断方法是否存在
        this.props.progressChangeHandler && this.props.progressChangeHandler(progress);

        e.stopPropagation();
        e.preventDefault();

    }

    render() {
        return (
            <div className="components-progress"
                 ref="progressBar"
                 onClick={this.changeProgress.bind(this)}>
                <div className="progress"
                     style={{
                         width: `${this.props.progress}%`,
                         backgroundColor: this.props.barColor
                     }}

                ></div>
            </div>
        );
    }
}
