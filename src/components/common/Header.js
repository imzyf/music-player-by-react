import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class Header extends Component {


    render() {
        return (
            <div className="components-logo row">
                <Link to='/'>
                    <img src="../../images/logo.png" width={40} className="-col-auto"/>
                    <h1 className="caption">Music Player by React</h1>
                </Link>
            </div>
        );
    }
}
