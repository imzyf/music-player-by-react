import React, {Component} from 'react';

import 'normalize.css'
import '../styles/common.css'
import '../styles/Main.scss'

import Header from './Header'
import Progress from './Progress'


export default class AppComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // 播放进度 百分比数值
            progress: '0'
        };
        // 总时间
        this.duration = 0;
    }


    componentDidMount() {
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
                }).jPlayer('play');
            },
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            // 总时间
            this.duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            })
        });
    }

    componentWillUnmout() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    progressChangeHandler(progress) {
        console.log('progress:' + progress);
        $('#player').jPlayer('play', this.duration * progress);
    }


    render() {
        return (
            <div className="index">
                <Header/>
                <Progress progress={this.state.progress}
                          progressChangeHandler={this.progressChangeHandler.bind(this)}

                />
                <div id='player'></div>
            </div>
        );
    }
}
