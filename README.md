### music-player-by-react

## 介绍
这是 React 学习练习：[IMOOC 使用 React 构建一款音乐播放器](http://www.imooc.com/learn/868)，项目构建、功能编写的笔记。

- 项目地址：[imzyf/music-player-by-react](https://github.com/imzyf/music-player-by-react)
- 演示地址：[Music player build with React](https://imzyf.github.io/music-player-by-react/)
- 其他相关项目：[imzyf/gallery-by-react 图片画廊](https://github.com/imzyf/gallery-by-react)

Thanks:
- [xiaolin3303/react-music-player](https://github.com/xiaolin3303/react-music-player) Music player build with React, learn how to use React

### 技术栈
- 使用 YEOMAN 构建项目脚手架
- ES6
- react 15.0
- react-router-dom 4.2 路由
- pubsub-js 1.7 事件订阅
- webpack 1.2
- jPlayer 2.9 音乐播放器插件

## 项目构建
使用脚手架 [generator-react-webpack](https://github.com/react-webpack-generators/generator-react-webpack) Yeoman generator for ReactJS and Webpack：
```
# Make sure both is installed globally
npm install -g yo
npm install -g generator-react-webpack

# Create a new directory, and `cd` into it:
mkdir music-player-by-react && cd music-player-by-react

# Run the generator
yo react-webpack
```

其中使用 `scss`，启用 `PostCSS`。

还需要安装 sass-loader：
```
npm install node-sass --save-dev
npm install sass-loader@4.1.1 --save-dev
```

修改 `.eslintrc` 支持 jQuery：
```
"jquery": true
```

## 功能开发
### Header 组件
注意，同级目录的文件引用需要带上 `./`：
```javascript
import Header from './Header'
```

图片导入用 `require()`:
```
<img src={require('../../images/logo.png')}  width={40} className="-col-auto"/>
```

### jPlayer
[jPlayer : HTML5 Audio & Video for jQuery](http://jplayer.org/)

js cdn 导入：
```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.min.js"></script>
```

`componentDidMount() ` 中 bind 的方法在 `componentWillUnmout()` 要卸载：
```javascript
componentWillUnmout() {
    $("#player").unbind($.jPlayer.event.timeupdate);
}
```

获取当前音乐进度百分比，数值：
```
progress:e.jPlayer.status.currentPercentAbsolute
```

获取音乐总时间：
```
this.duration = e.jPlayer.status.duration;
```

### 进度条组件
```
<div className="progress" style={{
     width: `${this.props.progress}%`
 }}></div>
```
```
/* 模板写法 */
`${this.props.progress}%`
```

获取点击进度条的百分比：
```
let {progressBar} = this.refs;
let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
```

### MusicList 组件
`map` 遍历：
```javascript
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
```

### Router
[ReactTraining/react-router - Declarative routing for React](https://github.com/ReactTraining/react-router)

安装：
```bash
npm install --save react-router-dom
```

想使用最新的 `v4.2.2` 待完善。

### PubSubJS
[mroderick/PubSubJS - Dependency free publish/subscribe for JavaScript](https://github.com/mroderick/PubSubJS)

```javascript
import PubSub from 'pubsub-js'
```

事件发布：
```javascript
PubSub.publish('PLAY_MUSIC', item);
```

事件订阅：
```javascript
PubSub.subscribe('PLAY_MUSIC', (msg, currentMusicItem) => {
    this.playMusic(currentMusicItem)
})
```

### 播放控制
前进后退，播放下一首歌算法：
```javascript
let nextIndex = 0;
const musicListLength = this.musicList.length;
if (type === 'next') {
    nextIndex = (index + 1) % musicListLength;
} else {
    nextIndex = (index - 1 + musicListLength) % musicListLength;
}
```

### TODO
- [ ] 音乐播放模式，单曲循环、随机播放。
- [ ] react-router-dom 实践。
- [ ] DOM diff 学习。
- [ ] [IMMUTABLE](https://facebook.github.io/immutable-js/)。
- [ ] Redux 组件通信。
