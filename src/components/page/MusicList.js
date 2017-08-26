import React, {Component} from 'react';
import './MusicList.scss'

import MusicListItem from 'components/page/MusicListItem';

export default class MusicList extends Component {

    render() {
        let Items = this.props.musicList.map((item) => {
            return (
                <MusicListItem
                    key={item.id}
                    data={item}
                    focus={this.props.currentMusicItem === item}
                ></MusicListItem>
            );
        });
        return (
            <ul>
                {Items}
            </ul>
        );
    }
}
