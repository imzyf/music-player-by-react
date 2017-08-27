import React, {Component} from 'react';

import 'normalize.css'
import '../styles/common.css'
import '../styles/Main.scss'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Player from "components/page/Player";
import Header from "components/common/Header";
import {MUSIC_LIST} from "components/config/MusicList";
import MusicList from "./page/MusicList";


const MusicListRoute = () => {

    return (<MusicList
        musicList={MUSIC_LIST}
        currentMusicItem={MUSIC_LIST[0]}
    />)
};

export class AppComponent extends Component {

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
            <Player currentMusicItem={this.state.currentMusicItem}/>

        );
    }
}


export default class Root extends Component {
    render() {
        return (
            <Router>
                <div className="index">
                    <Header/>
                    <Route exact path="/" component={AppComponent}/>
                    <Route path="/music-list" component={MusicListRoute}/>
                </div>
            </Router>
        );
    }


}
