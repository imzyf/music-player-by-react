import React, {Component} from 'react';

export default class MusicListItem extends Component {

    deleteHandler(item, e) {

        e.stopPropagation();
        e.preventDefault();
    }

    playMusic(item, e) {

        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        const item = this.props.data;
        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`}
                onClick={this.playMusic.bind(this, item)}
            >
                <p><span className="bold">{item.title}</span> - {item.artist}</p>
                <p className="-col-auto delete"
                   onClick={this.deleteHandler.bind(this, item)}
                ></p>
            </li>
        );
    }
}

