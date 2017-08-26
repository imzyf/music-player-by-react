import React, {Component} from 'react';

import 'normalize.css'
import '../styles/common.css'
import '../styles/Main.scss'


import Player from "components/page/Player";
import Header from "components/common/Header";
import {MUSIC_LIST} from "components/config/MusicList";
import MusicList from "./page/MusicList";

export default class AppComponent extends Component {

    constructor(props) {
        super(props);
        this.musicList = MUSIC_LIST;
        this.state = {
            currentMusicItem: MUSIC_LIST[0]
        }
    }

    componentDidMount() {
        const self = this;
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: self.state.currentMusicItem.file
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window',
            useStateClassSkin: true
        });
    }


    render() {
        return (
            <div className="index">
                <Header/>
                <Player currentMusicItem={this.state.currentMusicItem}/>
                <MusicList musicList={this.musicList}
                           currentMusicItem={this.state.currentMusicItem}
                />
                <div id='player'></div>
            </div>
        );
    }
}
