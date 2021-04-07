import React, { Component } from "react";

class Header extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <header className="todo-app__header">
                <h1 className="todo-app__title">{this.props.text}</h1>
            </header>
        );
    }
}

export default Header;
