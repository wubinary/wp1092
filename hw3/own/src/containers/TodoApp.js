import React, { Component } from "react";
import Header from "../components/Header";

// Todo App
class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {todoTotal:0, Total:0, completeTotal:0, showMode:"all", clear:0};
    }

    setTotal = (total_active, total)=>{
        this.setState((state)=>({todoTotal: total_active, Total: total}));
    }

    getTodoTotal = ()=>{
        return this.state.todoTotal;
    }

    getTotal = ()=>{
        return this.state.Total;
    }

    setShowMode = (showMode)=>{
        this.setState((state)=>({showMode:showMode}));
    }

    setCompleteTotal = (completeTotal)=>{
        this.setState((state)=>({completeTotal:completeTotal}));
    }

    getCompleteTotal = ()=>{
        return this.state.completeTotal;
    }

    setClear = (clear)=>{
        this.setState((state)=>({clear: clear}));
    }

    getClear = ()=>{
        return this.state.clear;
    }

    render() {
        return (
            <div className="todo-app__root" id="root">
                <Header text="todos" />
                <Section setTotal={this.setTotal} 
                         setCompleteTotal={this.setCompleteTotal} 
                         showMode={this.state.showMode} 
                         setClear={this.setClear} 
                         getClear={this.getClear} />
                <Footer getTodoTotal={this.getTodoTotal} 
                        getTotal={this.getTotal} 
                        getCompleteTotal={this.getCompleteTotal}
                        setShowMode={this.setShowMode}
                        setClear={this.setClear} />
            </div>
        );
    }
}

// Footer
class Footer extends React.Component {
    show = ()=>{
        if (this.props.getTotal() === 0) 
            return {'display': 'none'};
        return {};
    }

    completedButtonShow = ()=>{
        if (this.props.getCompleteTotal() > 0)
            return {};
        return {'display': 'none'};
    }

    render() {
        return (
            <footer className="todo-app__footer" id="todo-footer" style={this.show()}>
                <div className="todo-app__total">{this.props.getTodoTotal()} left</div>
                <ul className="todo-app__view-buttons">
                    <button onClick={()=>{this.props.setShowMode("all")}}>All</button>
                    <button onClick={()=>{this.props.setShowMode("active")}}>Active</button>
                    <button onClick={()=>{this.props.setShowMode("completed")}}>Completed</button>
                </ul>
                <div className="todo-app__clean">
                    <button style={this.completedButtonShow()} onClick={()=>{this.props.setClear(1)}} >Clear Completed</button>
                </div>
            </footer>
        );
    }
}

// Todo Datastructure
class Todo {
    constructor(id, text, status=0, checkStyle={}, checkLabelStyle={}) {
        this.id = id;
        this.text = text;
        this.status = status;
        this.checkStyle = checkStyle; //{text_decoration: "line-through", opacity: 0.5};
        this.checkLabelStyle = checkLabelStyle;
    }
}

// Section 
class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {id_count:0, list:[]};
    }

    clearCompleted = ()=>{
        if (this.props.getClear() === 1) {
            var list = [];
            for (var i=0; i<this.state.list.length; i++)
                if ( this.state.list[i].status === 0 )
                    list.push(this.state.list[i]);
            this.setState((state)=>({list: list}));
            this.props.setClear(0);
        }
    }

    updateTotal = ()=> {
        var total = 0, total_active = 0;
        for (var i=0; i<this.state.list.length; i++) {
            if ( this.state.list[i].status === 0 )
                total_active ++;
            total ++;
        }
        this.props.setTotal(total_active, total);
    }

    updateCompleteTotal = ()=> {
        var total_complete = 0;
        for (var i=0; i<this.state.list.length; i++) {
            if ( this.state.list[i].status === 1 )
                total_complete ++;
        }
        this.props.setCompleteTotal(total_complete);
    }

    componentDidMount(){
        setInterval(this.clearCompleted, 500);
        setInterval(this.updateTotal, 500);
        setInterval(this.updateCompleteTotal, 500);
    }

    addTodo = (text)=> {
        this.setState((state)=>({
            id_count: state.id_count+1,
            list: [new Todo(this.state.id_count, text), ...state.list]
        }));
        // console.log(this.state);
    }

    updateTodo = (id, todo)=> {
        let list2 = [...this.state.list];
        for (var i=0; i<list2.length; i++) {
            if (list2[i].id === id) {
                list2[i] = todo;
                break;
            }
        }
        // console.log(list2);
        this.setState((state)=>({list: list2}));
    }

    delTodo = (id)=> {
        let list2 = [...this.state.list];
        for (var i=0; i<list2.length; i++)
            if (list2[i].id === id) {
                var idx = i;
                break;
            }
        list2.splice(idx,1);
        this.setState((state)=>({list: list2}));
    }

    getList = ()=> {
        return this.state.list;
    }

    render() {
        return (
            <section className="todo-app__main">
                <Input addTodo={this.addTodo} />
                <List getList={this.getList} 
                      updateTodo={this.updateTodo} 
                      delTodo={this.delTodo} 
                      showMode={this.props.showMode}
                />
            </section>
        );
    }
}

class List extends React.Component {

    itemOnclick = (id)=> {
        // console.log(id);
        let list = this.props.getList();
        for (var i=0; i<list.length; i++) {
            if (list[i].id === id) {
                var oldtodo = list[i];
                break;
            }
        }
        var text, new_status, new_checkStyle, new_checkLabelStyle;
        if (oldtodo.status === 0){
            text = oldtodo.text;
            new_status = 1;
            new_checkStyle = {"text-decoration": "line-through", "opacity": 0.5};
            new_checkLabelStyle = {background: "green"};
        } else {
            text = oldtodo.text;
            new_status = 0;
            new_checkStyle = {};
            new_checkLabelStyle = {};
        }
        var newtodo = new Todo(id, text, new_status, new_checkStyle, new_checkLabelStyle);
        this.props.updateTodo(id, newtodo);
    }

    render_rows = ()=> {        
        var list = [];
        var full_list = [...this.props.getList()];
        for (var i=0; i<full_list.length; i++) {
            if (this.props.showMode === 'all') {
                list.push(full_list[i]);
            } else if (this.props.showMode === 'active' && full_list[i].status === 0) {
                list.push(full_list[i]);
            } else if (this.props.showMode === 'completed' && full_list[i].status === 1) {
                list.push(full_list[i]);
            }
        }

        return list.map(e => 
                <li key={e.id} className="todo-app__item" style={e.checkStyle}>
                    <div className="todo-app__checkbox" onClick={()=>{this.itemOnclick(e.id)}}>
                        <label id={e.id} style={e.checkLabelStyle} />
                    </div>
                    <h1 className="todo-app__item-detail">{e.text}</h1>
                    <img src="./img/x.png" className="todo-app__item-x" onClick={()=>{this.props.delTodo(e.id);}}/>
                </li>
            );
    }

    render() {
        return (
            <ul className="todo-app__list" id="todo-list">
                { this.render_rows() }
            </ul>
        );
    }
}

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:''};
    }

    handleChange = (event)=>{
        this.setState((state)=>({value: event.target.value}));
    }

    keyPress = (event)=>{
        if (event.keyCode === 13) { //[enter] key
            var text = this.state.value.trim();
            if (text !== "") {
                this.props.addTodo(text);
            }
            this.setState((state)=>({value:""}));
        }
    }

    render() {
        return (
            <input type="text"
                className="todo-app__input"
                value={this.state.value} 
                onChange={this.handleChange} 
                onKeyDown={this.keyPress} 
            />
        );
    }
}

export default TodoApp;
