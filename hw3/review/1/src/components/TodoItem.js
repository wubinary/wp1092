import React, { Component } from "react";

const cross_style = {
    textDecoration: "line-through",
    opacity: 0.5
}

class TodoItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cross_out_or_not: {}
        };
    }
    handleDelete = () => {
        this.props.deleteItem(this.props.Id);
    }
    handleCrossOut = () => {
        this.props.crossOut(this.props.Id);
        let target = document.getElementById(this.props.Id);
        // cross out locally
        if (target.checked) {
            this.setState({
                cross_out_or_not: cross_style
            });
        } else {
            this.setState({
                cross_out_or_not: {}
            });
        }
    }
    render () {
        let my_style = {};
        if (this.props.cross === true){
            my_style = cross_style;
        }
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input
                        type="checkbox" id={this.props.Id}
                        onChange={this.handleCrossOut}
                        checked={this.props.cross}
                    />
                    <label htmlFor={this.props.Id} />
                </div>
                <h1 className="todo-app__item-detail"
                    style={my_style}>
                    {this.props.text}
                </h1>
                <img src="./img/x.png" className="todo-app__item-x"
                     onClick={this.handleDelete} alt="x"/>
            </li>
        )
    }
}

export default TodoItem;
