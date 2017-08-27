import React, {Component} from 'react';
import PubSub from 'pubsub-js'

export default class MusicListItem extends Component {

    deleteHandler(item, e) {
        PubSub.publish('DELETE_MUSIC', item);

        e.stopPropagation();
        e.preventDefault();
    }

    playHandler(item, e) {
        PubSub.publish('PLAY_MUSIC', item);

        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        const item = this.props.data;
        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`}
                onClick={this.playHandler.bind(this, item)}
            >
                <p><span className="bold">{item.title}</span> - {item.artist}</p>
                <p className="-col-auto delete"
                   onClick={this.deleteHandler.bind(this, item)}
                ></p>
            </li>
        );
    }
}

