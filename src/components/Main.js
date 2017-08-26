import React,{Component} from 'react';

import 'normalize.css'
import '../styles/common.css'
import '../styles/Main.scss'

import Header from './Header'


export default class AppComponent extends Component {
    render() {
        return (
            <div className="index">
                <Header/>
            </div>
        );
    }
}
