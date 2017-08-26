import React, {Component} from 'react';

import 'normalize.css'
import '../styles/common.css'
import '../styles/Main.scss'


import Player from "components/page/Player";
import Header from "components/Header";
import {MUSIC_LIST} from "components/config/MusicList";


export default class AppComponent extends Component {

    constructor(props) {
        super(props);
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
                <div id='player'></div>
            </div>
        );
    }
}
