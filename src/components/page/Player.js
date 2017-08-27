import React, {Component} from 'react';

import Progress from '../common/Progress'
import './Player.scss'

import {Link} from 'react-router-dom'
import PubSub from 'pubsub-js'

export default class Player extends Component {


    static defaultProps = {
        // 音乐循环模式
        repeatType: 'cycle'
    };

    constructor(props) {
        super(props);
        this.state = {
            // 播放进度 百分比数值
            progress: 0,
            // 音量的值
            volume: 0,
            isPlay: true,
            leftTime: '00:00'

        };
        // 总时间
        this.duration = 0;
    }

    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            // 总时间
            this.duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                // 设置音量
                volume: e.jPlayer.options.volume * 100,
                leftTime: this.formatTime(this.duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            })
        });
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    // 修改时间的回调
    changeProgressHandler(progress) {
        $('#player').jPlayer('play', this.duration * progress);
    }

    // 修改音量的回调
    changeVolumeHandler(progress) {
        $('#player').jPlayer('volume', progress);
    }

    play() {
        if (this.state.isPlay) {
            $('#player').jPlayer('pause');
        } else {
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }

    playPrev(e) {
        PubSub.publish('PLAY_PREV');

        e.stopPropagation();
        e.preventDefault();
    }

    playNext(e) {
        PubSub.publish('PLAY_NEXT');

        e.stopPropagation();
        e.preventDefault();
    }

    formatTime(time) {
        time = Math.floor(time);
        let miniutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);

        seconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${miniutes}:${seconds}`;

    }


    render() {

        const {id, title, artist, cover} = this.props.currentMusicItem;
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{title}</h2>
                        <h3 className="music-artist mt10">{artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div className="volume-wrapper">

                                    <Progress
                                        progress={this.state.volume}
                                        progressChangeHandler={this.changeVolumeHandler.bind(this)}
                                        barColor="#404040"
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px'}}>
                            <Progress
                                progress={this.state.progress}
                                progressChangeHandler={this.changeProgressHandler.bind(this)}
                            />
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.playPrev.bind(this)}></i>
                                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`}
                                   onClick={this.play.bind(this)}></i>

                                <i className="icon next ml20" onClick={this.playNext.bind(this)}></i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${this.props.repeatType}`}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={cover} alt={title}/>
                    </div>
                </div>
            </div>
        );
    }

}
