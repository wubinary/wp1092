import React, { Component } from "react";
import Header from "../components/Header";
import Input from "../components/Input";

// TodoApp

class TodoApp extends Component {
    render() {
        return (
            <div className="todo-app__root">
                <Header text="todos" />
                <Main />
                <TodoControl />
            </div>
        );
    }
}

// Main
var todoList = [];
var showlen = 0;

class todoItem {
    constructor(id, text, status=0) {
        this.id = id;
        this.text = text;
        this.status = status;
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 0};
    }

    check_onClick = () => {
        this.props.todoItem.status = this.props.todoItem.status==1 ? 0:1 ;
        this.setState({status: this.state.status++});
        this.forceUpdate();
    }

    render() {
        var status = this.props.todoItem.status;
        var checkbox_style={}, item_detail_style={};
        if (status) {
            checkbox_style = {background: "green"};
            item_detail_style = {text_decoration: "line-through", opacity: 0.5};
        }
        return (
            <li key={this.props.todoItem.id.toString()} className="todo-app__item">
                <div className="todo-app__checkbox" onClick={this.check_onClick} style={checkbox_style}></div>
                <h1 className="todo-app__item-detail" style={item_detail_style}>
                     {this.props.todoItem.text}
                </h1>
                <img className="todo-app__item-x" src="./img/x.png" />
            </li>
        );
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: props.todoList};
    }

    componentDidMount = ()=>{
        setInterval(()=>{this.setState({list: this.props.todoList});}, 500);
    }

    get_rows = ()=>{
        var rows = [];
        for (var i=this.state.list.length-1; i>=0; i--) {
            var item = this.state.list[i];
            rows.push(<TodoItem todoItem={item} />);
        }
        showlen = rows.length;
        return rows;
    }

    render() {
        console.log(this.props.todoList);
        return (
            <ul className="todo-app__list" id="todo-list">{this.get_rows()}</ul>
        );
    }
}

class Main extends React.Component {
    render() {
        return (
            <section className="todo-app__main">
                <Input todoList={todoList} todoItem={todoItem} />
                <TodoList todoList={todoList} />
            </section>
        );
    }
}

// TodoControl

class TodoTotal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {total: 0};
    }

    componentDidMount = ()=>{
        setInterval(
            ()=>{
                var total = 0;
                for (var i=this.props.todoList.length-1; i>=0; i--) {
                    var item = this.props.todoList[i];
                    // console.log(item.status);
                    if (!item.status) {
                        total++;
                    }
                }
                this.setState({total: total});
            },
            500);
    }

    render() {
        return (
            <div className="todo-app__total">{this.state.total}</div>
        );
    }
}

class TodoControl extends React.Component {
    render() {
        return (
            <footer className="todo-app__footer" id="todo-footer">
                <TodoTotal todoList={todoList} />
                <ul className="todo-app__view-buttons">
                    <button>All</button>
                    <button>Active</button>
                    <button>Complete</button>
                </ul>
                <div className="todo-app__clean">
                    <button>Clear Complete</button>
                </div>
            </footer>
        );
    }
}

export default TodoApp;
