import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: "", id:0};
    }

    handleChange = (event)=>{
        this.setState({value: event.target.value});
    }

    handleEnter = (event) => {
        if (event.key === 'Enter' && this.refs.MyInput.value.trim() == "") {
            this.refs.MyInput.value = "";
        } else if (event.key === 'Enter') {
            this.props.todoList.push(new this.props.todoItem(this.state.id, this.state.value))
            this.refs.MyInput.value = "";
            this.setState((state,props) => {id: state.id++});
        }
    }

    render() {
        return (
            <input type="text" 
             className="todo-app__input" 
             onChange={this.handleChange} onKeyDown={this.handleEnter} 
             placeholder="What needed to be done ?"
             ref="MyInput" />
        );
    }
}

export default Input;