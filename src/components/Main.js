import React, {Component} from 'react';

import 'normalize.css'
import '../styles/reset.css'
import '../styles/common.css'
import '../styles/Main.scss'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Player from "components/page/Player";
import Header from "components/common/Header";
import {MUSIC_LIST} from "components/config/MusicList";
import MusicList from "./page/MusicList";

import PubSub from 'pubsub-js'


export class AppComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        }
    }

    componentDidMount() {

        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window',
            useStateClassSkin: true
        });

        this.playMusic(this.state.currentMusicItem);

        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playNext();
        });

        PubSub.subscribe('DELETE_MUSIC', (msg, currentMusicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== currentMusicItem
                })
            })
        });

        PubSub.subscribe('PLAY_MUSIC', (msg, currentMusicItem) => {
            this.playMusic(currentMusicItem)
        });

        PubSub.subscribe('PLAY_PREV', (msg) => {
            this.playNext('prev')
        });

        PubSub.subscribe('PLAY_NEXT', (msg) => {
            this.playNext('next')
        });
    }

    componentWillUnmount() {
        // PubSub.unsubscribe('DELETE_MUSIC');
        // PubSub.unsubscribe('PLAY_MUSIC');
        // $('#player').unbind($.jPlayer.event.ended);

    }

    playMusic(currentMusicItem) {
        $('#player').jPlayer('setMedia', {
            mp3: currentMusicItem.file
        }).jPlayer('play');

        this.setState({
            currentMusicItem: currentMusicItem
        })
    }

    playNext(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        // 要播放音乐的索引
        let nextIndex = 0;
        const musicListLength = this.state.musicList.length;
        if (type === 'next') {
            nextIndex = (index + 1) % musicListLength;
        } else {
            nextIndex = (index - 1 + musicListLength) % musicListLength;
        }

        let musicItem = this.state.musicList[nextIndex];
        this.setState({
            currentMusitItem: musicItem
        });
        this.playMusic(musicItem);
    }


    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    }

    render() {
        return (
            <div>
                <Player currentMusicItem={this.state.currentMusicItem}/>
                <MusicList
                    musicList={this.state.musicList}
                    currentMusicItem={this.state.currentMusicItem}
                />
            </div>

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
                    {/*<Route path="/music-list" component={MusicListRoute}/>*/}
                </div>
            </Router>
        );
    }
}
